import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./style.module.scss";
export default function CustomSelect({ titleOptionSelect ,options, updateSelectedPrice }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef();
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    updateSelectedPrice(option);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      if (focusedIndex >= 0) {
        handleSelect(options[focusedIndex]);
      }
    }
  };
  const dropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {height: "auto",opacity: 1,transition: {duration: 0.3,ease: [1, 0.29, 0, 0.02],},},
    exit: {height: 0,opacity: 0,transition: {duration: 0.3,ease: [1, 0.29, 0, 0.02],},},
  };
  return (
    <div className={styles.selectWrapper}>
      <div className={styles.selectContainer} ref={dropdownRef}>
        <button onClick={toggleDropdown} className={`${styles.selectButton} ${isOpen ? styles.open : ""}`}>
          {titleOptionSelect}: {selected ? selected.option_name : options[0].option_name}
          <span className={styles.arrowIcon}></span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul className={styles.selectList}
              onKeyDown={handleKeyDown} tabIndex="0" initial="hidden" animate="visible"
              exit="exit" variants={dropdownVariants}>
              {options.map((option, index) => (
                <li key={option.option_name} className={`${styles.selectItem} ${focusedIndex === index ? styles.focused : ""}`}
                  onClick={() => handleSelect(option)} onMouseEnter={() => setFocusedIndex(index)}>
                  {option.option_name}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}