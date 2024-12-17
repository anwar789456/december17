import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styles from './style.module.scss';
import { blur, translate } from '../../animation';
export default function Body({ links, selectedLink, setSelectedLink, handleLinkClick }) {
  const [scrollIndex, setScrollIndex] = useState(null);
  const subLinksRefs = useRef([]);
  const scrollTimeoutRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  useEffect(() => {
    return () => {
      clearTimeout(scrollTimeoutRef.current);
      clearInterval(scrollIntervalRef.current);
    };
  }, []);
  const handleScroll = (index) => {
    if (subLinksRefs.current[index]) {
      const subLinksEl = subLinksRefs.current[index];
      subLinksEl.scrollBy({ top: 26, behavior: 'smooth' }); // Scroll down by 1rem
    }
  };
  const handleScrollUp = (index) => {
    if (subLinksRefs.current[index]) {
      const subLinksEl = subLinksRefs.current[index];
      subLinksEl.scrollBy({ top: -26, behavior: 'smooth' }); // Scroll up by 1rem
    }
  };
  const handleMouseDown = (index, direction) => {
    setScrollIndex(index);
    scrollIntervalRef.current = setInterval(() => {
      if (direction === 'down') {
        handleScroll(index);
      } else if (direction === 'up') {
        handleScrollUp(index);
      }
    }, 100); // Adjust interval time for smoothness
  };
  const handleMouseUp = () => {
    clearInterval(scrollIntervalRef.current); // Stop scrolling
  };
  const handleMouseLeave = () => {
    clearInterval(scrollIntervalRef.current); // Stop scrolling if mouse leaves
  };
  const handleClick = (index, direction) => {
    clearTimeout(scrollTimeoutRef.current); // Clear any previous timeout
    if (direction === 'down') {
      handleScroll(index); // Scroll down once on click
    } else if (direction === 'up') {
      handleScrollUp(index); // Scroll up once on click
    }
  };
  const getChars = (word) => {
    return word.split("").map((char, i) => (
      <motion.span
        custom={[i * 0.01, (word.length - i) * 0.005]}
        variants={translate}
        initial="initial"
        animate="enter"
        exit="exit"
        key={char + i}
        style={{ display: char === ' ' ? 'inline-block' : 'inline' }}>
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };
  return (
    <div className={styles.body}>
    {links.map((link, index) => {
      const { title, href, subLinks, image } = link;
      return (
        <div className={styles.linkGroup} key={`l_${index}`}>
          <Link href={href} onClick={handleLinkClick}>
            <motion.p
              onMouseOver={() => { 
                setSelectedLink({ isActive: true, index , subIndex: null, isSublink: false }); 
              }}
              onMouseLeave={() => { 
                setSelectedLink({ isActive: false, index , subIndex: null, isSublink: false });
              }}
              variants={blur}
              animate={selectedLink.isActive && selectedLink.index !== index ? "open" : "closed"}>
              {getChars(title)}
            </motion.p>
          </Link>
          <div className={styles.subLinksContainer}>
          <ul className={styles.subLinks}
            ref={el => (subLinksRefs.current[index] = el)} >
              {subLinks.map((subLink, subIndex) => (
                <li key={`sub_${index}_${subIndex}`} className={styles.center_p}>
                  <Link href={subLink.href} onClick={handleLinkClick}>
                    <motion.p
                      onMouseOver={() => {
                        setSelectedLink({ isActive: true, index, subIndex, isSublink: true });
                      }}
                      onMouseLeave={() => {
                        setSelectedLink({ isActive: false, index: null, subIndex: null, isSublink: false });
                      }}
                      variants={blur}
                      animate={selectedLink.isActive && selectedLink.index !== index ? "open" : "closed"}>
                      {subLink.title}
                    </motion.p>
                  </Link>
                </li>
              ))}
            </ul>
            {subLinks.length > 5 && (
              <motion.div
                className={styles.scrollIndicatorContainer}
                variants={blur}
                animate={selectedLink.isActive && selectedLink.index !== index ? "open" : "closed"}>
                <FiChevronUp
                  className={styles.scrollArrow}
                  onMouseDown={() => handleMouseDown(index, 'up')}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(index, 'up')}
                />
                <FiChevronDown
                  className={styles.scrollArrow}
                  onMouseDown={() => handleMouseDown(index, 'down')}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(index, 'down')}
                />
              </motion.div>
            )}
          </div>
        </div>
      );
    })}
  </div>
  );
}