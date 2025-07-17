import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X as CloseIcon, CheckCircle } from 'lucide-react';
import Dropdown from '../ui/dropdown';
import ModeToggle from '../ui/mode';
import Button from '../ui/button';

const Navbar = ({ user, onLogout, onProfile }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDropdownSelect = (option) => {
    if (option === 'profile' && onProfile) onProfile();
    if (option === 'logout' && onLogout) onLogout();
    if (option === 'done') navigate('/done');
    setMenuOpen(false); // close menu after select
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white dark:bg-black border-black dark:border-white px-6 py-3 flex items-center justify-between border-b-6 dark:border-b-6">
      <div className="text-2xl font-extrabold text-black dark:text-white select-none tracking-tight">note.io</div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-4">
        {!user ? (
          <>
            <Button onClick={handleLoginClick}>Login</Button>
            <ModeToggle />
          </>
        ) : (
          <>
            <span className="font-bold text-black dark:text-white">{user.name}</span>
            <Dropdown
              label="Menu"
              options={[
                { label: 'Profile', value: 'profile' },
                { label: 'Done', value: 'done' },
                { label: 'Logout', value: 'logout' },
              ]}
              onSelect={(option) => handleDropdownSelect(option.value)}
            />
            <ModeToggle />
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <Button
          onClick={() => setMenuOpen(!menuOpen)}
          icon={menuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          className="rounded-lg p-2"
        />
      </div>

      {/* Mobile dropdown menu with Neo-Brutalism Button */}
      {menuOpen && (
        <div className="absolute top-16 right-6 w-48 bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] p-4 space-y-3 z-50">
          {user ? (
            <>
              <span className="font-bold text-black dark:text-white">{user.name}</span>
              <Button onClick={() => handleDropdownSelect('profile')} className="w-full justify-start">
                Profile
              </Button>
              <Button onClick={() => handleDropdownSelect('done')} className="w-full justify-start" icon={<CheckCircle className="w-4 h-4" />}>
                Done
              </Button>
              <Button onClick={() => handleDropdownSelect('logout')} className="w-full justify-start">
                Logout
              </Button>
              <ModeToggle />
            </>
          ) : (
            <>
              <Button onClick={handleLoginClick} className="w-full">
                Login
              </Button>
              <ModeToggle />
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
