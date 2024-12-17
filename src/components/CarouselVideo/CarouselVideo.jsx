import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.scss';
import Magnetic from '../../common/Magnetic';
import Link from 'next/link';
import Image from 'next/image';

const CarouselAccueil = [
  { image: '/images/Adam-01.png', title: 'Lit Adam', idC: '/ProductPage/AD01' },
  { image: '/images/Barbara-00.jpg', title: "Canapé D'angle Barbara", idC: '/ProductPage/CAB01' },
  { image: '/images/CanapéAlex-00.jpg', title: 'Canapé Alex Deux Places', idC: '/ProductPage/CANALX01' },
  { image: '/images/CanapéAngleGaïa-03.png', title: "Canapé d'angle Gaïa", idC: '/ProductPage/CANGGAIA002' },
  { image: '/images/DivanHestia-00.jpg', title: 'Canapé Hestia deux Places', idC: '/ProductPage/CANHEST05' },
];

export default function CustomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  const slideRefs = useRef([]);
  const [areButtonsVisible, setAreButtonsVisible] = useState(true);
  const [arePaginationVisible, setArePaginationVisible] = useState(true);
  const currentIndexRef = useRef(currentIndex);
  const startX = useRef(0);
  const endX = useRef(0);
  const autoplayInterval = useRef(null);

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const startAutoplay = () => {
    if (autoplayInterval.current) return;
    autoplayInterval.current = setInterval(() => {
      handleNext();
    }, 10000);
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval.current);
    autoplayInterval.current = null;
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const scrollToBottom = () => {
    const targetScrollPosition = 0.9 * window.innerHeight;
    window.scrollTo({
      top: targetScrollPosition,
      behavior: 'smooth',
    });
  };

  const anim = {
    initial: { opacity: 0, scale: 1.3 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1 },
    transition: { opacity: { duration: 0, ease: 'easeOut' }, scale: { duration: 1.3, ease: 'easeOut' } },
  };

  const textAnim = {
    initial: { opacity: 0, y: 0 },
    animate: { opacity: 0, y: 60 },
    exit: { opacity: 1, y: 0 },
    transition: { opacity: { duration: 0.4, ease: 'easeOut' }, y: { duration: 0.2, ease: 'easeOut' } },
  };

  const buttonAnim = {
    initial: { opacity: 0, y: 0 },
    animate: { opacity: 0, y: 90 },
    exit: { opacity: 1, y: 0 },
    transition: { opacity: { duration: 0.6, ease: 'easeOut' }, y: { duration: 0.2, ease: 'easeOut' } },
  };

  const handleNext = () => {
    setIsTextAnimating(true);
    if (!isAnimating) {
      setIsAnimating(true);
      setAreButtonsVisible(false);
      setArePaginationVisible(false);
      fadeOutSlide(currentIndexRef.current, () => {
        const nextIndex = (currentIndexRef.current + 1) % CarouselAccueil.length;
        setCurrentIndex(nextIndex);
        fadeInSlide(nextIndex);
        resetAutoplay();
      });
    }
  };

  const handlePrev = () => {
    setIsTextAnimating(true);
    if (!isAnimating) {
      setIsAnimating(true);
      setAreButtonsVisible(false);
      setArePaginationVisible(false);
      fadeOutSlide(currentIndexRef.current, () => {
        const prevIndex = (currentIndexRef.current - 1 + CarouselAccueil.length) % CarouselAccueil.length;
        setCurrentIndex(prevIndex);
        fadeInSlide(prevIndex);
      });
    }
  };

  const fadeOutSlide = (index, callback) => {
    setTimeout(() => {
      callback();
    }, 0);
  };

  const fadeInSlide = (index) => {
    setTimeout(() => {
      setIsAnimating(false);
      setAreButtonsVisible(true);
      setArePaginationVisible(true);
    }, 1300);
  };

  const handlePaginationClick = (index) => {
    setIsTextAnimating(true);
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setAreButtonsVisible(false);
      setArePaginationVisible(false);
      fadeOutSlide(currentIndexRef.current, () => {
        setCurrentIndex(index);
        fadeInSlide(index);
        resetAutoplay();
      });
    }
  };

  const handleMouseDown = (e) => {
    startX.current = e.pageX || e.touches[0].pageX;
  };

  const handleMouseUp = (e) => {
    endX.current = e.pageX || e.changedTouches[0].pageX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diffX = startX.current - endX.current;
    if (diffX > 50) {
      handleNext();
    } else if (diffX < -50) {
      handlePrev();
    }
    startX.current = 0;
    endX.current = 0;
  };

  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      slide.style.opacity = index === currentIndex ? '1' : '0';
    });
  }, [currentIndex]);

  useEffect(() => {
    if (isTextAnimating) {
      const timer = setTimeout(() => {
        setIsTextAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTextAnimating]);

  return (
    <div className="relative">
      <div
        className={styles.carouselContainer}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <div className={styles.slidesContainer}>
          {CarouselAccueil.map((item, index) => (
            <motion.div
              key={index}
              ref={(el) => (slideRefs.current[index] = el)}
              className={styles.slide}
              initial="initial"
              animate={index === currentIndex ? 'animate' : 'initial'}
              exit="exit"
              variants={anim}
              transition={anim.transition}
            >
              <Image src={item.image} width={50000} height={50000} alt={`Slide ${index + 1}`} className={styles.slideImage} />
            </motion.div>
          ))}
        </div>
        <motion.div
          className={`${styles.slideInfo} ${!isTextAnimating ? styles.hidden : ''}`}
          key={currentIndex}
        >
          <motion.div
            initial="initial"
            animate={isTextAnimating ? 'animate' : 'exit'}
            variants={textAnim}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h2>{CarouselAccueil[currentIndex].title}</h2>
          </motion.div>
          <motion.div
            initial="initial"
            animate={isTextAnimating ? 'animate' : 'exit'}
            variants={buttonAnim}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Link href={CarouselAccueil[currentIndex].idC}>
              <button className={styles.exploreButton}>
                <Magnetic>
                  <p>Explorer</p>
                </Magnetic>
              </button>
            </Link>
          </motion.div>
        </motion.div>
        <button
          onClick={handlePrev}
          className={`${styles.prevButton} ${!areButtonsVisible ? styles.hidden : ''}`}
        >
          <span className={styles.arrowleft}></span>
        </button>
        <button
          onClick={handleNext}
          className={`${styles.nextButton} ${!areButtonsVisible ? styles.hidden : ''}`}
        >
          <span className={styles.arrowright}></span>
        </button>
        <div className={styles.pagination}>
          {CarouselAccueil.map((_, index) => (
            <div
              key={index}
              className={`${styles.paginationButton} ${
                index === currentIndex ? styles.active : ''
              } ${!arePaginationVisible ? styles.hidden : ''}`}
              onClick={() => handlePaginationClick(index)}
            />
          ))}
        </div>
      </div>
      <button onClick={scrollToBottom} className={styles.scrollDownButton}>
        <span className={styles.arrowDown}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={30} height={30} style={{ display: 'block', margin: 'auto' }}><path strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="white"  d="m12,16.074c-.4,0-.777-.156-1.061-.439l-5.281-5.281.707-.707,5.281,5.281c.189.189.518.189.707,0l5.281-5.281.707.707-5.281,5.281c-.283.283-.66.439-1.061.439Z"/></svg></span>
      </button>
    </div>
  );
}
