import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useBooking } from '../BookingContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { openBooking } = useBooking();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.booking, href: '#booking' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="#home" className="flex-shrink-0 flex items-center gap-2">
              <span className="font-serif text-2xl font-semibold text-stone-900 tracking-tight">
                Pitcha
              </span>
              <span className="hidden sm:block text-sm text-stone-500 font-medium tracking-widest uppercase mt-1">
                Home Nails & Spa
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-stone-600 hover:text-stone-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'TH' : 'EN'}
            </button>

            <button
              onClick={openBooking}
              className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              {t.hero.bookNow}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-stone-600 hover:text-stone-900 p-2"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">{language === 'en' ? 'TH' : 'EN'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 px-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openBooking();
                }}
                className="block w-full text-center bg-stone-900 text-white px-6 py-3 rounded-full text-base font-medium hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
              >
                {t.hero.bookNow}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
