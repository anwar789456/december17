import { useState } from 'react';
import styles from './style.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { perspective, contentVariants } from "./anim";

const accordionData = [
  { title: "Dimensions", content: "Longeur: {Longeur}<br />Largeur: {Largeur}<br />Hauteur: {Hauteur}" },
  { title: "Disponibilité", content: "Sur Commande" },
];

export default function Accordion({ product }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Replace placeholders in the content dynamically
  const dynamicAccordionData = accordionData.map((item) => {
    if (item.title === "Dimensions") {
      return {
        ...item,
        content: `Longeur: ${product.longueur}cm<br />Largeur: ${product.largeur}cm<br />Hauteur: ${product.hauteur}cm`,
      };
    }
    return item;
  });

  return (
    <div className={styles.accordion}>
      <div className={styles.body}>
        {dynamicAccordionData.map((item, i) => {
          const { title, content } = item;
          const isActive = activeIndex === i;
          return (
            <div key={`b_${i}`} className={styles.itemContainer}>
              <motion.div custom={i} variants={perspective} initial="initial" animate="enter" exit="exit">
                <div className={styles.title} onClick={() => handleToggle(i)}>
                  {title}
                  <button onClick={() => handleToggle(i)}>{isActive ? '-' : '+'}</button>
                </div>
              </motion.div>
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    variants={contentVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className={styles.content}
                  >
                    {/* Render content as HTML */}
                    <p dangerouslySetInnerHTML={{ __html: content }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
