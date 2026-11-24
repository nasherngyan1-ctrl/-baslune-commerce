import React, { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { CategoryId } from '../types/commerce';

type SortOption = 'featured' | 'newest' | 'popular' | 'price_asc' | 'price_desc';

export const ShopPage: React.FC = () => {
  const { language, t, products, currentPath } = useStore();

  const getInitialCategory = (): CategoryId | 'all' => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category') as CategoryId | null;
    if (cat && CATEGORIES.some((c) => c.id === cat)) return cat;
    return 'all';
  };

  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>(getInitialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  useEffect(() => {
    setSelectedCategory(getInitialCategory());
  }, [currentPath]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((p) => {
      const catMatch = selectedCategory === 'all' || p.category === selectedCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        p.name[language].toLowerCase().includes(q) ||
        p.name.en.toLowerCase().includes(q) ||
        p.shortDescription[language].toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    });

    const sorted = [...list];
    if (sortBy === 'price_asc') {
      sorted.sort((a, b) => a.priceIqd - b.priceIqd);
    } else if (sortBy === 'price_desc') {
      sorted.sort((a, b) => b.priceIqd - a.priceIqd);
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } else if (sortBy === 'popular') {
      sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return sorted;
  }, [products, selectedCategory, searchQuery, sortBy, language]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Header */}
      <div className="border-b border-[#39291F]/10 pb-8 mb-8">
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#25211D]">
          {t.shop.title}
        </h1>
        <p className="text-sm sm:text-base text-[#25211D]/70 mt-2">
          {t.shop.subtitle}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4 mb-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#39291F] text-[#F7F3EB] border-[#39291F]'
                : 'bg-white text-[#25211D]/80 border-[#39291F]/15 hover:border-[#39291F]/40'
            }`}
          >
            {t.shop.allCategories}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#39291F] text-[#F7F3EB] border-[#39291F]'
                  : 'bg-white text-[#25211D]/80 border-[#39291F]/15 hover:border-[#39291F]/40'
              }`}
            >
              {cat.name[language]}
            </button>
          ))}
        </div>

        {/* Search + Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#25211D]/45 absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.shop.searchPlaceholder}
              aria-label={t.shop.searchLabel}
              className="w-full ps-10 pe-9 py-2.5 bg-white border border-[#39291F]/15 rounded-md text-sm text-[#25211D] placeholder:text-[#25211D]/45 focus:outline-none focus:border-[#39291F]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label={t.nav.close}
                className="absolute top-1/2 -translate-y-1/2 end-2.5 p-1 text-[#25211D]/50 hover:text-[#25211D] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="text-xs text-[#25211D]/65 tabular-nums">
              {filteredProducts.length} {t.shop.resultsCount}
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#39291F]/70" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label={t.shop.sortLabel}
                className="px-3 py-2 bg-white border border-[#39291F]/15 rounded-md text-xs sm:text-sm text-[#25211D] focus:outline-none focus:border-[#39291F] cursor-pointer"
              >
                <option value="featured">{t.shop.sortFeatured}</option>
                <option value="newest">{t.shop.sortNewest}</option>
                <option value="popular">{t.shop.sortPopular}</option>
                <option value="price_asc">{t.shop.sortPriceAsc}</option>
                <option value="price_desc">{t.shop.sortPriceDesc}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-[#39291F]/10 rounded-xl py-16 px-6 text-center space-y-3">
          <h2 className="text-lg font-semibold text-[#25211D]">{t.shop.noResultsTitle}</h2>
          <p className="text-sm text-[#25211D]/65 max-w-md mx-auto">
            {t.shop.noResultsBody}
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-2 px-5 py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
          >
            {t.shop.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
