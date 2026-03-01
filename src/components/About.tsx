import { useLanguage } from '../LanguageContext';
import { useBooking } from '../BookingContext';
import { Sparkles, Leaf, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  const features = [
    { icon: Leaf, text: t.about.bullet1 },
    { icon: Sparkles, text: t.about.bullet2 },
    { icon: Heart, text: t.about.bullet3 },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop"
                alt="Relaxing spa environment"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-stone-100 rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border border-stone-200 rounded-full -z-10" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">
              {t.about.title}
            </h2>
            
            <div className="space-y-6 text-stone-600 text-lg leading-relaxed mb-10">
              <p className="font-medium text-stone-800 text-xl">
                {t.about.content1}
              </p>
              <p>
                {t.about.content2}
              </p>
              <p>
                {t.about.content3}
              </p>
            </div>

            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-4 text-stone-700">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={openBooking}
              className="inline-flex items-center justify-center bg-stone-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-stone-800 transition-colors shadow-md cursor-pointer"
            >
              {t.about.cta}
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
