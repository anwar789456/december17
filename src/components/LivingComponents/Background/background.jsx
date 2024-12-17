'use client';
import { React, useEffect, useState } from 'react';
import styles from './style.module.scss';
import Products from '../Products/Products';
import { fetchProducts } from '../../../api/fetchProducts';
import LoadingAnimation from '../../Loadinganimation';

const categoriesFilters = [
  {
    title: "salon",
    subTitles: [
      { title: "Canapé d'angle", subCat: "salon-canapedangle" },
      { title: "Canapé", subCat: "salon-canape" },
      { title: "Salon", subCat: "salon-salons" },
      { title: "Pouf & Fauteuil", subCat: "salon-poufetfauteuil" },
      { title: "Meuble TV", subCat: "salon-meubletv" },
      { title: "Table d’appoint", subCat: "salon-tabledappoint" },
    ],
  },
  {
    title: "chambreacoucher",
    subTitles: [
      { title: "Lit", subCat: "chambreacoucher-lit" },
      { title: "Table de nuit", subCat: "chambreacoucher-tabledenuit" },
      { title: "Commode", subCat: "chambreacoucher-commode" },
      { title: "Armoire & Dressing", subCat: "chambreacoucher-armoireetdressing" },
      { title: "Bureau", subCat: "chambreacoucher-bureau" },
    ],
  },
];

export default function Background({ subcategory, filterData, sortingOption, priceRange, selectedSubCats }) {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchProducts();
        setData(fetchedData);
      } catch (error) {
        console.error("get out");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Get the main category from the URL
  const category = subcategory.shopping.split('-')[0];

  // Find the matching category filter in categoriesFilters
  const matchedCategory = categoriesFilters.find(cat => cat.title === category);
  const subCatOrder = matchedCategory ? matchedCategory.subTitles.map(sub => sub.subCat) : [];

  // Filter products by main category
  const filteredByCategory = Data.filter(product => product.subcategorie === category);

  // Further filter by selected subcategories if any
  const filteredBySubCats = selectedSubCats.length > 0
    ? filteredByCategory.filter(product => selectedSubCats.includes(product.categorie))
    : filteredByCategory;

  // Filter by availability or show all
  const filteredProducts = filterData === 'all'
    ? filteredBySubCats
    : filteredBySubCats.filter(product => product.disponibilite === filterData);

  // Exclude products that shouldn't be displayed
  const productsWithoutNonDisplay = filteredProducts.filter(product => product.display !== 'non');

  // Filter by price range
  const finalFilteredProducts = priceRange && typeof priceRange.min === 'number' && typeof priceRange.max === 'number'
    ? productsWithoutNonDisplay.filter(product => product.minPrice >= priceRange.min && product.minPrice <= priceRange.max)
    : productsWithoutNonDisplay;

  // Sort products by subcategory order from categoriesFilters
  const sortedBySubCatOrder = finalFilteredProducts.sort((a, b) => {
    const indexA = subCatOrder.indexOf(a.categorie);
    const indexB = subCatOrder.indexOf(b.categorie);
    return indexA - indexB;
  });

  
  const sortedProducts = sortingOption
    ? sortedBySubCatOrder.sort((a, b) => {
        const order = sortingOption === 'descending' ? -1 : 1;
        return (a.minPrice - b.minPrice) * order;
      })
    : sortedBySubCatOrder;

  return (
    <div className={styles.container}>
      <div className={styles.background_container}>
        {loading ? (
          <LoadingAnimation />
        ) : sortedProducts.length === 0 ? (
          <div className={styles.noProductsDiv}>
            <p className={styles.noProductsText}>aucun produit trouvé</p>
          </div>
        ) : (
          <Products products={sortedProducts} />
        )}
      </div>
    </div>
  );
}