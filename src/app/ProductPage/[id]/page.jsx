"use client";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/NewFooter/Footer';
import ImageGallery from './imageGallery';
import MainImage from './MainImage';
import ProductInfo from './ProductInfo';
import SelectBox from '@/components/SelectBox';
import SelectBoxDim from '@/components/SelectBoxDimension';
import SelectBoxDirection from '@/components/SelectBoxDirection';
import SelectBoxMousse from '@/components/SelectBoxMousse';
import SelectBoxCoffre from '@/components/SelectBoxCoffre';
import RecommendedProducts from '@/components/RecommendationSystem';
import CarouselComponent from './Carousel.jsx';
import Curve from '@/components/Curve';
import styles from './ProductPage.module.scss';
import { fetchProducts } from '../../../api/fetchProducts';
import Accordion from '@/components/ProductPageComponents/Accordion';
import QuantityController from './quantityController'
export default function ProductPage({ params }) {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState(null);
  const [selectedOptionDimension, setselectedOptionDimension] = useState(null);
  const [selectedOptionMousse, setselectedOptionMousse] = useState(null);
  const [selectedOptionTissue, setSelectedOptionTissue] = useState(null);
  const [selectedOptionDirection, setSelectedDirection] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showTooltips, setShowTooltips] = useState(false);
  const [likedImage, setLikedImage] = useState(false);
  const [triggerHeartAnim, setTriggerHeartAnim] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedPricesecond, setSelectedPricesecond] = useState(0);
  const [selectedPriceMousse, setSelectedPriceMousse] = useState(0);
  const [coffrePrice, setCoffrePrice] = useState(600);
  const [coffreOption, setCoffreOption] = useState("");
  const [recommendedProductsCategory, setRecommendedProductsCategory] = useState('');
  const [isFavorisFilled, setIsFavorisFilled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [clicked, setClicked] = useState(false);
  const totalImages = product?.images?.length || 0;
  useEffect(() => {
    const initializeData = async () => {
      try {
        const fetchedData = await fetchProducts();
        setData(fetchedData);
        if (params.id) {
          const productData = fetchedData.find((item) => item.idProd === params.id);
          if (productData) {
            setProduct(productData);
            setTotalPrice(productData.minPrice);
            setSelectedPrice(productData.minPrice);
            setRecommendedProductsCategory(productData.categorie.trim());
            setMainImage(productData.images[0].img);
            setSelectedOptionTissue(productData.options[0])
            setselectedOptionMousse(productData.mousse[0])
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    initializeData();
  }, [params.id]);

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        window.scrollTo(0, 0);
      }, 300);
    })();
  }, []);
  
  useEffect(() => {
    const total = parseFloat(selectedPrice) + parseFloat(selectedPricesecond) + parseFloat(selectedPriceMousse) + (coffreOption === "oui" ? coffrePrice : 0);
    setTotalPrice(total*quantity);
  }, [selectedPrice, selectedPricesecond, selectedPriceMousse, coffrePrice, coffreOption, quantity]);
  const handleMainImageClick = () => {setShowTooltips(!showTooltips);};
  const handleHeartClick = () => {
    setLikedImage(!likedImage);
    if (!likedImage) {
      setTriggerHeartAnim(true);
      setTimeout(() => setTriggerHeartAnim(false), 400);
    }
  };
  const handleShareClick = () => {
    if (navigator.share) {navigator.share({title: product.nom,text: product.description,url: window.location.href,}).catch(console.error);
    } else {navigator.clipboard.writeText(window.location.href);}
  };
  const handleFavorisClick = () => { setIsFavorisFilled(!isFavorisFilled); };
  const handleDotClick = (index) => { setSelectedImageIndex(index); };
  const renderTooltips = (hyperPoints, showTooltips) => {
    if (!showTooltips || !hyperPoints) return null;
    return hyperPoints.map((point, index) => (
      <motion.div key={index} className={styles.tooltipBox} style={{top: `${point.posY}%`,left: `${point.posX}%`,}} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} >
        <div className={styles.tooltipContent}><p className={styles.productName}>{point.label}</p></div>
      </motion.div>
    ));
  }
  const updateSelectedPrice = (option) => {
    setSelectedOptionTissue(option)
    setSelectedPricesecond(parseFloat(option.prix_option));
  };
  const handleOptionSelect = (option) => {
    setSelectedPrice(parseFloat(option.prix_option));
    setselectedOptionDimension(option);
    if (coffreOption === "oui"){ setCoffrePrice(parseFloat(option.prix_coffre));}
    else if (coffreOption === "non"){ setCoffrePrice(0); }
  };
  const updateSelectedPriceMousse = (option) => {
    setselectedOptionMousse(option)
    setSelectedPriceMousse(parseFloat(option.mousse_prix));
  };
  const updateSelectedCoffre = (optionCoffre) => {setCoffreOption(optionCoffre);};
  const updateSelectedDirection = (optionDirection) => {setSelectedDirection(optionDirection);}; 
  const handleAddToCart = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];  
    const newItem = {idItem: uuidv4(),idProd: params.id,quantity,totalPrice: Number(totalPrice),selectedOptionTissue: selectedOptionTissue,selectedOptionDimension: selectedOptionDimension,selectedOptionMousse: selectedOptionMousse,selectedOptionCoffre: coffreOption,directionCanapeAngle: selectedOptionDirection,};
    const existingItemIndex = existingCartItems.findIndex(
      (item) => item.idProd === newItem.idProd && item.selectedOptionTissue?.option_name === newItem.selectedOptionTissue?.option_name && item.selectedOptionDimension?.longueur === newItem.selectedOptionDimension?.longueur && item.selectedOptionDimension?.largeur === newItem.selectedOptionDimension?.largeur && item.selectedOptionDimension?.prix_option === newItem.selectedOptionDimension?.prix_option && item.selectedOptionCoffre === newItem.selectedOptionCoffre && item.directionCanapeAngle === newItem.directionCanapeAngle && item.selectedOptionMousse?.mousse_name === newItem.selectedOptionMousse?.mousse_name );
      if (existingItemIndex !== -1) {
        const existingItem = existingCartItems[existingItemIndex];
        const unitPrice = existingItem.totalPrice / existingItem.quantity;
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = unitPrice * existingItem.quantity;
        existingCartItems[existingItemIndex] = existingItem;
      } else {
        existingCartItems.push(newItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      const event = new Event('cartUpdated');
      window.dispatchEvent(event);
  };
  const increaseQuantity = () => {setQuantity(prevQuantity => prevQuantity + 1);};
  const decreaseQuantity = () => {setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));};
  if (!product) { return (<div className={styles.loadingDiv}><span className={styles.loadingText}>Loading...</span></div>); }
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && product.nom && <Curve word={product.nom} />}
      </AnimatePresence>
      <Header sticky={true} />
      <div className={styles.productPage}>
        <ImageGallery  images={product.images}  onImageClick={(img, index) => {setMainImage(img);setSelectedImageIndex(index);}}  selectedIndex={selectedImageIndex}  />
        <MainImage  mainImage={mainImage}  showTooltips={showTooltips}  triggerHeartAnim={triggerHeartAnim}  hyperPoints={product.images[selectedImageIndex].hyperPoints}  products={data} onClick={() => setShowTooltips(!showTooltips)}  />
        <CarouselComponent  product={product}  selectedImageIndexCarousel={selectedImageIndex}  setSelectedImageIndexCarousel={setSelectedImageIndex}  handleMainImageClick={handleMainImageClick}  handleDotClick={handleDotClick}  totalImages={totalImages}  handleHeartClick={handleHeartClick}  triggerHeartAnim={triggerHeartAnim}  renderTooltips={renderTooltips}  showTooltips={showTooltips}  likedImage={likedImage}  handleShareClick={handleShareClick}  isFavorisFilled={isFavorisFilled}  handleFavorisClick={handleFavorisClick} />
        <div className={styles.productDetails}>
          <ProductInfo name={product.nom} description={product.description} totalPrice={totalPrice} onHeartClick={handleHeartClick} likedImage={likedImage} />
          <div className={styles.Description}>
            <p className={styles.DescriptionP}>{product.description}</p>
          </div>
          {product?.typeProd === "canape_angle" && (<SelectBoxDirection titleOptionSelect="Disposition" onOptionSelectDirection={updateSelectedDirection} />)}
          {product?.sizes?.length > 0 && (<SelectBoxDim titleOptionSelect="Dimensions" optionsDim={product.sizes} defaultOption={product.sizes[5]} onOptionSelect={handleOptionSelect} />)}
          {product?.options?.length > 0 && (<SelectBox titleOptionSelect="Tarification Tissus" options={product.options} updateSelectedPrice={updateSelectedPrice}/>)}
          {product?.mousse?.length > 0 && (<SelectBoxMousse titleOptionSelect="Mousse" options={product.mousse} updateSelectedPriceMousse={updateSelectedPriceMousse} />)}
          {product?.typeProd === "LIT" && (<SelectBoxCoffre titleOptionSelect="Coffre de rangement" onOptionSelectMousse={updateSelectedCoffre} />)}
          <div className={styles.FullquantityDiv}>
            <QuantityController quantity={quantity} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>
          </div>
          <div className={styles.addToCart}>
            <motion.button
              className={styles.addToCartBTN}
              onClick={handleAddToCart}
              initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
              animate={{
                scale: clicked ? 0.97 : 1, // Slightly smaller when clicked
                backgroundColor: clicked ? '#3030301A' : 'rgba(0, 0, 0, 0)',
              }}
              transition={{
                scale: { duration: 0.15 }, // 150ms for a quick scale animation
                backgroundColor: { duration: 0.15 }, // 150ms for quick background color transition
              }}
            >
              Ajouter Au Panier
            </motion.button>
          </div>
          <div className={styles.AccordionDiv}> <Accordion product={product}/> </div>
        </div>
      </div>
      <RecommendedProducts productCategorie={recommendedProductsCategory} allProducts={data} />
      <Footer />
    </>
  );
}