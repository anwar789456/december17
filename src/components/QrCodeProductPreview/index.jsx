import React, { useEffect, useState } from 'react';
import RecommendedProducts from '@/components/RecommendationSystem';
import './QrCodeProductPreview.scss';
import styles from './style.module.scss';
import { fetchProducts } from '@/api/fetchProducts';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import { FiCopy } from "react-icons/fi";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from 'next/link';
import SelectBox from '@/components/SelectBox'; //
import SelectBoxDim from '@/components/SelectBoxDimension' //
import SelectBoxMousse from '@/components/SelectBoxMousse' //
import SelectBoxCoffre from '@/components/SelectBoxCoffre' //
const heartAnimVariants = {initial: {opacity: 0,scale: 0,y: 0,},enter: {opacity: 1,scale: 1.5,y: -100,transition: {duration: 0.3,ease: 'easeOut',},},exit: {opacity: 0,scale: 0.5,y: -200,transition: {duration: 0.5,ease: 'easeIn',},}};

const WhiteHeartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(48, 48, 48, 0.8)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }} ><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>);
const PinkHeartIcon  = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(167, 11, 11)" stroke="rgba(167, 11, 11)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }} ><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>);

const QrCodeProductPreview = ({ productId }) => {
  const [recommendedProductsCategory, setRecommendedProductsCategory] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndexCarousel, setSelectedImageIndexCarousel] = useState(0);
  const [triggerHeartAnim, settriggerHeartAnim] = useState(false);
  const [likedImage, setLikedImage] = useState(false);
  const [isFavorisFilled, setIsFavorisFilled] = useState(false);
  const [showShareBar, setShowShareBar] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const websiteURL = (window.location.href);
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(window.location.href)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
  const messengerShareUrl = `fb-messenger://share/?link=${encodeURIComponent(window.location.href)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`;


  const [selectedPrice, setSelectedPrice] = useState(0); //
  const [selectedOptionTissue, setSelectedOptionTissue] = useState('T1'); //
  
  const [selectedPricesecond, setSelectedPricesecond] = useState(0); //
  const [selectedPriceMousse, setSelectedPriceMousse] = useState(0); //
  const [coffrePrice, setcoffrePrice] = useState(600); //
  const [coffreOption, setcoffreOption] = useState(""); //

  const handleFavorisClick = () => {
    setIsFavorisFilled(!isFavorisFilled);
  };
  
  const handlePrev = () => {
    setSelectedImageIndexCarousel((prevIndex) => 
      prevIndex === 0 ? productDetails.images.length - 1 : prevIndex - 1
    );
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(websiteURL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const handleHeartClick = () => {
    setLikedImage(!likedImage);
    if (likedImage == false){
      settriggerHeartAnim(true);
      setTimeout(() => {
        settriggerHeartAnim(false);
      }, 400);
    }
  };
  const handleShareClick = () => {
    setShowShareBar(!showShareBar);
  };
  const handleNext = () => {
    setSelectedImageIndexCarousel((prevIndex) => 
      prevIndex === productDetails.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleDotClick = (index) => {
    setSelectedImageIndexCarousel(index);
  };

  const handleOptionSelect = (option) => {
    setSelectedPrice(parseFloat(option.prix_option));
    if (coffreOption === "oui"){
      setcoffrePrice(parseFloat(option.prix_coffre));
    }
    else if (coffreOption === "non"){
      setcoffrePrice(0);
    }
  };

  const updateSelectedPrice = (option) => {
    setSelectedPricesecond(parseFloat(option.prix_option));
    setSelectedOptionTissue(option.option_name)
  };
  
  const updateSelectedPriceMousse = (option) => {
    setSelectedPriceMousse(parseFloat(option.mousse_prix));
  };

  const updateSelectedCoffre = (optionCoffre) => {
    setcoffreOption(optionCoffre);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();
        setData(products);
        const product = products.find((prod) => prod.idProd === productId);
        if (product) {
          setProductDetails(product);
          setRecommendedProductsCategory(product.categorie.trim());
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const overlayVariants = {initial: {opacity: 0,y: 20},enter: {y: 0,opacity: 1,transition: {duration: 0.3,ease: [1, 0.29, 0, 0.02],},},exit: {y: 20,opacity: 0,transition: {duration: 0.3,ease: [.72, .34, 0, 1.58],},},};

  if (loading) return <p className='loadingTxt'>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="productPreviewContainer">
      <div className="carouselContainer">
        <div className="imageCarousel">
          <div>
            <Carousel 
              selectedItem={selectedImageIndexCarousel} 
              showArrows={false} 
              showIndicators={false} 
              showStatus={false}
              swipeable={true}
              emulateTouch={true}
              onChange={(index) => setSelectedImageIndexCarousel(index)}
            >
              {productDetails.images.map((img, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <Link href={`/ProductPage/${productDetails.idProd}`}>
                    <div>
                      <Image src={img.img} alt={`${productDetails.nom} image ${index + 1}`} width={500} height={500} layout="responsive"/>
                    </div>
                  </Link>
                  <AnimatePresence>
                    {triggerHeartAnim && (
                      <motion.div className="heart" variants={heartAnimVariants} initial="initial" animate="enter" exit="exit" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(243, 242, 236, 0.7)" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100px', height: '100px' }} >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="controlsContainer">
            <button className="arrow" onClick={handlePrev}>
              <span className="leftArrow"></span>
            </button>
            <div className="paginationDots">
              {productDetails.images.map((_, index) => (
                <span key={index} 
                  className={`dot ${index === selectedImageIndexCarousel ? "active" : ""}`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
            <button className="arrow" onClick={handleNext}>
              <span className="rightArrow"></span>
            </button>
            <div className="heartButtonDiv">
              <button onClick={handleHeartClick}>
                {likedImage ? <PinkHeartIcon /> : <WhiteHeartIcon />}
              </button>
            </div>
            <div className="shareButtonDiv">
              <button onClick={handleShareClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(48, 48, 48, 0.8)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px', transform: 'rotate(20deg)' }}>
                  <path d="M22 2L11 13"></path><path d="M22 2L15 22 11 13 2 9l20-7z"></path>
                </svg>
              </button>
              <AnimatePresence>
                {showShareBar && (
                  <motion.div variants={overlayVariants} initial="initial" animate="enter" exit="exit" className="shareBarOverlay" >
                    <div className="shareBar">
                      <button className="closeBtn" onClick={handleShareClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={26} height={26} fill="currentColor" >
                          <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <h3 className="shareText">Share This Product</h3>
                  
                      <div className="shareOptions">
                      <Swiper
                        className={`${styles.swiperContainer} ${styles.swiperNavigation}`}
                        centeredSlides={false}
                        slidesPerView={3}
                        spaceBetween={0}
                        navigation
                        modules={[Navigation]}
                      >
                        <SwiperSlide className="swiperSlide">
                          <a href={messengerShareUrl} target="_blank" rel="noopener noreferrer" className="shareLink">
                            <div className="iconContainer">
                                <div className="icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48" id="messenger">
                                      <path fill="url(#paint0_radial_147648_891)" d="M23.9979 0C10.4811 0 0 9.90512 0 23.2779C0 30.2733 2.86775 36.3208 7.53533 40.4964C7.9253 40.8444 8.16528 41.3363 8.17728 41.8643L8.30926 46.1359C8.35126 47.4978 9.75514 48.3857 11.003 47.8338L15.7666 45.7339C16.1686 45.554 16.6245 45.524 17.0505 45.638C19.2403 46.2379 21.5681 46.5619 23.9979 46.5619C37.5147 46.5619 47.9957 36.6568 47.9957 23.2839C47.9957 9.91112 37.5147 0 23.9979 0Z"></path>
                                      <path fill="#fff" d="M9.58715 30.0873L16.6365 18.9043C17.7584 17.1225 20.1582 16.6845 21.8441 17.9444L27.4536 22.15C27.9695 22.534 28.6775 22.534 29.1874 22.144L36.7587 16.3965C37.7667 15.6286 39.0865 16.8405 38.4146 17.9144L31.3592 29.0914C30.2373 30.8732 27.8375 31.3112 26.1517 30.0513L20.5422 25.8457C20.0262 25.4617 19.3183 25.4617 18.8083 25.8517L11.237 31.5992C10.2291 32.3671 8.90921 31.1612 9.58715 30.0873Z"></path>
                                      <defs>
                                      <radialGradient id="paint0_radial_147648_891" cx="0" cy="0" r="1" gradientTransform="matrix(52.2962 0 0 52.2961 9.24 47.734)" gradientUnits="userSpaceOnUse">
                                          <stop stop-color="#09F"></stop><stop offset=".61" stop-color="#A033FF"></stop><stop offset=".935" stop-color="#FF5280"></stop><stop offset="1" stop-color="#FF7061"></stop>
                                      </radialGradient>
                                      </defs>
                                  </svg>
                                </div>
                                <span className="shareText">Messenger</span>
                            </div>
                          </a>
                        </SwiperSlide> 
                        <SwiperSlide className="swiperSlide">
                          <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" className="shareLink">
                            <div className="iconContainer">
                              <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#25d366" width={40} height={40} viewBox="0 0 240 241.19">
                                    <path class="cls-1" d="M205,35.05A118.61,118.61,0,0,0,120.46,0C54.6,0,1,53.61,1,119.51a119.5,119.5,0,0,0,16,59.74L0,241.19l63.36-16.63a119.43,119.43,0,0,0,57.08,14.57h0A119.54,119.54,0,0,0,205,35.07v0ZM120.5,219A99.18,99.18,0,0,1,69.91,205.1l-3.64-2.17-37.6,9.85,10-36.65-2.35-3.76A99.37,99.37,0,0,1,190.79,49.27,99.43,99.43,0,0,1,120.49,219ZM175,144.54c-3-1.51-17.67-8.71-20.39-9.71s-4.72-1.51-6.75,1.51-7.72,9.71-9.46,11.72-3.49,2.27-6.45.76-12.63-4.66-24-14.84A91.1,91.1,0,0,1,91.25,113.3c-1.75-3-.19-4.61,1.33-6.07s3-3.48,4.47-5.23a19.65,19.65,0,0,0,3-5,5.51,5.51,0,0,0-.24-5.23C99,90.27,93,75.57,90.6,69.58s-4.89-5-6.73-5.14-3.73-.09-5.7-.09a11,11,0,0,0-8,3.73C67.48,71.05,59.75,78.3,59.75,93s10.69,28.88,12.19,30.9S93,156.07,123,169c7.12,3.06,12.68,4.9,17,6.32a41.18,41.18,0,0,0,18.8,1.17c5.74-.84,17.66-7.21,20.17-14.18s2.5-13,1.75-14.19-2.69-2.06-5.7-3.59l0,0Z"/>
                                </svg>
                              </div>
                              <span className="shareText">WhatsApp</span>
                            </div>
                          </a>
                        </SwiperSlide> 
                        <SwiperSlide className="swiperSlide">
                          <div className="productCard">
                            <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="shareLink">
                              <div className="iconContainer">
                                <div className="icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 509 509"><g fill-rule="nonzero">
                                      <path fill="#0866FF" d="M509 254.5C509 113.94 395.06 0 254.5 0S0 113.94 0 254.5C0 373.86 82.17 474 193.02 501.51V332.27h-52.48V254.5h52.48v-33.51c0-86.63 39.2-126.78 124.24-126.78 16.13 0 43.95 3.17 55.33 6.33v70.5c-6.01-.63-16.44-.95-29.4-.95-41.73 0-57.86 15.81-57.86 56.91v27.5h83.13l-14.28 77.77h-68.85v174.87C411.35 491.92 509 384.62 509 254.5z"/>
                                      <path fill="#fff" d="M354.18 332.27l14.28-77.77h-83.13V227c0-41.1 16.13-56.91 57.86-56.91 12.96 0 23.39.32 29.4.95v-70.5c-11.38-3.16-39.2-6.33-55.33-6.33-85.04 0-124.24 40.16-124.24 126.78v33.51h-52.48v77.77h52.48v169.24c19.69 4.88 40.28 7.49 61.48 7.49 10.44 0 20.72-.64 30.83-1.86V332.27h68.85z"/></g>
                                  </svg>
                                </div>
                                <span className="shareText">Facebook</span>
                              </div>
                              </a>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiperSlide">
                          <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="shareLink">
                            <div className="iconContainer">
                              <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512">
                                    <path d="M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512 0 397.385 0 256 114.615 0 256 0z"/><path fill="#fff" fill-rule="nonzero" d="M318.64 157.549h33.401l-72.973 83.407 85.85 113.495h-67.222l-52.647-68.836-60.242 68.836h-33.423l78.052-89.212-82.354-107.69h68.924l47.59 62.917 55.044-62.917zm-11.724 176.908h18.51L205.95 176.493h-19.86l120.826 157.964z"/>
                                </svg>
                              </div>
                              <span className="shareText">Twitter</span>
                            </div>
                          </a>
                        </SwiperSlide>
                      </Swiper>
                      </div>

                      <div className="shareLinkDiv">
                        <div className="urlContainer">
                          <span className="urlText">{websiteURL}</span>
                          <button className="copyButton" onClick={handleCopy}>
                            <FiCopy className="copyIcon" />
                            {isCopied ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="favorisIcon" onClick={handleFavorisClick}>
              {isFavorisFilled ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(48, 48, 48, 0.8)" stroke="rgba(48, 48, 48, 0.8)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }} >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(48, 48, 48, 0.8)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              )}
            </div>

          </div>

          <div className="productDetails">
            <div className="Productinfos">
              <div className="titleDiv">
                <h1 className="titleInfo">{productDetails.nom}</h1>
              </div>    
              <div className="priceDiv">
                <p className="priceInfo">
                  <span className="fromPrice">à partir de</span>
                  <span className="minmaxPrice">{productDetails.minPrice}</span>
                  <span className="tnworddesign">TND</span>
                </p>
              </div>
            </div>
          </div>

          <br />
          
          {productDetails?.sizes?.length > 0 && (
          <SelectBoxDim titleOptionSelect={"Dimensions"} optionsDim={productDetails.sizes} defaultOption={productDetails.sizes[5]} onOptionSelect={handleOptionSelect} />
          )}

          {productDetails?.options?.length > 0 && (
            <SelectBox titleOptionSelect={"Tarification Tissus"} options={productDetails.options} updateSelectedPrice={updateSelectedPrice} />
          )}
          <br />

          {productDetails?.mousse?.length > 0 && (
            <SelectBoxMousse titleOptionSelect={"Mousse"} options={productDetails.mousse} updateSelectedPriceMousse={updateSelectedPriceMousse} />
          )}

          
          {productDetails?.typeProd === "LIT" && (
            <div className={styles.checkboxContainer}>
              <SelectBoxCoffre titleOptionSelect={"Coffre de rangement"} onOptionSelectMousse={updateSelectedCoffre} />
            </div>
          )}
         
        </div>
      </div>
      <RecommendedProducts productCategorie={recommendedProductsCategory} allProducts={data} />
    </div>
  );
};

export default QrCodeProductPreview;