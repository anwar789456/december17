import React from 'react';
import styles from './style.module.scss';
import { FaTwitter } from "react-icons/fa";

export default function Content() {
  return (
    <div className={styles.Content}>
      <div className={styles.Content_info}>
        <div className={styles.Content_info_adresse}>
          <div>
            <h3 className={styles.h3Text}>Adresse</h3>
            <p className={styles.pText}>Av. Abou Kacem<br/> Chebbi, 1er etage</p>
          </div>
          <div>
            <h3 className={styles.h3Text}>Contact</h3>
            <div className="flex">
              <a href="https://www.facebook.com/SametHomeDecoration?mibextid=kFxxJD" target="_blank" rel="noopener noreferrer" 
              className={styles.pIcon}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 320 512" 
                  className={styles.ficon}
                  fill="currentColor"
                >
                  <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 
                  20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/samet.home/profilecard/?igsh=djdrcDFyOXNrNHN2" target="_blank" 
              rel="noopener noreferrer" className={styles.pIcon}>
                {/* Inline SVG for Instagram icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className={styles.ficon}
                  fill="currentColor"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 
                  114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 
                  0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 
                  74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 
                  0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 
                  27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 
                  0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 
                  184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 
                  184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 
                  2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 
                  9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 
                  9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 
                  9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"
               className={styles.pIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
                className={styles.ficon} fill="currentColor">
                  <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 
                  53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3191.912333302407!2d10.18295069275734!3d36.868517172227705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2cbc5cf7ef331%3A0xedd2fb16f3822711!2sSamet%20Home!5e0!3m2!1sfr!2stn!4v1721746427457!5m2!1sfr!2stn"
          width="850"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
