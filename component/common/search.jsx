import React from 'react';
import Button from '../ui/button';
import Dropdown from '../ui/dropdown';
import { FilterIcon } from 'lucide-react';

const SearchBar = ({ value, onChange, onSubmit, placeholder = 'Search...', onFilterSelect }) => {
  return (
    <form onSubmit={onSubmit} className="mt-5 flex items-center gap-2 bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] px-4 py-2 w-full max-w-md">
      <SearchInput value={value} onChange={onChange} placeholder={placeholder} />
      <SearchButton />
      <FilterDropdown onSelect={onFilterSelect} />
    </form>
  );
};

/** Subcomponents **/

const SearchInput = ({ value, onChange, placeholder }) => (
  <input type="text" value={value} onChange={onChange} placeholder={placeholder} className="flex-1 bg-white dark:bg-black border-none focus:outline-none font-bold text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
);

const SearchButton = () => (
  <Button type="submit" variant="primary" className="px-4 py-2">
    Search
  </Button>
);

const FilterDropdown = ({ onSelect }) => (
  <Dropdown
    icon={<FilterIcon className="w-4 h-4" />}
    variant="checkbox"
    options={[
      { value: 'all', label: 'All' },
      { value: 'high', label: 'High Priority' },
      { value: 'medium', label: 'Medium Priority' },
      { value: 'low', label: 'Low Priority' },
      { value: 'Note', label: 'Note Type' },
      { value: 'Todo', label: 'Todo Type' },
      { value: 'Task', label: 'Task Type' },
    ]}
    onSelect={onSelect}
  />
);

export default SearchBar;
