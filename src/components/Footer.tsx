import { useLanguage } from '../LanguageContext';
import { useBooking } from '../BookingContext';

export default function Footer() {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-stone-800">
          <div>
            <span className="block font-serif text-2xl font-semibold text-white tracking-tight mb-4">
              Pitcha Home Nails & Spa
            </span>
            <p className="text-sm leading-relaxed max-w-md">
              {t.footer.seo}
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-center space-y-4">
            <button onClick={openBooking} className="text-white hover:text-stone-300 transition-colors font-medium cursor-pointer">
              {t.hero.bookNow}
            </button>
            <a href={`tel:${t.hero.phone.replace(/\s/g, '')}`} className="text-white hover:text-stone-300 transition-colors font-medium">
              {t.hero.callNow}
            </a>
          </div>
        </div>
        <div className="text-center text-sm text-stone-500">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
