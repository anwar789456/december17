import React, { useEffect, useState } from 'react';
import styles from './style.module.scss'
import Link from 'next/link';
// import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
const RecommendedProducts = ({ productCategorie, allProducts }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  useEffect(() => {
    // i will find the products with the categorie and limit to 4 products
    const filteredProducts = allProducts.filter(product => product.categorie === productCategorie);
    setRecommendedProducts(filteredProducts);
  }, [productCategorie, allProducts]);
  return (
    <div className={styles.recommendedProductsContainer}>
      <div className={styles.titleDiv}>
        <h2 className={styles.title}>Recommendation</h2> {/*You may also like */}
      </div>
      <Swiper
        // freeMode={true}
        // loop
        // modules={[FreeMode]}
        // loopedSlides={true}
        initialSlide={1}
        className={styles.swiperContainer}
        centeredSlides={false}
        slidesPerView={2.1}
        spaceBetween={15}
        breakpoints={{
          '@0.00': {
            initialSlide:1,
            slidesPerView: 1.4,
            spaceBetween: 15,
            centeredSlides:true,
          },
          '@0.75': {
            initialSlide:0,
            slidesPerView: 3.4,
            spaceBetween: 5,
            centeredSlides:false,
          },
          '@1.00': {
            initialSlide:0,
            slidesPerView: 4.6,
            spaceBetween: 8,
            centeredSlides:false,
          },
          '@1.50': {
            initialSlide:0,
            slidesPerView: 4.5,
            spaceBetween: 10,
            centeredSlides:false,
          },
        }}
        >
        {recommendedProducts.map(product => (
          <SwiperSlide key={product.idProd} className={styles.swiperSlide}>
            <div className={styles.productCard}>
              <Link href={`/ProductPage/${product.idProd}`} className={styles.linkContainer}>
                <div>
                  <Image
                    src={product.images[0].img}
                    alt={product.nom} 
                    width={800} 
                    height={800}
                    className={styles.productImage}
                  />
                </div>             
                <h3 className={styles.productName}>{product.nom}</h3> 
                <p className={styles.productPrice}>
                  {product.minPrice === product.maxPrice
                    ? `${product.minPrice} TND`
                    : `From ${product.minPrice}`}<span className={styles.tnSign}>TND</span>
                </p>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default RecommendedProducts;