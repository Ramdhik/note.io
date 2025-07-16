import NotesPage from '../component/common/notes';
import SearchBar from '../component/common/search';
import Navbar from '../component/layout/navbar';
import { getCurrentUser, logout } from '../src/utils/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Navbar user={user} onLogout={handleLogout} onProfile={handleProfile} />
      <SearchBar />
      <NotesPage />
    </div>
  );
};

export default Dashboard;
