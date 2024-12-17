'use client';
import { React, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ProductCard from './ProductCard';
import styles from './style.module.scss';
export default function Products({ products }) {
  const pathname = usePathname();
  useEffect(() => {
    const saveScrollPosition = () => {
      if (pathname.includes('Shop')) {
        localStorage.setItem('productsScrollPosition', window.scrollY);
      }
    };
    const restoreScrollPosition = () => {
      if (pathname.includes('Shop')) {
        const savedScrollPosition = localStorage.getItem('productsScrollPosition');
        if (savedScrollPosition) {
          window.scrollTo(0, parseInt(savedScrollPosition, 10));
        }
      }
    };
    window.addEventListener('beforeunload', saveScrollPosition);
    restoreScrollPosition();
    const handleRouteChange = () => {
      restoreScrollPosition();
    };
    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [pathname]);
  const handleCardClick = () => {
    if (pathname.includes('Shop')) {
      localStorage.setItem('productsScrollPosition', window.scrollY);
    }
  };
  return (
    <div className={styles.Productsflex}>
      {products.map((product) => (
        <ProductCard
          key={product.idProd}
          image={product.images[0].img}
          imageObject={product.images}
          title={product.nom}
          description={product.description}
          priceMin={product.minPrice}
          priceMax={product.maxPrice}
          products={products}
          idProd={product.idProd}
          onClick={handleCardClick} 
        />
      ))}
    </div>
  );
}