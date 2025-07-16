import React, { useState, useRef, useEffect } from 'react';
import Button from '../ui/button'; // sesuaikan path dengan struktur projectmu

const Dropdown = ({ label = 'Pilih opsi', options = [], onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <Button type="button" onClick={() => setOpen((prev) => !prev)} className=" w-38 justify-between h-10 px-4 py-3">
        <span className="truncate">{selected ? selected.label : label}</span>
      </Button>

      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-white dark:bg-black border-2 border-black dark:border-white rounded-lg shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] py-1 max-h-60 overflow-auto">
          {options.length === 0 && <li className="text-gray-500 cursor-default select-none relative py-2 px-4">Tidak ada opsi</li>}
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-4 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800
                ${selected && selected.value === option.value ? 'bg-gray-300 dark:bg-gray-700 font-bold' : ''}`}
            >
              {option.icon && <span className="text-black dark:text-white">{option.icon}</span>}
              <span className="text-black dark:text-white">{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
