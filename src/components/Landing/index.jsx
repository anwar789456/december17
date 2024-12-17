'use client'
import { slideUp } from './animation';
import { motion } from 'framer-motion';
import CarouselVideo from '../CarouselVideo/CarouselVideo.jsx'
export default function Home() {
  return (
    <motion.main variants={slideUp} initial="initial" animate="enter">
        <CarouselVideo />
    </motion.main>
  )
}