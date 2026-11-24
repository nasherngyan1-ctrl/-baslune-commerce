import React, { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { formatPriceIqd } from '../utils/format';
import { SafeImage } from './SafeImage';

export const SearchOverlay: React.FC = () => {
  const { language, t, products, searchOpen, setSearchOpen, navigate } = useStore();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 6);
    return products
      .filter((p) => {
        const cat = CATEGORIES.find((c) => c.id === p.category);
        return (
          p.name[language].toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.shortDescription[language].toLowerCase().includes(q) ||
          (cat && cat.name[language].toLowerCase().includes(q))
        );
      })
      .slice(0, 8);
  }, [query, products, language]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div
        className="fixed inset-0 bg-[#25211D]/50 backdrop-blur-xs"
        onClick={() => setSearchOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-[#F7F3EB] border border-[#39291F]/15 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-[#39291F]/10">
          <Search className="w-5 h-5 text-[#39291F]/70 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.nav.searchPlaceholder}
            className="w-full bg-transparent text-sm sm:text-base text-[#25211D] placeholder:text-[#25211D]/45 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label={t.nav.close}
            className="p-1.5 rounded-md text-[#25211D]/60 hover:text-[#25211D] hover:bg-[#E8DFD1]/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-2">
          {results.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-medium text-[#25211D]">{t.shop.noResultsTitle}</p>
              <p className="text-xs text-[#25211D]/60 mt-1">{t.shop.noResultsBody}</p>
            </div>
          ) : (
            results.map((product) => {
              const cat = CATEGORIES.find((c) => c.id === product.category);
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    navigate(`/product/${product.id}`);
                  }}
                  className="w-full flex items-center gap-4 p-2.5 rounded-lg bg-white hover:bg-[#E8DFD1]/60 border border-[#39291F]/8 transition-colors text-start cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-md overflow-hidden bg-[#E8DFD1] shrink-0">
                    <SafeImage
                      src={product.image}
                      alt={product.name[language]}
                      objectPosition={product.imagePosition}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#25211D]/55">
                      {cat?.name[language]} · {product.sku}
                    </p>
                    <p className="text-sm font-semibold text-[#25211D] truncate">
                      {product.name[language]}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#39291F] tabular-nums shrink-0">
                    {formatPriceIqd(product.priceIqd, language)}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
