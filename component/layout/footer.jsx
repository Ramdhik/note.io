import React from 'react';

const Footer = () => (
  <footer className="w-full border-t-4 border-black dark:border-white bg-white dark:bg-black py-3 px-0">
    <div className="overflow-hidden whitespace-nowrap">
      <marquee behavior="scroll" direction="left" scrollamount="8" className="font-bold text-lg bg-white dark:bg-black text-black dark:text-white px-6 py-2 ">
        © Ramadhika Darmaputra
      </marquee>
    </div>
  </footer>
);

export default Footer;
