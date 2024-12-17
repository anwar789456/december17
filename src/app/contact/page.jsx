'use client';
import Header from '@/components/Header';
import styles from './page.module.scss';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/NewFooter/Footer';
import Curve from '@/components/Curve';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
export default function Contact() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const word = "Contact"
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        setShowScrollbar(true);
        window.scrollTo(0, 0);
      }, 300);
    })();
  }, []);
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Curve word={word} />}
      </AnimatePresence>
      <Header sticky={true} />
      <div className={styles.containerContact}>
        <ContactForm />
      </div>
      <Footer />
    </>
  );
}