import React, { useState } from 'react';
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  Globe,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Language } from '../types/commerce';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    currentPath,
    navigate,
    cartCount,
    wishlist,
    setCartDrawerOpen,
    setSearchOpen,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/shop', label: t.nav.shop },
    { path: '/categories', label: t.nav.categories },
    { path: '/about', label: t.nav.about },
    { path: '/track-order', label: t.nav.trackOrder },
    { path: '/contact', label: t.nav.contact },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'ckb', label: 'کوردی' },
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'EN' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F3EB]/95 backdrop-blur-md border-b border-[#39291F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Mobile Menu Trigger & Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
            className="lg:hidden p-2 -ms-2 text-[#25211D] hover:text-[#39291F] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('/')}
            className="text-start whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#39291F]"
          >
            <span className="font-editorial text-xl sm:text-2xl font-semibold tracking-wider text-[#25211D]">
              BASLUNE
            </span>
            <span className="ms-1.5 text-[11px] tracking-[0.18em] uppercase text-[#C6A77B] font-medium">
              Commerce
            </span>
          </button>
        </div>

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-6 text-sm text-[#25211D]/80"
        >
          {navItems.map((item) => {
            const active =
              item.path === '/'
                ? currentPath === '/'
                : currentPath.startsWith(item.path);
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNavClick(item.path)}
                className={`py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer relative ${
                  active
                    ? 'text-[#25211D] font-semibold'
                    : 'hover:text-[#39291F]'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#C6A77B]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Utility Cluster: Language Switcher, Search, Admin/Account, Wishlist, Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher */}
          <div
            className="hidden sm:flex items-center border border-[#39291F]/15 rounded-md bg-white/60 p-0.5"
            role="group"
            aria-label="Language"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`px-2 py-1 text-xs rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === lang.code
                    ? 'bg-[#39291F] text-[#F7F3EB] font-medium'
                    : 'text-[#25211D]/70 hover:text-[#25211D]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={t.nav.searchButton}
            className="p-2 text-[#25211D] hover:text-[#39291F] hover:bg-[#E8DFD1]/60 rounded-md transition-colors cursor-pointer"
          >
            <Search className="w-[18px] h-[18px] stroke-[1.75]" />
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('/admin')}
            aria-label={t.nav.admin}
            title={t.nav.admin}
            className="p-2 text-[#25211D] hover:text-[#39291F] hover:bg-[#E8DFD1]/60 rounded-md transition-colors cursor-pointer"
          >
            <User className="w-[18px] h-[18px] stroke-[1.75]" />
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('/wishlist')}
            aria-label={t.nav.wishlist}
            className="relative p-2 text-[#25211D] hover:text-[#39291F] hover:bg-[#E8DFD1]/60 rounded-md transition-colors cursor-pointer"
          >
            <Heart className="w-[18px] h-[18px] stroke-[1.75]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 end-1 min-w-[16px] h-4 px-1 rounded-full bg-[#C6A77B] text-[#25211D] text-[10px] font-semibold flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setCartDrawerOpen(true)}
            aria-label={t.nav.cart}
            className="relative p-2 text-[#25211D] hover:text-[#39291F] hover:bg-[#E8DFD1]/60 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ShoppingBag className="w-[18px] h-[18px] stroke-[1.75]" />
            <span className="text-xs font-semibold tabular-nums text-[#39291F]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#39291F]/10 bg-[#F7F3EB] px-4 py-4 space-y-4">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const active =
                item.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.path);
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full text-start px-3 py-2.5 rounded-md text-sm transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#E8DFD1] text-[#25211D] font-semibold'
                      : 'text-[#25211D]/80 hover:bg-[#E8DFD1]/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handleNavClick('/admin')}
              className="w-full text-start px-3 py-2.5 rounded-md text-sm text-[#39291F] font-medium hover:bg-[#E8DFD1]/50 cursor-pointer"
            >
              {t.nav.admin}
            </button>
          </div>

          <div className="pt-3 border-t border-[#39291F]/10 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-[#25211D]/70">
              <Globe className="w-3.5 h-3.5" />
              {t.langName}
            </span>
            <div className="flex items-center gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1.5 text-xs rounded transition-colors cursor-pointer ${
                    language === lang.code
                      ? 'bg-[#39291F] text-[#F7F3EB] font-medium'
                      : 'bg-white text-[#25211D]/80 border border-[#39291F]/15'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
