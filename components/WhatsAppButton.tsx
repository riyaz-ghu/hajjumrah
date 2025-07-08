"use client";

// Declare gtag function
declare const gtag: (...args: any[]) => void;

import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  className?: string;
  children: React.ReactNode;
  message?: string;
}

export default function WhatsAppButton({ className = "", children, message = "Hi, I'm interested in Hajj & Umrah packages" }: WhatsAppButtonProps) {
  
  function gtag_report_conversion() {
    gtag('event', 'conversion', {
        'send_to': 'AW-16817758944/EX1HCLrI1fUZEODFqtM-',
        'value': 1.0,
        'currency': 'INR'
    });
    return false;
  }
  
  const handleWhatsAppClick = () => {
    // Google Ads conversion tracking function
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/966568022972?text=${encodedMessage}`, "_blank");
    // Call the conversion tracking function
    gtag_report_conversion();
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={`bg-green-600 hover:bg-green-700 flex items-center gap-2 ${className}`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <g clipPath="url(#clip0_3_4)">
          <path d="M1.98669 48.1079L5.23643 36.2407C3.23143 32.7678 2.17743 28.8276 2.17857 24.7921C2.18353 12.1654 12.4592 1.89282 25.0847 1.89282C31.2126 1.89549 36.964 4.28044 41.288 8.60898C45.6131 12.9375 47.9934 18.6912 47.9911 24.81C47.9858 37.437 37.7098 47.7108 25.0858 47.7108C25.0847 47.7108 25.0862 47.7108 25.0858 47.7108H25.0755C21.2421 47.7092 17.4751 46.7472 14.1296 44.9238L1.98669 48.1079Z" fill="#64B161"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M19.1585 14.8678C18.7145 13.8805 18.2468 13.8607 17.8241 13.8435C17.4785 13.8287 17.0829 13.8294 16.6881 13.8294C16.2929 13.8294 15.6505 13.9782 15.1073 14.5714C14.5637 15.1646 13.0317 16.5989 13.0317 19.516C13.0317 22.4335 15.1565 25.2522 15.4529 25.6482C15.7493 26.0438 19.5545 32.2213 25.5805 34.5979C30.5888 36.5731 31.6077 36.1802 32.6949 36.0814C33.7821 35.9826 36.2025 34.6471 36.6965 33.2627C37.1909 31.8784 37.1909 30.692 37.0425 30.4436C36.8941 30.1968 36.4989 30.0484 35.9061 29.752C35.3133 29.4556 32.3985 28.0209 31.8549 27.8233C31.3113 27.6253 30.9161 27.5269 30.5209 28.1205C30.1254 28.7133 28.9901 30.0484 28.6441 30.4436C28.2981 30.84 27.9521 30.8896 27.3593 30.5928C26.7665 30.2956 24.8569 29.67 22.5917 27.6501C20.8293 26.0788 19.6392 24.1379 19.2932 23.5444C18.9476 22.9515 19.2874 22.6586 19.5537 22.3347C20.0332 21.7514 20.8377 20.7028 21.0353 20.3076C21.2329 19.9116 21.1341 19.5656 20.9861 19.2688C20.8377 18.9724 19.6853 16.0404 19.1585 14.8678Z" fill="white"/>
        </g>
        <defs>
          <clipPath id="clip0_3_4">
            <rect width="50" height="50" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      {children}
    </Button>
  );
}