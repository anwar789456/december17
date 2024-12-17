'use client';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import Categories from '../components/Categories';
import Footer from '../components/NewFooter/Footer'
import Header from '../components/Header';
//import Curve from '@/components/Curve'
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollbar, setShowScrollbar] = useState(false);

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
    <main>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Header sticky={false} />
      <Landing />
      <Categories />
      <Footer />
    </main >
  );
}