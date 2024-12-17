import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../LivingComponents/Products/ProductCard';
import styles from './SearchBar.module.scss';
import Link from 'next/link';
import QrCodeScanner from '../QrCode';
import Fuse from 'fuse.js';
const SearchBar = ({ isOpen, onClose, products }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [qrcodeDisplay, setQrcodeDisplay] = useState(false)

    const qrCodeButton = () => {
        setQrcodeDisplay(!qrcodeDisplay);
    }

    const handleInputChange = (e) => {
        const searchValue = e.target.value;
        setInputValue(searchValue);
        const trimmedSearchValue = searchValue.trim();
        if (trimmedSearchValue === '') {
            setFilteredProducts([]);
        } else {
            const options = {
                keys: ['nom'],
                threshold: 0.7,
            };
            const fuse = new Fuse(products, options);
            const filtered = fuse.search(trimmedSearchValue).map(result => result.item);
            setFilteredProducts(filtered);
        }
    };

    // Variants for the search bar itself
    const variants = {
        open: { y: 0, opacity: 1 },
        closed: { y: -100, opacity: 0 },
    };
    // Variants for the search results transition (for when searchbar opens/closes)
    const resultsVariants = {
        hidden: {
            y: -50,
            opacity: 0,
            height: 0,
            transition: { duration: 0.3 }
        },
        visible: {
            y: 0,
            opacity: 1,
            height: "80rem",
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }, 
        exit: { 
            y: -50, 
            height: 0,
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className='relative'>
            <motion.div
                className={styles.searchBar}
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                variants={variants}
                transition={{ duration: 0.3, ease: 'easeInOut' }}  
            >
                <div className={styles.searchContent}>
                    <div className={styles.searchContainer}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={20}
                            height={20}
                            fill={"none"}
                            className={styles.searchIcon}
                        >
                            <path
                                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M21 21L16.65 16.65"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        
                        <input
                            type="text"
                            placeholder="Recherche..."
                            className={styles.searchInput}
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <span className={styles.animatedLine}></span>
                    </div>
                    
                    <button className={styles.qrCodeButton} onClick={qrCodeButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            fill={"none"} 
                            width={20} 
                            height={20} 
                            viewBox="0 0 24 24"
                        >
                            <path stroke="currentColor"
                                strokeWidth="1"
                                d="m3,11h8V3H3v8Zm1-7h6v6h-6v-6Zm17-1h-8v8h8V3Zm-1,7h-6v-6h6v6ZM3,21h8v-8H3v8Zm1-7h6v6h-6v-6Zm1,5h4v-4h-4v4Zm1-3h2v2h-2v-2Zm-1-7h4v-4h-4v4Zm1-3h2v2h-2v-2Zm13-1h-4v4h4v-4Zm-1,3h-2v-2h2v2Zm1,11v-3h2v-3h-3v2h-2v-2h-3v3h2v2h-2v3h3v-2h3Zm0-5h1v1h-1v-1Zm-5,1v-1h1v1h-1Zm2,1h2v2h-2v-2Zm-1,4h-1v-1h1v1ZM1,7H0V2.5C0,1.122,1.122,0,2.5,0h4.5v1H2.5c-.827,0-1.5.673-1.5,1.5v4.5Zm1.5,16h4.5v1H2.5c-1.378,0-2.5-1.122-2.5-2.5v-4.5h1v4.5c0,.827.673,1.5,1.5,1.5Zm20.5-6h1v4.5c0,1.378-1.122,2.5-2.5,2.5h-4.5v-1h4.5c.827,0,1.5-.673,1.5-1.5v-4.5Zm1-14.5v4.5h-1V2.5c0-.827-.673-1.5-1.5-1.5h-4.5V0h4.5c1.378,0,2.5,1.122,2.5,2.5Z"
                            />
                        </svg>
                    </button>
                    
                    <button className={styles.closeButton} onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            width={25} 
                            height={25} 
                            fill={"none"}>
                            <path d="M19.0005 4.99988L5.00049 
                            18.9999M5.00049 4.99988L19.0005 18.9999" 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" />
                        </svg>
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                className={styles.searchResults}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={resultsVariants}
                            >
                                <div className={styles.foundProducts}>
                                    {filteredProducts.length > 0 ? (  
                                        filteredProducts.map((product, index) => (
                                            <div key={index} className={styles.productItem}>
                                                <Link href={`/ProductPage/${product.idProd}`}>
                                                    <ProductCard
                                                        image={product.images[0].img}
                                                        title={product.nom}
                                                        description={product.description}
                                                        imageObject = {[]}
                                                        priceMin={product.minPrice}
                                                        priceMax={product.maxPrice}
                                                        category={product.categorie}
                                                        idProd = {product.idProd}
                                                    />
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <div className={styles.noProductsFound}>
                                            <p>Aucun Produit TrouvÉ</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.div>
            
            <AnimatePresence>
                {qrcodeDisplay && (
                    <motion.div
                        className={styles.qrCodeResult}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={resultsVariants}
                    >
                        <div className={styles.containerQrcode}>
                            <div className={styles.closeButtonQrcode} onClick={qrCodeButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    width={24} 
                                    height={24} 
                                    fill={"none"}>
                                    <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className={styles.theQrcodeComponent}>
                                <QrCodeScanner />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
export default SearchBar;