import React from "react";
import styles from "./ProductPage.module.scss";

export default function QuantityController({ quantity, increaseQuantity, decreaseQuantity }) {
  return (
    <div className={styles.quantityController}>
      <div className={styles.minusDiv} onClick={decreaseQuantity}>
        <button className={styles.quantityBtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.minusIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
          </svg>
        </button>
      </div>
      <div className={styles.quantityDiv}>
        <span className={styles.quantityDisplay}>{quantity}</span>
      </div>
      <div className={styles.plusDiv} onClick={increaseQuantity}>
        <button className={styles.quantityBtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.plusIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
}
