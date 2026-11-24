import React from 'react';
import { ASSET_IMAGES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/SafeImage';

export const AboutPage: React.FC = () => {
  const { t, navigate } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C6A77B]">
            {t.about.kicker}
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#25211D] leading-tight text-balance">
            {t.about.title}
          </h1>
          <p className="text-base text-[#25211D]/80 leading-relaxed">
            {t.about.lead}
          </p>
          <p className="text-xs font-medium text-[#39291F] pt-2">
            {t.about.studioBadge}
          </p>
        </div>

        <div className="lg:col-span-6 aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1] border border-[#39291F]/10">
          <SafeImage
            src={ASSET_IMAGES.homeLivingRoom}
            alt={t.about.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-y border-[#39291F]/15 py-10">
        {t.about.metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <p className="font-editorial text-3xl sm:text-4xl font-semibold text-[#39291F] tabular-nums">
              {m.value}
            </p>
            <p className="text-xs sm:text-sm text-[#25211D]/70">{m.label}</p>
          </div>
        ))}
      </section>

      {/* Story Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1] border border-[#39291F]/10">
          <SafeImage
            src={ASSET_IMAGES.giftBoxRibbon}
            alt={t.about.storyTitle}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:col-span-7 space-y-5">
          <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#25211D]">
            {t.about.storyTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#25211D]/80 leading-relaxed">
            {t.about.storyBody1}
          </p>
          <p className="text-sm sm:text-base text-[#25211D]/80 leading-relaxed">
            {t.about.storyBody2}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="px-6 py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
            >
              {t.hero.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="space-y-8">
        <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#25211D]">
          {t.about.pillarsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.about.pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="bg-white border border-[#39291F]/10 rounded-xl p-6 sm:p-8 space-y-3"
            >
              <span className="text-xs font-semibold text-[#C6A77B] tabular-nums">
                0{idx + 1}.
              </span>
              <h3 className="text-lg font-semibold text-[#25211D]">{pillar.title}</h3>
              <p className="text-sm text-[#25211D]/75 leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
