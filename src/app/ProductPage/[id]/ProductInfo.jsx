"use client";

import { useState } from 'react';
import styles from './ProductPage.module.scss';
import { WhiteHeartIcon, PinkHeartIcon } from './icons';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

export default function ProductInfo({ name, description, totalPrice, onHeartClick, likedImage }) {
  const [isFavorisFilled, setIsFavorisFilled] = useState(false);

  return (
    <div className={styles.Productinfos}>
      <div className={styles.titleDiv}>
        <h1 className={styles.titleInfo}>{name}</h1>
      </div>
      <div className={styles.priceDiv}>
        <p className={styles.priceInfo}>
          <span className={styles.minmaxPrice}>{totalPrice}</span>
          <span className={styles.tnworddesign}>TND</span>
        </p>
      </div>
      <div className="flex">
        <div className={styles.heartButtonDivDetail}>
          <button onClick={onHeartClick}>
            {likedImage ? <PinkHeartIcon /> : <WhiteHeartIcon />}
          </button>
        </div>
        <div className={styles.shareButtonDivDetail}>
         <ShareButton name={name} description={description}/>
        </div>
        <FavoriteButton
          isFilled={isFavorisFilled}
          onClick={() => setIsFavorisFilled(!isFavorisFilled)}
        />
      </div>

    </div>
  );
}