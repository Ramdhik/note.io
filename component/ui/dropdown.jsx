import React, { useState, useRef, useEffect } from 'react';
import Button from '../ui/button';

const Dropdown = ({ icon, label, options = [], onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  /** Close dropdown on outside click **/
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /** Handle option select **/
  const handleSelect = (option) => {
    setOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <DropdownButton icon={icon} label={label} onClick={() => setOpen((prev) => !prev)} />
      {open && <DropdownList options={options} onSelect={handleSelect} />}
    </div>
  );
};

/** Dropdown Button **/
const DropdownButton = ({ icon, label, onClick }) => (
  <Button type="button" onClick={onClick} className="h-10 px-4 py-3 flex items-center gap-2">
    {icon && <span className="flex items-center">{icon}</span>}
    <span className="truncate">{label}</span>
  </Button>
);

/** Dropdown List **/
const DropdownList = ({ options, onSelect }) => (
  <ul className="absolute z-10 mt-2 min-w-max bg-white dark:bg-black border-2 border-black dark:border-white rounded-lg shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] py-1 max-h-60 overflow-auto">
    {options.length === 0 ? <li className="text-gray-500 cursor-default select-none relative py-2 px-4">Tidak ada opsi</li> : options.map((option) => <DropdownOption key={option.value} option={option} onSelect={onSelect} />)}
  </ul>
);

/** Dropdown Option **/
const DropdownOption = ({ option, onSelect }) => (
  <li onClick={() => onSelect(option)} className="cursor-pointer select-none relative py-2 pl-3 pr-4 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800">
    {option.icon && <span className="text-black dark:text-white">{option.icon}</span>}
    <span className="text-black dark:text-white flex-1">{option.label}</span>
  </li>
);

export default Dropdown;
