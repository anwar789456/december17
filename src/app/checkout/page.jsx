"use client";
import { useState, useEffect } from "react";
import "./style.scss";
import CheckoutForm from "../../components/Checkout/CheckoutForm";
import { AnimatePresence } from "framer-motion";
import Curve from "@/components/Curve";
import HeaderCheckout from "./Header/index";
import CartItems from "./cartItems/index";
export default function Checkout() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 300);
    })();
  }, []);

  return (
    <main className="mainDiv">
      <AnimatePresence mode="wait">
        {isLoading && <Curve word="Facture" />}
      </AnimatePresence>
      <HeaderCheckout />
      <div className="contentDiv">
        <div className="checkoutForm">
          <CheckoutForm cartItems={cartItems} />
        </div>
        <div className="cartDetails">
          <CartItems onCartItemsChange={setCartItems} />
        </div>
      </div>
    </main>
  );
}