import React, { useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import { motion } from 'framer-motion';
import QrCodeProductPreview from '../QrCodeProductPreview';
import './style.scss';
const QrCodeScanner = () => {
  const [productId, setProductId] = useState(null);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const videoRef = useRef(null);
  const stopScanner = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream && stream.getTracks) {
        stream.getTracks().forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
    }
  };
  const handleScan = (data) => {
    if (data) {
      setProductId(data);
      stopScanner();
      setIsScannerVisible(false);
    }
  };
  const handleError = (err) => {console.error("QR Reader Error:", err);};
  const handleButtonClick = () => {
    setProductId(null);
    setIsScannerVisible(true);
  };
  const handleCancelClick = () => {
    stopScanner();
    setIsScannerVisible(false);
    setProductId(null);
  };
  return (
    <div>
      <div className="containerQrcode">
        <center>
          {!productId && !isScannerVisible && (
            <button className="scanButton" onClick={handleButtonClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="cameraIcon" >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              Scanner un produit
            </button>
          )}
        </center>
        {isScannerVisible && (
          <>
          <center>
            <div className='windowQr'>
                <div className="QrcodeWindow">
                  <QrReader ref={videoRef}
                    onResult={(result, error) => {
                      if (!!result) {handleScan(result?.text);}
                      if (!!error) {handleError(error);}
                    }}
                    videoStyle={{objectFit: 'cover',width: '100%',height: '100%',}}
                    constraints={{ facingMode: 'environment' }}
                  />
                  <div className="cornerTopRight"></div>
                  <div className="cornerBottomLeft"></div>
                </div>
            </div>
          </center>
          <button className="cancelButton" onClick={handleCancelClick}>Cancel</button>
          </>
        )}
      </div>
      {productId && (
        <motion.div className="qrCodePreviewOverlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <motion.div className="qrCodePreviewContainer" initial={{ y: '-100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 15 }} >
            <div className='scrollable_div'>
              <button className="qrCodePreviewClose"
                onClick={() => {
                  setProductId(null);
                  stopScanner();
                  setProductId(null);
                  setIsScannerVisible(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    width={25}
                    height={25}
                    fill={"none"}>
                    <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <QrCodeProductPreview productId={productId} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
export default QrCodeScanner;