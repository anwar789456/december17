import Image from 'next/image';
import React from 'react';
import styles from './style.module.scss';

import Magnetic from '../../common/Magnetic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../Effects/Variants';

const categories = [
  { href: '/Shop/salon',src: '/images/CA-Léo-05.png', alt: 'Laurus', title: 'Salon' },
  { href: '/Shop/chambreacoucher',src: '/images/Yannis-03.png', alt: 'Alexandra', title: 'Chambre à coucher' },
  //{ src: '/images/René-00.jpg', alt: 'René', title: 'Bedroom Pillows' },
  //{ src: '/images/Léo-01.jpg', alt: 'Léo', title: 'Dining tables' },
  //{ src: '/images/Valéria-10.png', alt: 'Valéria', title: 'Dining tables' },
  //{ src: '/images/Témas-11.png', alt: 'Témas', title: 'Dining tables' }
];

export default function Categories() {
  return (
    <div className={styles.container}>
      <div className={styles.grid_container}>
        {categories.map((category, index) => (
          <div key={index} className={styles.category_container}>
            <div className={styles.Image_div}>
              <motion.div variants={fadeIn('', 0)} initial='hidden' whileInView='show' viewport={{ amount: 0.01, once: true }} className={styles.categoryImage}>
                <Image src={category.src} alt={category.alt} width={1080} height={1080} className={styles.theImage} />
              </motion.div>
            </div>
            <Link href={category.href}>
              <div className={styles.title_container}>
                <h1 className={styles.title_h1_text}>{category.title}</h1>
                <div className={styles.button}>
                  <Magnetic><p>Explorer</p></Magnetic>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}