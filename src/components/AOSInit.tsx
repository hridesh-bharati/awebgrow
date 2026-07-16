"use client";

import { useEffect } from "react";

export default function AOSInit() {
  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({
        duration: 800,     
        once: true,        
        easing: "ease-out-cubic", 
        offset: 50,        
      });
    });
  }, []);

  return null; 
}