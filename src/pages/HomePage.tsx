import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Gift, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { ASSET_IMAGES, CATEGORIES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { SafeImage } from '../components/SafeImage';

type CollectionTab = 'trending' | 'bestsellers' | 'new';

export const HomePage: React.FC = () => {
  const { language, t, products, navigate } = useStore();
  const [activeTab, setActiveTab] = useState<CollectionTab>('trending');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'success' | 'error'>('idle');

  const ArrowIcon = t.dir === 'rtl' ? ArrowLeft : ArrowRight;

  const displayedProducts = useMemo(() => {
    if (activeTab === 'trending') {
      return products.filter((p) => p.isTrending).slice(0, 8);
    }
    if (activeTab === 'bestsellers') {
      return products.filter((p) => p.isBestSeller).slice(0, 8);
    }
    return products.filter((p) => p.isNewArrival).slice(0, 8);
  }, [activeTab, products]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim());
    if (!valid) {
      setNewsletterState('error');
      return;
    }
    setNewsletterState('success');
    setNewsletterEmail('');
  };

  const advantageIcons = [ShieldCheck, Truck, Gift, Sparkles];

  return (
    <div>
      {/* Hero Section using uploaded Image 1 */}
      <section className="relative bg-[#E8DFD1]/50 border-b border-[#39291F]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Editorial Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6 py-2 lg:py-8">
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#39291F]/75">
                {t.hero.kicker}
              </p>

              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#25211D] leading-[1.16] text-balance">
                {t.hero.title}
              </h1>

              <p className="text-sm sm:text-base text-[#25211D]/75 leading-relaxed max-w-lg">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  className="px-6 py-3 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/categories')}
                  className="px-6 py-3 bg-white/80 text-[#25211D] border border-[#39291F]/20 text-sm font-medium rounded-md hover:bg-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t.hero.secondaryCta}
                </button>
              </div>

              <div className="pt-6 border-t border-[#39291F]/10 text-xs text-[#25211D]/60">
                {t.hero.editorialCaption}
              </div>
            </div>

            {/* Hero Image 1 */}
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[440px] lg:min-h-[540px] rounded-xl overflow-hidden bg-[#E8DFD1] border border-[#39291F]/10">
              <SafeImage
                src={ASSET_IMAGES.heroTotePromenade}
                alt={t.hero.title}
                loading="eager"
                objectPosition="55% 25%"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#25211D]/45 to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 lg:mb-10">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#25211D]">
              {t.home.categoriesTitle}
            </h2>
            <p className="text-sm text-[#25211D]/70 mt-1.5">
              {t.home.categoriesSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/categories')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#39291F] hover:text-[#C6A77B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{t.home.viewAllCategories}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {CATEGORIES.map((category) => {
            const count = products.filter((p) => p.category === category.id).length;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => navigate(`/shop?category=${category.id}`)}
                className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-lg overflow-hidden bg-[#E8DFD1] border border-[#39291F]/10 text-start cursor-pointer"
              >
                <SafeImage
                  src={category.image}
                  alt={category.name[language]}
                  objectPosition={category.imagePosition}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#25211D]/85 via-[#25211D]/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="text-[11px] text-[#E8DFD1]/85 tabular-nums">
                    {count} {t.categoriesPage.itemsAvailable}
                  </p>
                  <h3 className="text-base font-semibold mt-0.5">{category.name[language]}</h3>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Trending / Best Sellers / New Arrivals Showcase */}
      <section className="bg-white/60 border-y border-[#39291F]/10 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#25211D]">
                {t.home.collectionTitle}
              </h2>
              <p className="text-sm text-[#25211D]/70 mt-1.5">
                {t.home.collectionSubtitle}
              </p>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1 p-1 bg-[#E8DFD1]/70 rounded-lg self-start md:self-auto">
              {(
                [
                  { id: 'trending', label: t.home.tabTrending },
                  { id: 'bestsellers', label: t.home.tabBestSellers },
                  { id: 'new', label: t.home.tabNewArrivals },
                ] as { id: CollectionTab; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#39291F] text-[#F7F3EB]'
                      : 'text-[#25211D]/75 hover:text-[#25211D]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="px-7 py-3 border border-[#39291F]/25 bg-white text-[#25211D] text-sm font-medium rounded-md hover:bg-[#39291F] hover:text-[#F7F3EB] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{t.home.viewAllProducts}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Promotional Editorial Campaign */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="bg-[#39291F] text-[#F7F3EB] rounded-2xl overflow-hidden border border-[#C6A77B]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-5">
              <p className="text-xs tracking-[0.16em] uppercase text-[#C6A77B]">
                {t.home.campaignKicker}
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug text-balance">
                {t.home.campaignTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#E8DFD1]/80 leading-relaxed max-w-lg">
                {t.home.campaignBody}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/shop?category=accessories')}
                  className="px-5 py-2.5 bg-[#C6A77B] text-[#25211D] text-sm font-semibold rounded-md hover:bg-[#E8DFD1] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t.home.campaignCta}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/about')}
                  className="px-5 py-2.5 border border-[#E8DFD1]/30 text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t.home.campaignSecondaryCta}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-1 bg-[#25211D] min-h-[300px] lg:min-h-[420px]">
              <div className="relative overflow-hidden">
                <SafeImage
                  src={ASSET_IMAGES.giftBoxRibbon}
                  alt={t.home.campaignTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden">
                <SafeImage
                  src={ASSET_IMAGES.homeGiftTable}
                  alt={t.home.campaignTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Advantages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-20">
        <div className="border-t border-[#39291F]/15 pt-12">
          <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-[#39291F]/70 mb-8">
            {t.home.advantagesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.home.advantages.map((item, idx) => {
              const Icon = advantageIcons[idx % advantageIcons.length];
              return (
                <div key={item.title} className="space-y-2.5">
                  <Icon className="w-5 h-5 text-[#C6A77B] stroke-[1.75]" />
                  <h3 className="text-base font-semibold text-[#25211D]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#25211D]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#E8DFD1]/70 border-t border-[#39291F]/10 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#25211D]">
            {t.home.newsletterTitle}
          </h2>
          <p className="text-sm text-[#25211D]/75">{t.home.newsletterSubtitle}</p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-2"
            noValidate
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => {
                setNewsletterEmail(e.target.value);
                if (newsletterState !== 'idle') setNewsletterState('idle');
              }}
              placeholder={t.home.newsletterPlaceholder}
              className="flex-1 px-4 py-3 bg-white border border-[#39291F]/20 rounded-md text-sm text-[#25211D] placeholder:text-[#25211D]/45 focus:outline-none focus:border-[#39291F]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.home.newsletterButton}
            </button>
          </form>

          {newsletterState === 'success' && (
            <p className="text-xs font-medium text-[#39291F] inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#C6A77B]" />
              {t.home.newsletterSuccess}
            </p>
          )}
          {newsletterState === 'error' && (
            <p className="text-xs font-medium text-red-700">
              {t.home.newsletterInvalid}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
