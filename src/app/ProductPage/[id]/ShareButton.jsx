import styles from './ProductPage.module.scss';

export default function ShareButton( {name, description}) {
  const handleShareClick = () => {
    if (navigator.share) {navigator.share({title: name,text: description,url: window.location.href,}).catch(console.error);
    } else {navigator.clipboard.writeText(window.location.href);}
  };

  return (
    <div className={styles.shareButtonDiv}>
      <button className={styles.shareButtonDivDet} onClick={handleShareClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgba(48, 48, 48, 0.8)" strokeWidth="1" 
          strokeLinecap="round" strokeLinejoin="round"
          style={{ width: '24px', height: '24px', transform: 'rotate(20deg)' }}
        >
          <path d="M22 2L11 13" /><path d="M22 2L15 22 11 13 2 9l20-7z" />
        </svg>
      </button>

    </div>
  );
}