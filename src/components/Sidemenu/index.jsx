import {React, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';
import MultiRangeSlider from '../SliderRange/MultiRangeSlider';
const iconAnimation = {initial: { opacity: 0, scale: 0.5, rotate: 0 },animate: { opacity: 1, scale: 1, rotate: 360 },exit: { opacity: 0, scale: 0.5, rotate: 0 }};
const categoriesFilters = [
  {title: "salon",subTitles: [{ title: "Canapé d'angle", subCat: "salon-canapedangle"},{ title: "Canapé", subCat: "salon-canape"},{ title: "Salon", subCat: "salon-salons"},{ title: "Pouf & Fauteuil", subCat: "salon-poufetfauteuil"},{ title: "Meuble TV", subCat: "salon-meubletv"},{ title: "Table d’appoint", subCat: "salon-tabledappoint"},]},
  {title: "chambreacoucher",subTitles: [{ title: "Lit", subCat: "chambreacoucher-lit"},{ title: "Table de nuit", subCat: "chambreacoucher-tabledenuit"},{ title: "Commode", subCat: "chambreacoucher-commode"},{ title: "Armoire & Dressing", subCat: "chambreacoucher-armoireetdressing"},{ title: "Bureau", subCat: "chambreacoucher-bureau"},]},
];
export default function SideNavbar( { onfilterChange, onSortChange, onPriceRangeChange, onSubCatChange } ) {
  const [selected, setSelected] = useState('all');
  const [ascDescSelected, setAscDescSelected] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSortbarOpen, setisSortbarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5160]);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [filteredSubTitles, setFilteredSubTitles] = useState([]);

  useEffect(() => {
    const currentUrl = window.location.pathname; 
    const pathAfterSlash = currentUrl.split('/').pop();
    if (!pathAfterSlash.includes('-')) {
      const matchedCategory = categoriesFilters.find(cat => cat.title === pathAfterSlash);
      if (matchedCategory) {
        setFilteredSubTitles(matchedCategory.subTitles);
      }
    } 
    
    else {
      const categoryBeforeHyphen = pathAfterSlash.split('-')[0];
      const matchedCategory = categoriesFilters.find(cat => cat.title === categoryBeforeHyphen);
      if (matchedCategory) {
        setFilteredSubTitles(matchedCategory.subTitles);
        setSelectedSubCats(prevSelected => {
          const updatedSelection = prevSelected.includes(pathAfterSlash)
            ? prevSelected
            : [...prevSelected, pathAfterSlash];
          onSubCatChange(updatedSelection);
          return updatedSelection;
        });
      }
    }
  }, []);
  

  const handleCheckboxChange = (subCat) => {
    setSelectedSubCats(prevSelected => {
      const updatedSelection = prevSelected.includes(subCat)
        ? prevSelected.filter(item => item !== subCat)
        : [...prevSelected, subCat];
      onSubCatChange(updatedSelection);
      return updatedSelection;
    });
  };

  const handlePriceChange = (range) => {setPriceRange(range);};
  const handlePriceChangeComplete = (range) => {onPriceRangeChange(range);};

  const handleRadioChange = (value, group) => {
    if (group === 'availability') {
      setSelected(selected === value ? null : value);
      onfilterChange(value);
    } else if (group === 'ascdesc') {
      // If 'none' is selected, set ascDescSelected to null to uncheck
      setAscDescSelected(value === 'none' ? null : value);
      
      // Pass the selected value or null (for no sorting) to onSortChange
      onSortChange(value === 'none' ? null : value);
    }
    setisSortbarOpen(false);
  };
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setisSortbarOpen(false);
  };
  const toggleSortbar = () => {
    setisSortbarOpen(!isSortbarOpen);
    setIsSidebarOpen(false);
  };
  const toggleSortbar2 = () => {
    setisSortbarOpen(!isSortbarOpen);
    setIsSidebarOpen(true);
  };
  return (
    <>
      <div className={styles.filterBar}>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          <AnimatePresence mode="wait">
            <motion.div key={isSidebarOpen ? 'times' : 'search'} initial="initial" animate="animate" exit="exit" variants={iconAnimation}>
              {isSidebarOpen ? 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={15} height={15} fill={"none"}><path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"  stroke="currentColor" strokeWidth="1" strokeLinecap="round"  strokeLinejoin="round" /></svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={15} height={15} color={"#000000"}  fill={"none"}><path d="M3 7H6" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 17H9" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round" /><path d="M18 17L21 17" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 7L21 7" stroke="currentColor" strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z"  stroke="currentColor" strokeWidth=".8" /><path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z"  stroke="currentColor" strokeWidth=".8" /></svg>}
            </motion.div>
          </AnimatePresence>
        </button>
        <div className={styles.filterOptions}>
          <div className={styles.filterDiv}><span onClick={toggleSidebar} className={styles.filterText}>Filtre</span></div>
          <div className={styles.sortDiv} onClick={toggleSortbar} >
            <svg xmlns="http://www.w3.org/2000/svg"  className={styles.sortIcon} viewBox="0 0 24 24"  width={15}  height={16} fill="currentColor">
              <path stroke="currentColor" strokeWidth=".3" strokeLinecap="round" strokeLinejoin="round" d="M6 21l4-4H7V3H5v14H2l4 4zM18 3l-4 4h3v14h2V7h3l-4-4z"/>
            </svg><span className={styles.sortText}>Tri</span>
          </div>
        </div>
      </div>
      <div className={`${styles.container} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebar}>
          <div className={styles.listContainer}>
            <div className={styles.headTitle}><h1 className={styles.h1}>Disponibilité</h1></div>
            <div>
              <label className={styles.sidebarLabelContainer}>
                <input type="radio" name="availability" checked={selected === 'all'}  onChange={() => handleRadioChange('all', 'availability')} readOnly />
                <span className={styles.checkmark}></span><h1 className={styles.h1Label}>Tous</h1>
              </label>
              <label className={styles.sidebarLabelContainer}>
                <input type="radio" name="availability" checked={selected === 'instock'}  onChange={() => handleRadioChange('instock', 'availability')} readOnly />
                <span className={styles.checkmark}></span><h1 className={styles.h1Label}>En Stock</h1>
              </label>
              <label className={styles.sidebarLabelContainer}>
                <input type="radio" name="availability" checked={selected === 'commande'}  onChange={() => handleRadioChange('commande', 'availability')} readOnly />
                <span className={styles.checkmark}></span><h1 className={styles.h1Label}>Sur Commande</h1>
              </label>
              <div className={styles.checkboxSectionDiv}> 
                <div className={styles.headTitle}>
                  <h1 className={styles.h1}>Type de Produit</h1>
                </div>
                {filteredSubTitles.map((subTitle) => (
                  <label key={subTitle.subCat} className='flex'>
                    <input className={styles.checkboxSectionCheckbox} 
                      type="checkbox" 
                      value={subTitle.subCat} 
                      checked={selectedSubCats.includes(subTitle.subCat)} 
                      onChange={() => handleCheckboxChange(subTitle.subCat)}
                    />
                    <div className={styles.checkboxSectionCheckboxTitle}>{subTitle.title}</div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.listContainer}>
            <div className={styles.headTitle}><h1 className={styles.h1}>Prix</h1></div>
            <div className={styles.priceRangeContainer}>
              <MultiRangeSlider min={priceRange[0]} max={priceRange[1]} onChange={() => handlePriceChange} onChangeComplete={handlePriceChangeComplete} setIsSidebarOpen={setIsSidebarOpen} />
            </div>
          </div>
          <div className={styles.hiddenSortPart}>
            <div className={styles.listContainer}>
              <div className={styles.headTitle}>
                <h1 className={styles.h1}>Tri</h1>
              </div>
              <div>
                <label className={styles.sidebarLabelContainer}>
                  <input type="radio" name="ascdesc" checked={ascDescSelected === 'none'} onChange={() => handleRadioChange('none', 'ascdesc')} />
                  <span className={styles.checkmark}></span>
                  <h1 className={styles.h1Label}>Aucun tri</h1>
                </label>

                <label className={styles.sidebarLabelContainer}>
                  <input type="radio" name="ascdesc" checked={ascDescSelected === 'ascending'} onChange={() => handleRadioChange('ascending', 'ascdesc')} />
                  <span className={styles.checkmark}></span>
                  <h1 className={styles.h1Label}>Prix Ascendant ↑</h1>
                </label>

                <label className={styles.sidebarLabelContainer}>
                  <input type="radio" name="ascdesc" checked={ascDescSelected === 'descending'} onChange={() => handleRadioChange('descending', 'ascdesc')} />
                  <span className={styles.checkmark}></span>
                  <h1 className={styles.h1Label}>Prix Descendant ↓</h1>
                </label>
                
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className={`${styles.sortbarContainer} ${isSortbarOpen ? styles.open : ''}`}>
        <div className={styles.sortbar}>
          <div className={styles.listContainer}>
              <div className={styles.headTitleSort}>
                <h1 className={styles.h1}>Trier</h1>
                <div className={styles.closeButtonSort} onClick={toggleSortbar}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={26} height={26} fill="currentColor"><path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth=".5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              </div>
              <div className={styles.buttonsContainer}>
                <button className={`${styles.sortButton} ${ascDescSelected === 'none' ? styles.active : ''}`}  onClick={() => handleRadioChange('none', 'ascdesc')}>Aucun tri</button>
                <button className={`${styles.sortButton} ${ascDescSelected === 'ascending' ? styles.active : ''}`}  onClick={() => handleRadioChange('ascending', 'ascdesc')}>Prix Ascendant ↑</button>
                <button className={`${styles.sortButton} ${ascDescSelected === 'descending' ? styles.active : ''}`}  onClick={() => handleRadioChange('descending', 'ascdesc')}>Prix Descendant ↓</button>
                <button className={styles.sortButton} onClick={toggleSortbar2}>Type Produit</button>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}