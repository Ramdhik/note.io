import React from 'react';
import Button from '../ui/button'; // sesuaikan path dengan struktur projectmu

const SearchBar = ({ value, onChange, onSubmit, placeholder = 'Search...' }) => {
  return (
    <form onSubmit={onSubmit} className="mt-5 ml-6 flex items-center gap-2 bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] px-4 py-2 w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-white dark:bg-black border-none focus:outline-none font-bold text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />
      <Button type="submit" variant="primary" className="px-4 py-2">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
