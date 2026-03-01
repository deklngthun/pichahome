import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function Policies() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <a href="#home" className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </a>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100"
      >
        <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-8 pb-6 border-b border-stone-100">
          {t.policies.title}
        </h1>

        <div className="space-y-10 text-stone-700 leading-relaxed">
          <div>
            <p className="font-medium text-stone-900 mb-2">{t.policies.greeting}</p>
            <p>{t.policies.intro}</p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">{t.policies.booking.title}</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-stone-900">{t.policies.booking.deposit}</strong></li>
              <li className="text-stone-500 italic">{t.policies.booking.note}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">{t.policies.payment.title}</h2>
            <p className="mb-4">{t.policies.payment.intro}</p>
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 space-y-4">
              <div>
                <h3 className="font-medium text-stone-900 mb-2">{t.policies.payment.bank}</h3>
                <ul className="space-y-1 text-stone-600 font-mono text-sm">
                  <li>{t.policies.payment.bsb}</li>
                  <li>{t.policies.payment.acc}</li>
                  <li>{t.policies.payment.name}</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-stone-200">
                <span className="font-medium text-stone-900">{t.policies.payment.payid}</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">{t.policies.confirmation.title}</h2>
            <p>{t.policies.confirmation.desc}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">{t.policies.cancellation.title}</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>{t.policies.cancellation.cancel}</li>
              <li>{t.policies.cancellation.arrival}</li>
              <li><strong className="text-red-700">{t.policies.cancellation.late}</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">{t.policies.contact.title}</h2>
            <p>{t.policies.contact.desc}</p>
          </section>

          <div className="pt-8 mt-8 border-t border-stone-100 text-center">
            <p className="text-xl font-serif italic text-stone-900">{t.policies.closing}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
