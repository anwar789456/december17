'use client';
import styles from './style.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '../../animation';
import Body from '../Body';
import Image from '../Image';
const links = [
  {
    title: "Salon",
    href: "/Shop/salon",
    src: "SalonHestia-00.jpg",
    subLinks: [
      { title: "Canapé d'angle", href: "/Shop/salon-canapedangle", src: "CA-Léo-05.png", },
      { title: "Canapé", href: "/Shop/salon-canape", src: "Laurus-03.jpg", },
      { title: "Salon", href: "/Shop/salon-salons", src: "SalonLaurus-01.jpg", },
      { title: "Pouf & Fauteuil", href: "/Shop/salon-poufetfauteuil", src: "Zoé-00.png", },
      //{ title: "Table basse", href: "/Shop/salon-tablebasse", src: "Barbara.png", },
      { title: "Meuble TV", href: "/Shop/salon-meubletv", src: "ElementTVClément-00.jpg" },
      { title: "Table d’appoint", href: "/Shop/salon-tabledappoint", src: "tableappoint-01.png", },
    ]
  },
  /*{
    title: "Salle à Manger",
    href: "/Shop/salleamanger",
    src: "Rina.png",
    subLinks: [
      { title: "Table à manger", href: "/Shop/salleamanger-tableamanger", src: "Barbara.png", },
      { title: "Chaise", href: "/Shop/salleamanger-chaise", src: "Vladimir.png", },
      { title: "Buffet", href: "/Shop/salleamanger-buffet", src: "Barbara.png", },
      { title: "Vaisselier", href: "/Shop/salleamanger-vaisselier", src: "Barbara.png", },
      { title: "Bar à Cocktail", href: "/Shop/salleamanger-baracocktail", src: "Vladimir.png", },
    ]
  },*/
  {
    title: "Chambre à coucher",
    href: "/Shop/chambreacoucher",
    src: "Témas-06.png",
    subLinks: [
      { title: "Lit", href: "/Shop/chambreacoucher-lit", src: "Thimothé-03.png", },
      { title: "Table de nuit", href: "/Shop/chambreacoucher-tabledenuit", src: "TDNA036-A1.png", },
      { title: "Commode", href: "/Shop/chambreacoucher-commode", src: "CommodeA06-B-00.jpg", },
      //{ title: "Coiffeuse", href: "/Shop/chambreacoucher-coiffeuse", src: "Barbara.png", },
      { title: "Armoire & Dressing", href: "/Shop/chambreacoucher-armoireetdressing", src: "Dressing-00.jpg", },
      { title: "Bureau", href: "/Shop/chambreacoucher-bureau", src: "bureau-00.jpg", },
    ]
  },
/*
  {
    title: "Linge de maison",
    href: "/Shop/lingedemaison",
    src: "Ulysse.png",
    subLinks: [
      { title: "Linge de lit", href: "/Shop/lingedemaison-lingedelit", src: "Barbara.png", },
      { title: "Plaid & Couverture", href: "/Shop/lingedemaison-plaidetcouverture", src: "Vladimir.png", },
      { title: "Coussin", href: "/Shop/lingedemaison-coussin", src: "Barbara.png", },
      { title: "Rideau, voilage", href: "/Shop/lingedemaison-rideauvoilage", src: "Barbara.png", },
      { title: "Tapis", href: "/Shop/lingedemaison-tapis", src: "Barbara.png", },
    ]
  },
  {
    title: "Art de la Table",
    href: "/Shop/artdelatable",
    src: "René.png",
    subLinks: [
      { title: "Assiette & bol", href: "/Shop/artdelatable-assietteetbol", src: "Vladimir.png", },
      { title: "Verre & carafe", href: "/Shop/artdelatable-verreetcarafe", src: "Barbara.png", },
      { title: "Ustensil & Couvert", href: "/Shop/artdelatable-ustensiletcouvert", src: "Barbara.png", },
      { title: "Plat de service", href: "/Shop/artdelatable-platdeservice", src: "Barbara.png", },
    ]
  },
  
  {
    title: "Décoration",
    href: "/Shop/decoration",
    src: "Ulysse.png",
    subLinks: [
      { title: "Statue & Sculpture", href: "/Shop/decoration-statueetsculpture", src: "Barbara.png", },
      { title: "Objet décoratif", href: "/Shop/decoration-objetdecoratif", src: "Vladimir.png", },
      { title: "Tableau", href: "/Shop/decoration-tableau", src: "Ulysse.png", },
      { title: "Miroir", href: "/Shop/decoration-miroir", src: "Barbara.png", },
      { title: "Végétaux et fleur", href: "/Shop/decoration-vegetauxetfleur", src: "Barbara.png", },
    ]
  },
  {
    title: "Produit artisanal",
    href: "/Shop/produitartisanal",
    src: "Ulysse.png",
    subLinks: [
      { title: "Bois d’olivier", href: "/Shop/produitartisanal-boisdolivier", src: "Barbara.png", },
      { title: "Fibre Naturelle", href: "/Shop/produitartisanal-fibrenaturelle", src: "Vladimir.png", },
      { title: "Potterie", href: "/Shop/produitartisanal-potterie", src: "Barbara.png", },
      { title: "Toile de jute", href: "/Shop/produitartisanal-toiledejute", src: "Ulysse.png", },
      { title: "Fouta", href: "/Shop/produitartisanal-fouta", src: "Barbara.png", },
    ]
  },
  {
    title: "Éclairage",
    href: "/Shop/eclairage",
    src: "Ulysse.png",
    subLinks: [
      { title: "Lampadaire", href: "/Shop/eclairage-lampadaire", src: "Vladimir.png", },
      { title: "Abat Jour", href: "/Shop/eclairage-abatjour", src: "Ulysse.png", },
      { title: "Lustre", href: "/Shop/eclairage-lustre", src: "Barbara.png", },
    ]
  },

  
  {
    title: "Rangement",
    href: "/Shop/rangement",
    src: "Ulysse.png",
    subLinks: [
      { title: "Étagère & bibliothèque", href: "/Shop/rangement-etagereetbibliotheque", src: "Barbara.png", },
      { title: "Boîte de rangement", href: "/Shop/rangement-boitederangement", src: "Barbara.png", },
      { title: "Porte-manteaux", href: "/Shop/rangement-portemanteaux", src: "Vladimir.png", },
      { title: "Porte-chaussures", href: "/Shop/rangement-portechaussures", src: "Ulysse.png", },
      { title: "Panier & coffre", href: "/Shop/rangement-panieretcoffre", src: "Barbara.png", },
    ]
  },
  */
];

export default function Index({ handleLinkClick }) {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: null, subIndex: null, isSublink: false });
  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit" 
                className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body links={links} selectedLink={selectedLink} 
          setSelectedLink={setSelectedLink} handleLinkClick={handleLinkClick} />
        </div>
        <div className={`${styles.imageContainer} ${selectedLink.isActive ? styles.glowing : ''}`}>
          <Image
            src={
              selectedLink.isSublink
                ? links[selectedLink.index]?.subLinks[selectedLink.subIndex]?.src
                : links[selectedLink.index]?.src
            }
            alt="imageHere"
            isActive={selectedLink.isActive}
          />
        </div>

      </div>
    </motion.div>
  )
}