// src/components/login.jsx
import React, { useState } from 'react';
import Form, { FormInput } from '../component/ui/form';
import Button from '../component/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { login } from '../src/utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('email'); // jika form input name="email"
    const password = formData.get('password');

    const user = login(username, password);
    if (user) {
      navigate('/dashboard'); // redirect ke home jika login berhasil
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4">
      <div className="max-w-md w-full">
        <h1
          className="text-3xl font-extrabold text-black dark:text-white mb-6 border-2 border-black dark:border-white
                     shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]
                     bg-white dark:bg-black px-4 py-2 rounded-lg"
        >
          Log In
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Form onSubmit={handleSubmit}>
          <FormInput label="Email" type="email" name="email" placeholder="you@example.com" required />
          <FormInput label="Password" type="password" name="password" placeholder="••••••••" required />

          {/* container button */}
          <div className="flex gap-4 mt-4">
            <Button type="submit" className="w-full py-3 text-lg">
              Login
            </Button>

            <Button type="button" variant="secondary" icon={<Home className="w-5 h-5" />} onClick={() => navigate('/')} className="py-3 px-4">
              Home
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
