import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scaleVariants } from './anim';
import styles from './ProductPage.module.scss';
import Image from 'next/image';
export const ImagePreview = ({ image, onClose }) => {
  const [scale, setScale] = useState(1);
  const [lastPinchDistance, setLastPinchDistance] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      setLastPinchDistance(distance);
    } else if (e.touches.length === 1) {
      setStartPosition({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
      setIsDragging(true);
    }
  };
  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      if (lastPinchDistance) {
        const delta = distance - lastPinchDistance;
        setScale(prevScale => Math.min(Math.max(1, prevScale + delta * 0.01), 4));
      }
      setLastPinchDistance(distance);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      const newX = e.touches[0].clientX - startPosition.x;
      const newY = e.touches[0].clientY - startPosition.y;
      setPosition({ x: newX, y: newY });
    }
  };
  const handleTouchEnd = () => {
    setLastPinchDistance(null);
    setIsDragging(false);
  };
  const handleDoubleClick = (e) => {
    e.preventDefault();
    if (scale === 1) {
      setScale(2);
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };
  const getTouchDistance = (touches) => {
    return Math.hypot(
      touches[1].clientX - touches[0].clientX,
      touches[1].clientY - touches[0].clientY
    );
  };
  return (
    <motion.div className={styles.previewOverlay} variants={scaleVariants} initial="initial" animate="enter" exit="exit" onClick={onClose}>
      <button className={styles.closeButton} onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <motion.div className={styles.imageContainer} style={{ scale, x: position.x, y: position.y, }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onDoubleClick={handleDoubleClick} onClick={(e) => e.stopPropagation()} >
        <Image src={image} alt="Preview" layout="fill" objectFit="contain" draggable={true} className={styles.previewImage} />
      </motion.div>
    </motion.div>
  );
};