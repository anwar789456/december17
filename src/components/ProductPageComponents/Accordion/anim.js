export const perspective = {
    initial: { opacity: 0, transform: "translateY(50px)" },
    enter: { opacity: 1, transform: "translateY(0)", transition: { duration: 0.4 } },
    exit: { opacity: 0, transform: "translateY(50px)", transition: { duration: 0.4 } },
  };
  
  export const contentVariants = {
    collapsed: { opacity: 0, height: 0, overflow: "hidden", transition: { duration: 0.4 } },
    expanded: { opacity: 1, height: "auto", transition: { duration: 0.4 } },
  };
  