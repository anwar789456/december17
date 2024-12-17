"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './style.module.scss';
import { FavoriteIconFilled, FavoriteIconNotFilled } from './Icons.js';
import Pinchable from 'react-native-pinchable';

const ProductCard = ({ image, title, description, priceMin, priceMax, idProd, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleProductClick = () => {
    onClick();
    const recentProducts = JSON.parse(localStorage.getItem('RecentProductsClicked')) || [];
    if (!recentProducts.includes(idProd)) {
      recentProducts.push(idProd);
    }
    localStorage.setItem('RecentProductsClicked', JSON.stringify(recentProducts));
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    // Optionally, you could add logic to store favorites in localStorage or call an API here
  };


  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share(
        {
          title: title,
          url: window.location.href,
        }
      ).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };


  return (
    <div className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <Link href={`/ProductPage/${idProd}`} onClick={handleProductClick}>
          <div>
            <Pinchable>
              <Image
                src={image}
                alt="Product Image"
                layout="fill"
                objectFit="cover"
                className={styles.image}
                priority={true}
                loading="eager"
              />
            </Pinchable>
          </div>
        </Link>
      </div>
      <div className={styles.shareButtonDivDetail}>
        <div className={styles.shareButtonDiv}>
          <button className={styles.shareButtonDivDet}
            onClick={handleShareClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(48, 48, 48, 0.8)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '24px', height: '24px', transform: 'rotate(20deg)' }}
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
          </button>
        </div>
        <button
          className={styles.favoriteButton}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? <FavoriteIconFilled /> : <FavoriteIconNotFilled />}
        </button>
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.PriceRange}>
          {priceMin === priceMax ? (
            <p className={styles.price}>{priceMin}</p>
          ) : (
            <>
              <span className={styles.fromTitle}>à partir de</span>
              <p className={styles.price}>{priceMin}</p>
            </>
          )}
          <span className={styles.tnSign}>TND</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
