import { useLanguage } from '../LanguageContext';
import { useBooking } from '../BookingContext';
import { CalendarCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function Booking() {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  const icons = [CalendarCheck, ShieldAlert];

  return (
    <section id="booking" className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#1c1917 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-stone-900 rounded-3xl p-10 md:p-16 text-center shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            {t.booking.title}
          </h2>
          <p className="text-stone-300 text-lg mb-12 max-w-2xl mx-auto">
            {t.booking.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 text-left">
            {t.booking.features.map((feature, index) => {
              const Icon = icons[index];
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-stone-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="pt-3">
                    <span className="text-stone-200 font-medium text-lg">{feature}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={openBooking}
            className="inline-flex items-center justify-center bg-white text-stone-900 px-10 py-5 rounded-full text-lg font-semibold hover:bg-stone-100 hover:scale-105 transition-all shadow-lg cursor-pointer"
          >
            <CalendarCheck className="w-5 h-5 mr-2" />
            {t.booking.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
