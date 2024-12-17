import './style.scss';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import logo from './logo2.png'
export default function HeaderCheckout() {
    return(
        <div className="containerHeaderCheckout">
            <div className="imageDiv">
                <Link href="/">
                    <div>
                        <Image 
                          className="imageContent"
                          src={logo} 
                          width={900}
                          height={900}
                          alt="logo"
                        />
                    </div>
                </Link>
            </div>
        </div>
    );
}