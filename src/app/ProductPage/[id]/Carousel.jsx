import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'next/image';
import styles from './ProductPage.module.scss';
import { PinkHeartIcon, WhiteHeartIcon, HeartIcon, ShareIcon, FavoriteIconFilled, FavoriteIconNotFilled, ZoomButtonIcon } from './icons.js';
import { heartAnimVariants } from './anim';
import { ImagePreview } from './ImagePreview';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
export default function CarouselComponent({ product, selectedImageIndexCarousel, setSelectedImageIndexCarousel, handleMainImageClick, handleDotClick, totalImages, handleHeartClick, triggerHeartAnim, renderTooltips, showTooltips, likedImage, handleShareClick, isFavorisFilled, handleFavorisClick}) {
  const [previewImage, setPreviewImage] = useState(null);
  const onPrevClick = () => {
    const newIndex = selectedImageIndexCarousel === 0 ? product.images.length - 1 : selectedImageIndexCarousel - 1;
    setSelectedImageIndexCarousel(newIndex);
  };
  const onNextClick = () => {
    const newIndex = selectedImageIndexCarousel === product.images.length - 1 ? 0 : selectedImageIndexCarousel + 1;
    setSelectedImageIndexCarousel(newIndex);
  };
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.barClick}>
        <p className={styles.barClicktext}>cliquer sur la photo</p>
      </div>
      <div className={styles.imageCarousel}>
        <div onClick={handleMainImageClick}>
          <Carousel selectedItem={selectedImageIndexCarousel} showArrows={false} showIndicators={false} showStatus={false} swipeable={true} emulateTouch={true} onChange={(index) => setSelectedImageIndexCarousel(index)} dynamicHeight={true}>
            {product.images.map((img, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <Zoom>
                  <Image src={img.img} alt={`${product.nom} image ${index + 1}`} width={500} height={500} layout="responsive" />
                </Zoom>
                {renderTooltips(product.images[selectedImageIndexCarousel].hyperPoints, showTooltips)}
                <AnimatePresence>
                  {triggerHeartAnim && (
                    <motion.div className={styles.heart} variants={heartAnimVariants} initial="initial" animate="enter" exit="exit">
                      <HeartIcon />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button className={styles.zoomButton} onClick={(e) => {e.stopPropagation();setPreviewImage(img.img);}} >
                  <ZoomButtonIcon />
                </button>
              </div>
            ))}
          </Carousel>
        </div>
        <div className={styles.controlsContainer}>
          <button className={styles.arrow} onClick={onPrevClick}>
            <span className={styles.leftArrow}></span>
          </button>
          <div className={styles.paginationDots}>
            {Array.from({ length: totalImages }).map((_, index) => (
              <span key={index}
                className={`${styles.dot} ${index === selectedImageIndexCarousel ? styles.active : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
          <button className={styles.arrow} onClick={onNextClick}>
            <span className={styles.rightArrow}></span>
          </button>
          <div className={styles.heartButtonDiv}>
            <button onClick={handleHeartClick}>{likedImage ? <PinkHeartIcon /> : <WhiteHeartIcon />}</button>
          </div>
          <div className={styles.shareButtonDiv}>
            <button onClick={handleShareClick}><ShareIcon /></button>
          </div>
          <div className={styles.favorisIcon} onClick={handleFavorisClick}>
            {isFavorisFilled ? <FavoriteIconFilled /> : <FavoriteIconNotFilled />}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {previewImage && ( <ImagePreview  image={previewImage}  onClose={() => setPreviewImage(null)} /> )}
      </AnimatePresence>
    </div>
  );
}