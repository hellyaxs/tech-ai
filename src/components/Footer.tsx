
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-0">
      <div className="section-container">
        <p className="text-center text-gray-600 text-sm">
          FITAI - Seu personal trainer inteligente com visão computacional.{" "}
          <a 
            href="https://x.com/rezaul_arif" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-pulse-500 hover:underline"
          >
            Desenvolvido com Lovable
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
