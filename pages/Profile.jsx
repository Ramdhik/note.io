// src/pages/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import { getCurrentUser, updateUserName } from '../src/utils/auth';
import Button from '../component/ui/button';
import Form, { FormInput } from '../component/ui/form';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
      setName(currentUser.name || '');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserName(name);
    const updatedUser = getCurrentUser();
    setUser(updatedUser);
    alert('Nama berhasil diupdate');
  };

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Profile</h1>

      {/* Tombol Back */}
      <Button onClick={() => navigate('/dashboard')} variant="secondary" className="mb-4">
        ← Back to Dashboard
      </Button>

      <Form onSubmit={handleSubmit}>
        <FormInput label="Email" type="text" value={user.username} disabled />
        <FormInput label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <Button type="submit" className="mt-4">
          Update Name
        </Button>
      </Form>
    </div>
  );
};

export default ProfilePage;
