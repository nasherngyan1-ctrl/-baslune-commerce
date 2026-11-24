import React from 'react';
import { CATEGORIES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { Language } from '../types/commerce';

export const Footer: React.FC = () => {
  const { language, setLanguage, t, navigate, settings } = useStore();

  const languages: { code: Language; label: string }[] = [
    { code: 'ckb', label: 'کوردی (سۆرانی)' },
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
  ];

  return (
    <footer className="bg-[#39291F] text-[#E8DFD1] border-t border-[#C6A77B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-editorial text-2xl font-semibold tracking-wider text-white">
                BASLUNE
              </span>
              <span className="ms-2 text-xs tracking-[0.2em] uppercase text-[#C6A77B]">
                Commerce
              </span>
            </div>
            <p className="text-sm text-[#E8DFD1]/80 leading-relaxed max-w-sm">
              {t.footer.brandDesc}
            </p>
            <div className="text-xs text-[#C6A77B] pt-1">
              {settings.cityHub[language]} · {t.footer.currencyLabel}
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[#C6A77B]">
              {t.footer.shopHeading}
            </h3>
            <ul className="space-y-2 text-sm text-[#E8DFD1]/85">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.shop}
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => navigate(`/shop?category=${cat.id}`)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat.name[language]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[#C6A77B]">
              {t.footer.studioHeading}
            </h3>
            <ul className="space-y-2 text-sm text-[#E8DFD1]/85">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.categories}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.admin}
                </button>
              </li>
            </ul>
          </div>

          {/* Client Care & Language */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[#C6A77B]">
              {t.footer.careHeading}
            </h3>
            <ul className="space-y-2 text-sm text-[#E8DFD1]/85">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/track-order')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.trackOrder}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/wishlist')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.wishlist}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.cart}
                </button>
              </li>
              <li className="text-xs text-[#E8DFD1]/70 pt-1" dir="ltr">
                {settings.supportEmail}
              </li>
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                    language === lang.code
                      ? 'bg-[#C6A77B] text-[#25211D] border-[#C6A77B] font-medium'
                      : 'border-[#E8DFD1]/25 text-[#E8DFD1]/80 hover:border-[#C6A77B]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E8DFD1]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DFD1]/70">
          <p>{t.footer.rights}</p>
          <p className="text-[#C6A77B]">{t.footer.credit}</p>
        </div>
      </div>
    </footer>
  );
};
