import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Policies from './components/Policies';

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentHash === '#policies') {
    return (
      <div className="min-h-screen flex flex-col bg-stone-50">
        <Navbar />
        <main className="flex-grow">
          <Policies />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BookingModal />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
