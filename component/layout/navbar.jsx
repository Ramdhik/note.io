import { useNavigate } from 'react-router-dom';
import Dropdown from '../ui/dropdown';
import ModeToggle from '../ui/mode';
import Button from '../ui/button';

const Navbar = ({ user, onLogout, onProfile }) => {
  const navigate = useNavigate();

  const dropdownOptions = [
    { label: 'Profile', value: 'profile' },
    { label: 'Logout', value: 'logout' },
  ];

  const handleDropdownSelect = (option) => {
    if (option.value === 'profile' && onProfile) onProfile();
    if (option.value === 'logout' && onLogout) onLogout();
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white dark:bg-black border-black dark:border-white px-6 py-3 flex items-center justify-between border-b-6 dark:border-b-6">
      <div className="text-2xl font-extrabold text-black dark:text-white select-none tracking-tight">note.io</div>
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Button onClick={handleLoginClick}>Login</Button>
            <ModeToggle />
          </>
        ) : (
          <>
            <span className="font-bold text-black dark:text-white">{user.name}</span>
            <Dropdown label="Menu" options={dropdownOptions} onSelect={handleDropdownSelect} />
            <ModeToggle />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
