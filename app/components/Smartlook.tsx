'use client'; // This line makes this component a Client Component

import { useEffect } from 'react';

declare global {
  interface Window {
    smartlook: any; // Extend the Window interface
  }
}

const Smartlook = () => {
  useEffect(() => {
    window.smartlook = window.smartlook || function () {
      (window.smartlook.api = window.smartlook.api || []).push(arguments);
    };
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://rec.smartlook.com/recorder.js';
    document.head.appendChild(script);

    // Initialize Smartlook with your project key
    script.onload = () => {
      window.smartlook('init', '5ef0e71157f56ca9525d42eedec79d0d25d4b3fb');
    };
  }, []);

  return null; // This component does not render anything
};

export default Smartlook; 