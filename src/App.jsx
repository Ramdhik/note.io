import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import DonePage from '../pages/Done';
import ProfilePage from '../pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/done" element={<DonePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
