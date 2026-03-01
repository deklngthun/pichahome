import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';

export default function Services() {
  const { t } = useLanguage();

  const ServiceCard = ({ category, delay }: { category: any, delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
    >
      <h3 className="text-2xl font-serif text-stone-900 mb-8 pb-4 border-b border-stone-100">
        {category.title}
      </h3>
      <ul className="space-y-6">
        {category.items.map((item: any, index: number) => (
          <li key={index} className="flex justify-between items-baseline group">
            <span className="text-stone-700 font-medium group-hover:text-stone-900 transition-colors">
              {item.name}
            </span>
            <div className="flex-grow border-b border-dotted border-stone-300 mx-4 opacity-50"></div>
            <span className="text-stone-900 font-semibold">
              {item.price}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <section id="services" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">
            {t.services.title}
          </h2>
          <div className="w-24 h-1 bg-stone-300 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard category={t.services.massage} delay={0.1} />
          <ServiceCard category={t.services.lashes} delay={0.2} />
          <ServiceCard category={t.services.nails} delay={0.3} />
        </div>
      </div>
    </section>
  );
}
