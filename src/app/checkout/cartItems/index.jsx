"use client";
import './style.scss';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { fetchProducts } from '@/api/fetchProducts';
import { useEffect, useState } from 'react';
export default function CartItems({ onCartItemsChange }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const getProductName = (id) => {
    const product = cartProducts.find((prod) => prod.idProd === id);
    return product ? product.nom : "Unknown Product";
  };
  const getProductImage = (id) => {
    const product = cartProducts.find((prod) => prod.idProd === id);
    return product ? product.images[0].img : "image.jpg";
  };
  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedData = await fetchProducts();
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        if (storedCartItems.length === 0) {
          setCartItems([]);
          setCartProducts([]);
          setTotal(0);
          onCartItemsChange([]);
          return;
        }
        const productsInCart = storedCartItems
          .map((cartItem) => {
            const product = fetchedData.find((prod) => prod.idProd === cartItem.idProd);
            return product ? { ...product, ...cartItem } : null;
          })
          .filter((item) => item !== null);
        setCartItems(storedCartItems);
        setCartProducts(productsInCart);
        updateCartTotal(storedCartItems);
        onCartItemsChange(storedCartItems);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [onCartItemsChange]);
  const updateCartTotal = (items) => {
    const totalPrice = items.reduce((acc, item) => acc + item.totalPrice, 0);
    setTotal(totalPrice);
  };
  return (
    <div className="cartDiv">
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <motion.div key={item.idItem} className="cartItem">
            <div className="productImageCart">
              <Image
                width={500}
                height={500}
                src={getProductImage(item.idProd)}
                alt={getProductName(item.idProd)}
                className="imgCart"
              />
            </div>
            <div className="tableGrid">
              <div className="itemInfo">
                <p>{getProductName(item.idProd)}</p>
                {item.selectedOptionTissue && <p>Tissus: {item.selectedOptionTissue.option_name}</p>}
                {item.selectedOptionDimension && (
                  <p>
                    Dimensions:{" "}
                    <span className="numberStyle">
                      {item.selectedOptionDimension.longueur}cm x{" "}
                      {item.selectedOptionDimension.largeur}cm
                    </span>
                  </p>
                )}
                {item.selectedOptionMousse && <p>Mousse: {item.selectedOptionMousse.mousse_name}</p>}
                {item.selectedOptionCoffre && <p>Avec Coffre: {item.selectedOptionCoffre}</p>}
                {item.directionCanapeAngle && <p>Disposition: {item.directionCanapeAngle}</p>}
                <p>Quantité: {item.quantity}</p>
                <p>
                  prix: {item.totalPrice} <span className="tnworddesign">TND</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="emptyCart">
          <p className="emptyCartText">Panier Vide</p>
        </div>
      )}
      <div className="totalSection">
        <p className="totalLabel">Total</p>
        <p className="totalAmount">
          {total} <span className="tnworddesign">TND</span>
        </p>
      </div>
    </div>
  );
}