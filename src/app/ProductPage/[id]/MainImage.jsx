"use client";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductPage.module.scss';
import { WhiteHeartAnimIcon } from './icons'
import { heartAnimVariants, scaleVariants } from './anim';
export default function MainImage({ mainImage, showTooltips, triggerHeartAnim, hyperPoints, products, onClick }) {
  return (
    <motion.div
    className={styles.mainImage}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    >
      <div className={styles.mainImageWrapper}>
        <Image
          key={mainImage}
          onClick={onClick}
          src={mainImage}
          alt="Product main image"
          width={500}
          height={500}
          layout="responsive"
          className={styles.mainImageimg}
        />
        <AnimatePresence>
          {triggerHeartAnim && (
            <motion.div 
              className={styles.heart} 
              variants={heartAnimVariants} 
              initial="initial" 
              animate="enter" 
              exit="exit"
            >
              <WhiteHeartAnimIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showTooltips &&
          hyperPoints.map((point, index) => (
            <motion.div
              key={index}
              className={styles.tooltipBox}
              style={{
                top: `calc(${point.posY}% + 10px)`,
                left: `calc(${point.posX}% - 20px)`,
              }}
              variants={scaleVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <div className={styles.tooltipContent}>
                <Link href={`/ProductPage/${point.produitID}`}>
                  <p className={styles.productName}>
                    {products.find((item) => item.idProd === point.produitID)?.nom}
                  </p>
                </Link>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </motion.div>
  );
}