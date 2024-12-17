import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import styles from "./style.module.scss";
export default function CustomSelect({ titleOptionSelect, onOptionSelectMousse }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("non");
  const dropdownRef = useRef();
  const hasMounted = useRef(false);
  useEffect(() => {
    if (hasMounted.current) {
      onOptionSelectMousse(selected);
    } else {
      hasMounted.current = true;
    }
  }, [selected, onOptionSelectMousse]);
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
  };
  const dropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: [1, 0.29, 0, 0.02] } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.3, ease: [1, 0.29, 0, 0.02] } },
  };
  const options = ["non", "oui"];
  return (
    <div className={styles.selectWrapper}>
      <div className={styles.selectContainer} ref={dropdownRef}>
        <button onClick={toggleDropdown} className={`${styles.selectButton} ${isOpen ? styles.open : ""}`}>
          {titleOptionSelect}: {selected}
          <span className={styles.arrowIcon}></span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul className={styles.selectList}
              initial="hidden" animate="visible" exit="exit"
              variants={dropdownVariants}
            >
              {options.map((option, index) => (
                <li key={option} className={styles.selectItem} onClick={() => handleSelect(option)} >
                  {option}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}