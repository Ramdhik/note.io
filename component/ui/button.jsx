import React, { useState } from 'react';

const Button = ({
  children,
  icon, // icon prop, bisa isi komponen lucide-react
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  onClick,
}) => {
  const [pressed, setPressed] = useState(false);

  const base = 'inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-bold border-2 transition select-none focus:outline-none';
  const variants = {
    primary: 'bg-white text-black border-black shadow-[3px_3px_0_0_#000] hover:bg-gray-100 dark:bg-black dark:text-white dark:border-white dark:shadow-[3px_3px_0_0_#fff] dark:hover:bg-gray-900',
    secondary: 'bg-black text-white border-black shadow-[3px_3px_0_0_#000] hover:bg-gray-900 dark:bg-white dark:text-black dark:border-white dark:shadow-[3px_3px_0_0_#fff] dark:hover:bg-gray-100',
    danger: 'bg-white text-red-600 border-red-600 shadow-[3px_3px_0_0_#d32f2f] hover:bg-red-50 dark:bg-black dark:text-red-400 dark:border-red-400 dark:shadow-[3px_3px_0_0_#fff] dark:hover:bg-red-900',
  };

  return (
    <button
      type={type}
      className={`
        ${base} 
        ${variants[variant]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
        ${className} 
        ${pressed ? 'translate-x-[3px] translate-y-[3px] shadow-none' : ''}
        hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
      `}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
