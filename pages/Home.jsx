import Footer from '../component/layout/footer';
import Navbar from '../component/layout/navbar';
import Button from '../component/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MainContent() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl md:text-6xl font-extrabold text-black dark:text-white mb-6 text-center leading-tight">
        Get started with <br />
        <span className="relative inline-block mt-2">notes & to do list</span>
      </h1>
      <p className="text-xl text-black dark:text-white max-w-2xl text-center mb-8 bg-white dark:bg-black font-bold py-4 px-6">
        Easily jot down your ideas, tasks, and inspirations.
        <br />
        Everything is <span className="font-extrabold underline">monochrome</span> and <span className="font-extrabold underline">neo brutalism</span> style.
      </p>
      <Button onClick={handleClick} className="text-lg px-6 py-3" icon={<ArrowRight className="w-5 h-5" />}>
        Start Taking Notes
      </Button>
    </main>
  );
}

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default Home;
