import { useState } from 'react';
import styles from './style.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { links } from './data';
import { perspective, slideIn, sublinkVariants } from "./anim";
import Link from 'next/link';

const fadeIn = (delay) => {
  return {
      hidden: {
          opacity: 0,
      },
      show: {
          opacity: 1,
          transition: {
              type: 'tween',
              duration: 0.8,
              delay: delay,
              ease: [0.25, 0.25, 0.25, 0.75],
          }
      }
  }
}

export default function Nav({ setIsActive }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link, i) => {
          const { title, href, sublinks } = link;
          const isActive = activeIndex === i;

          return (
            <div key={`b_${i}`} className={styles.linkContainer}>
              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                {sublinks && sublinks.length > 0 ? (
                  <div className={styles.mainLink} onClick={() => handleToggle(i)}>
                    <Link href={href} onClick={(e) => e.stopPropagation()}>
                      <div>
                        {title}
                      </div>
                    </Link>
                    <button>{isActive ? '-' : '+'}</button>
                  </div>
                ) : (
                  <Link href={href} className={styles.mainLinkNormal}>
                    {title}
                  </Link>
                )}
              </motion.div>
              <AnimatePresence>
                {isActive && sublinks && (
                  <motion.div
                    variants={sublinkVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className={styles.sublinks}
                  >
                    {sublinks.map((sublink, j) => (
                      <Link key={`s_${j}`} href={sublink.href}>
                        {sublink.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    <AnimatePresence>
      <motion.footer 
       variants={fadeIn(0.8)}
       initial='hidden'
       whileInView='show'
       className={styles.footer}>
        <div className={styles.socialIcons}>
          {/* Facebook SVG */}
          <a href="https://www.facebook.com/SametHomeDecoration?mibextid=kFxxJD" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 509 507.14"
            >
              <path
                fill="rgba(48, 48, 48, 0.7)"
                fill-rule="nonzero"
                d="M509 254.5C509 113.94 395.06 0 254.5 0S0 113.94 0 254.5C0 373.86 82.17 474 193.02 501.51V332.27h-52.48V254.5h52.48v-33.51c0-86.63 39.2-126.78 124.24-126.78 16.13 0 43.95 3.17 55.33 6.33v70.5c-6.01-.63-16.44-.95-29.4-.95-41.73 0-57.86 15.81-57.86 56.91v27.5h83.13l-14.28 77.77h-68.85v174.87C411.35 491.92 509 384.62 509 254.5z"
              />
            </svg>
          </a>
          {/* Instagram SVG */}
          <a href="https://www.instagram.com/samet.home/profilecard/?igsh=djdrcDFyOXNrNHN2" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 512 512"
            >
              <path
                fill="rgba(48, 48, 48, 0.7)"
                fill-rule="nonzero"
                d="M170.663 256.157c-.083-47.121 38.055-85.4 85.167-85.482 47.121-.092 85.407 38.029 85.499 85.159.091 47.13-38.047 85.4-85.176 85.492-47.112.09-85.399-38.039-85.49-85.169zm-46.108.092c.141 72.602 59.106 131.327 131.69 131.185 72.592-.14 131.35-59.089 131.209-131.691-.141-72.577-59.114-131.336-131.715-131.194-72.585.141-131.325 59.114-131.184 131.7zm237.104-137.092c.033 16.954 13.817 30.682 30.772 30.649 16.961-.034 30.689-13.811 30.664-30.765-.033-16.954-13.818-30.69-30.78-30.656-16.962.033-30.689 13.818-30.656 30.772zm-208.696 345.4c-24.958-1.086-38.511-5.234-47.543-8.709-11.961-4.628-20.496-10.177-29.479-19.093-8.966-8.951-14.532-17.461-19.202-29.397-3.508-9.033-7.73-22.569-8.9-47.527-1.269-26.983-1.559-35.078-1.683-103.433-.133-68.338.116-76.434 1.294-103.441 1.069-24.941 5.242-38.512 8.709-47.536 4.628-11.977 10.161-20.496 19.094-29.478 8.949-8.983 17.459-14.532 29.403-19.202 9.025-3.526 22.561-7.715 47.511-8.9 26.998-1.278 35.085-1.551 103.423-1.684 68.353-.133 76.448.108 103.456 1.294 24.94 1.086 38.51 5.217 47.527 8.709 11.968 4.628 20.503 10.145 29.478 19.094 8.974 8.95 14.54 17.443 19.21 29.413 3.524 8.999 7.714 22.552 8.892 47.494 1.285 26.998 1.576 35.094 1.7 103.432.132 68.355-.117 76.451-1.302 103.442-1.087 24.957-5.226 38.52-8.709 47.56-4.629 11.953-10.161 20.488-19.103 29.471-8.941 8.949-17.451 14.531-29.403 19.201-9.009 3.517-22.561 7.714-47.494 8.9-26.998 1.269-35.086 1.56-103.448 1.684-68.338.133-76.424-.124-103.431-1.294zM149.977 1.773c-27.239 1.286-45.843 5.648-62.101 12.019-16.829 6.561-31.095 15.353-45.286 29.603C28.381 57.653 19.655 71.944 13.144 88.79c-6.303 16.299-10.575 34.912-11.778 62.168C.172 178.264-.102 186.973.031 256.489c.133 69.508.439 78.234 1.741 105.548 1.302 27.231 5.649 45.827 12.019 62.092 6.569 16.83 15.353 31.089 29.611 45.289 14.25 14.2 28.55 22.918 45.404 29.438 16.282 6.294 34.902 10.583 62.15 11.777 27.305 1.203 36.022 1.468 105.521 1.336 69.532-.133 78.25-.44 105.555-1.734 27.239-1.302 45.826-5.664 62.1-12.019 16.829-6.585 31.095-15.353 45.288-29.611 14.191-14.251 22.917-28.55 29.428-45.404 6.304-16.282 10.592-34.904 11.777-62.134 1.195-27.323 1.478-36.049 1.344-105.557-.133-69.516-.447-78.225-1.741-105.522-1.294-27.256-5.657-45.844-12.019-62.118-6.577-16.829-15.352-31.08-29.602-45.288-14.25-14.192-28.55-22.935-45.404-29.429-16.29-6.304-34.903-10.6-62.15-11.778C333.747.164 325.03-.101 255.506.031c-69.507.133-78.224.431-105.529 1.742z"
              />
            </svg>
          </a>
          
          {/* TikTok SVG */}
          <a href="https://www.tiktok.com/@samethome.com?_t=8qvdGxJErkk&_r=1" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 449.45 515.38"
            >
              <path
                fill="rgba(48, 48, 48, 0.7)"
                fill-rule="nonzero"
                d="M382.31 103.3c-27.76-18.1-47.79-47.07-54.04-80.82-1.35-7.29-2.1-14.8-2.1-22.48h-88.6l-.15 355.09c-1.48 39.77-34.21 71.68-74.33 71.68-12.47 0-24.21-3.11-34.55-8.56-23.71-12.47-39.94-37.32-39.94-65.91 0-41.07 33.42-74.49 74.48-74.49 7.67 0 15.02 1.27 21.97 3.44V190.8c-7.2-.99-14.51-1.59-21.97-1.59C73.16 189.21 0 262.36 0 352.3c0 55.17 27.56 104 69.63 133.52 26.48 18.61 58.71 29.56 93.46 29.56 89.93 0 163.08-73.16 163.08-163.08V172.23c34.75 24.94 77.33 39.64 123.28 39.64v-88.61c-24.75 0-47.8-7.35-67.14-19.96z"
              />
            </svg>
          </a>
          {/* LinkedIn SVG */}
          <a href="https://www.linkedin.com/company/samethome/" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" 
              shape-rendering="geometricPrecision" text-rendering="geometricPrecision" 
              image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" 
              viewBox="0 0 512 509.64">
                <rect width="512" fill="rgba(48, 48, 48, 0.7)" height="509.64" rx="115.61" ry="115.61"/>
                <path fill="#fff" d="M204.97 197.54h64.69v33.16h.94c9.01-16.16 31.04-33.16 63.89-33.16 68.31 0 80.94 42.51 80.94 97.81v116.92h-67.46l-.01-104.13c0-23.81-.49-54.45-35.08-54.45-35.12 0-40.51 25.91-40.51 52.72v105.86h-67.4V197.54zm-38.23-65.09c0 19.36-15.72 35.08-35.08 35.08-19.37 0-35.09-15.72-35.09-35.08 0-19.37 15.72-35.08 35.09-35.08 19.36 0 35.08 15.71 35.08 35.08zm-70.17 65.09h70.17v214.73H96.57V197.54z"/>
            </svg>
          </a>
        </div>
      </motion.footer>
      </AnimatePresence>
    </div>
  )
}