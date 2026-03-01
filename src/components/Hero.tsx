import { useLanguage } from '../LanguageContext';
import { useBooking } from '../BookingContext';
import { Phone, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
          alt="Spa background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <span className="block text-stone-200 text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-6">
            Pitcha Home Nails & Spa
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6 drop-shadow-sm">
            {t.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
            {t.hero.subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openBooking}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full text-base font-medium hover:bg-stone-100 transition-colors shadow-lg cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              {t.hero.bookNow}
            </button>
            <a
              href={`tel:${t.hero.phone.replace(/\s/g, '')}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-900/80 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-base font-medium hover:bg-stone-800 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" />
              {t.hero.callNow}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
