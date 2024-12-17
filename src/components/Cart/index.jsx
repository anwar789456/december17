import { useEffect, useRef, useState } from "react";
import { CloseIcon, MinusIcon, PlusIcon } from "./icons";
import styles from "./style.module.scss";
import { fetchProducts } from "@/api/fetchProducts";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
export default function CartContainer({ isOpen, onClose }) {
  const cartRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  
  const emptyCartVariants = {
    hidden: { opacity: 0, y: 30, scale: 1 },
    visible: {opacity: 1,y: 0,scale: 1,transition: { delay: 0.7, duration: 0.5, ease: "easeInOut" },},
    exit: {opacity: 0,y: 0,scale: 1,transition: { delay: 0.1, duration: 0.3, ease: "easeInOut" },},
  };
  const cartItemVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {opacity: 1,x: 0,transition: { duration: 0.5, ease: "easeInOut" },},
    exit: {opacity: 0,x: 60,transition: { duration: 0.5, ease: "easeInOut" },},
  };
  const updateCartTotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    setCartTotal(total);
  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedData = await fetchProducts();
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
        const productsInCart = storedCartItems
          .map((cartItem) => {
            const product = fetchedData.find((prod) => prod.idProd === cartItem.idProd);
            return product ? { ...product, ...cartItem } : null;
          })
          .filter((item) => item !== null);
        setCartProducts(productsInCart);
        setLoading(false);
        updateCartTotal(storedCartItems);
      } catch (error) {
        setLoading(false);
      }
    };

    if (isOpen) {
      getProducts();
    }
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      cartRef.current.style.transform = "translateX(0)";
    } else {
      cartRef.current.style.transform = "translateX(100%)";
    }
  }, [isOpen]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  const getProductName = (id) => {
    const product = cartProducts.find((prod) => prod.idProd === id);
    return product ? product.nom : "Unknown Product";
  };
  const getProductImage = (id) => {
    const product = cartProducts.find((prod) => prod.idProd === id);
    return product ? product.images[0].img : "image.jpg";
  };
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCartItems = cartItems.map((item) => {
      if (item.idItem === id) {
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: (item.totalPrice / item.quantity) * newQuantity,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    updateCartTotal(updatedCartItems);
  };
  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => !(item.idItem === id));
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    updateCartTotal(updatedCartItems);
  };
  return (
    <div className={styles.cartContainer} ref={cartRef}>
      <div className={styles.headerContainer}>
        <div className={styles.cartTitle}>
          <h1 className={styles.cartH1}>Panier</h1>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.cartItemsContainer}>
        <div className={styles.cartItemsDiv}>
          <AnimatePresence>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <motion.div 
                  key={item.idItem} className={styles.cartItem}
                  initial="hidden" animate="visible" exit="exit" layout 
                  variants={cartItemVariants} 
                >
                  <div className={styles.productImageCart}>
                    <Image width={500} height={500} src={getProductImage(item.idProd)} alt={getProductName(item.idProd)} className={styles.imgCart} />
                  </div>
                  <div className={styles.tableGrid}>
                    <div className={styles.itemInfo}>
                      <p>{getProductName(item.idProd)}</p>
                      {item.selectedOptionTissue && <p>Tissus: {item.selectedOptionTissue.option_name}</p>}
                      {item.selectedOptionDimension && ( <p>Dimensions:{" "}<span className={styles.numberStyle}>{item.selectedOptionDimension.longueur}cm x{" "}{item.selectedOptionDimension.largeur}cm</span></p> )}
                      {item.selectedOptionMousse && <p>Mousse: {item.selectedOptionMousse.mousse_name}</p>}
                      {item.selectedOptionCoffre && <p>Avec Coffre: {item.selectedOptionCoffre}</p>}
                      {item.directionCanapeAngle && <p>Disposition: {item.directionCanapeAngle}</p>}
                      <p>prix: {item.totalPrice} <span className={styles.tnworddesign}>TND</span></p>
                    </div>
                    <div className={styles.itemActions}>
                      <div className={styles.quantityController}>
                        <button
                          className={styles.minusButton}
                          onClick={() => handleQuantityChange(item.idItem, item.quantity - 1)}
                        >
                          <MinusIcon />
                        </button>
                        <span className={styles.quantityValue}>{item.quantity}</span>
                        <button
                          className={styles.plusButton}
                          onClick={() => handleQuantityChange(item.idItem, item.quantity + 1)}
                        >
                          <PlusIcon />
                        </button>
                      </div>
                      <button className={styles.removeButton} onClick={() => handleRemoveItem(item.idItem)}>
                        Retirer
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div className={styles.emptyCart} 
                initial="hidden" animate="visible" exit="exit" 
                variants={emptyCartVariants} key="empty" 
              >
                <p className={styles.emptyCartText}>Panier Vide</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.totalPriceContainer}>
          <AnimatePresence>
            {cartItems.length > 0 && (
              <motion.div
                className={styles.totalPrice}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link href="/checkout">
                  <button className={styles.commandButton}>
                    <div className={styles.btnTextContainer}>

                      <span className={styles.commanderText}>Commander • </span>
                      <div className={styles.totalPriceTextContainer}>
                        <p className={styles.totalPriceText}>{cartTotal}</p>
                      </div>
                      <span className={styles.tnworddesign}>TND</span>
                    </div>
                  </button>
                </Link>
                {/* {orderStatus && <p className={styles.successMessage}>{orderStatus}</p>} */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}