import { useLanguage } from '../LanguageContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            {t.contact.title}
          </h2>
          <div className="w-24 h-1 bg-stone-300 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-10 md:p-16 flex flex-col justify-center space-y-10"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-900">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-stone-900 mb-1">Location</h4>
                <p className="text-stone-600 text-lg">{t.contact.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-900">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-stone-900 mb-1">Phone</h4>
                <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="text-stone-600 text-lg hover:text-stone-900 transition-colors">
                  {t.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-900">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-stone-900 mb-1">Email</h4>
                <a href={`mailto:${t.contact.email}`} className="text-stone-600 text-lg hover:text-stone-900 transition-colors">
                  {t.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6 pt-6 border-t border-stone-100">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-900">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-stone-900 mb-2">{t.contact.hours.title}</h4>
                <p className="text-stone-600 text-lg mb-1">{t.contact.hours.weekdays}</p>
                <p className="text-stone-600 text-lg mb-1">{t.contact.hours.weekends}</p>
                <p className="text-stone-500 text-base italic">{t.contact.hours.closed}</p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-stone-200 relative min-h-[400px] lg:min-h-full"
          >
            <iframe 
              src="https://maps.google.com/maps?q=Green%20Valley%20Rd%20%26%20Wilson%20Rd,%20Green%20Valley%20NSW&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Pitcha Home Nails and Spa Location"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
