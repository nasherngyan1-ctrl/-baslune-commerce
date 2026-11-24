import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/SafeImage';

export const CategoriesPage: React.FC = () => {
  const { language, t, products, navigate } = useStore();
  const ArrowIcon = t.dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="border-b border-[#39291F]/10 pb-8 mb-10">
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#25211D]">
          {t.categoriesPage.title}
        </h1>
        <p className="text-sm sm:text-base text-[#25211D]/70 mt-2">
          {t.categoriesPage.subtitle}
        </p>
      </div>

      <div className="space-y-8">
        {CATEGORIES.map((category, idx) => {
          const count = products.filter((p) => p.category === category.id).length;
          const reversed = idx % 2 === 1;

          return (
            <article
              key={category.id}
              className="grid grid-cols-1 lg:grid-cols-12 bg-white border border-[#39291F]/10 rounded-xl overflow-hidden"
            >
              <div
                className={`lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[340px] bg-[#E8DFD1] overflow-hidden ${
                  reversed ? 'lg:order-2' : ''
                }`}
              >
                <SafeImage
                  src={category.image}
                  alt={category.name[language]}
                  objectPosition={category.imagePosition}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className={`lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center space-y-4 ${
                  reversed ? 'lg:order-1' : ''
                }`}
              >
                <span className="text-xs font-medium text-[#C6A77B] tabular-nums">
                  0{idx + 1}. · {count} {t.categoriesPage.itemsAvailable}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#25211D]">
                  {category.name[language]}
                </h2>
                <p className="text-sm text-[#25211D]/75 leading-relaxed">
                  {category.subtitle[language]}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/shop?category=${category.id}`)}
                    className="px-5 py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>{t.categoriesPage.exploreCategory}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
