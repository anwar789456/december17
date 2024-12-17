'use client'
import { React, useState , useEffect} from 'react';
import Background from '../../../components/LivingComponents/Background/background';
import SideNavbar from '../../../components/Sidemenu/index';
import Header from '../../../components/Header';
import Curve from '@/components/Curve';
import { AnimatePresence } from 'framer-motion';

const routeWords = [
  { route: 'salon', text: 'Salon' },
  { route: 'salon-canapedangle', text: "Canapé d'angle" },
  { route: 'salon-canape', text: 'Canapé' },
  { route: 'salon-salons', text: 'Salon' },
  { route: 'salon-poufetfauteuil', text: 'Pouf & Fauteuil' },
  { route: 'salon-meubletv', text: 'Meuble TV' },
  { route: 'salon-tabledappoint', text: "Table d'appoint" },

  { route: 'chambreacoucher', text: 'Chambre à coucher' },
  { route: 'chambreacoucher-lit', text: 'Lit' },
  { route: 'chambreacoucher-tabledenuit', text: 'Table de nuit' },
  { route: 'chambreacoucher-commode', text: 'Commode' },
  { route: 'chambreacoucher-armoireetdressing', text: 'Armoire & Dressing' },
  { route: 'chambreacoucher-bureau', text: 'Bureau' },
];

export default function Shop({ params }) {
  const [sortData, setSortData] = useState(null);
  const [FilteredData, setFilteredData] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  var currentWord = routeWords.find(item => item.route === params.shopping)?.text || "Shop";
  var word = currentWord;

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 300);
    })();
  }, []);

  const handleFilterChange = (FilteredData) => {
    setFilteredData(FilteredData);
  };
  const handleSortChange = (sortData) => {
    setSortData(sortData);
  };
  const handlePriceRangeChange = (priceRange) => {
    setPriceRange(priceRange);
  };
  const handleSubCatChange = (subCats) => {
    setSelectedSubCats(subCats);
  };
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Curve word={word} />}
      </AnimatePresence>
      <Header sticky={true} />
      <SideNavbar onfilterChange={handleFilterChange} onSortChange={handleSortChange} onPriceRangeChange={handlePriceRangeChange} onSubCatChange={handleSubCatChange}/>
      <Background subcategory={params} filterData={FilteredData} sortingOption={sortData} priceRange={priceRange} selectedSubCats={selectedSubCats} />
    </>
  );
}
