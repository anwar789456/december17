"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductPage.module.scss';

export default function ImageGallery({ images, onImageClick, selectedIndex }) {
  return (
    <div className={styles.imageGallery}>
      <div className={styles.scrollImages} style={{ position: 'relative' }}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${index === selectedIndex ? styles.selected : ''}`}
            onClick={() => onImageClick(img.img, index)}
          >
            <Image
              className={styles.image}
              src={img.img}
              alt={`Product image ${index + 1}`}
              width={100}
              height={100}
              layout="responsive"
            />
          </div>
        ))}
      </div>
    </div>
  );
}