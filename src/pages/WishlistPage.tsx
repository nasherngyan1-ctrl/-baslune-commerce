import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/SafeImage';
import { formatPriceIqd } from '../utils/format';

export const WishlistPage: React.FC = () => {
  const {
    language,
    t,
    products,
    wishlist,
    toggleWishlist,
    addToCart,
    navigate,
  } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="border-b border-[#39291F]/10 pb-8 mb-10">
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#25211D]">
          {t.wishlistPage.title}
        </h1>
        <p className="text-sm sm:text-base text-[#25211D]/70 mt-2">
          {t.wishlistPage.subtitle}
        </p>
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-white border border-[#39291F]/10 rounded-xl py-16 px-6 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#E8DFD1] flex items-center justify-center text-[#39291F]">
            <Heart className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h2 className="text-lg font-semibold text-[#25211D]">
            {t.wishlistPage.emptyTitle}
          </h2>
          <p className="text-sm text-[#25211D]/65 max-w-md mx-auto">
            {t.wishlistPage.emptyBody}
          </p>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="px-6 py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
          >
            {t.wishlistPage.browseShop}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedProducts.map((product) => {
            const isOut = product.stock <= 0;
            return (
              <div
                key={product.id}
                className="bg-white border border-[#39291F]/10 rounded-lg overflow-hidden flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="aspect-[4/3] bg-[#E8DFD1]/40 overflow-hidden cursor-pointer"
                >
                  <SafeImage
                    src={product.image}
                    alt={product.name[language]}
                    objectPosition={product.imagePosition}
                  />
                </button>
                <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-[#25211D] line-clamp-1">
                      {product.name[language]}
                    </h3>
                    <p className="text-sm font-semibold text-[#39291F] tabular-nums mt-1">
                      {formatPriceIqd(product.priceIqd, language)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#39291F]/10">
                    <button
                      type="button"
                      disabled={isOut}
                      onClick={() => {
                        addToCart(product.id, 1);
                        toggleWishlist(product.id);
                      }}
                      className={`flex-1 py-2 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isOut
                          ? 'bg-[#E8DFD1] text-[#25211D]/45 cursor-not-allowed'
                          : 'bg-[#39291F] text-[#F7F3EB] hover:bg-[#25211D]'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t.wishlistPage.moveToCart}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={t.wishlistPage.remove}
                      className="p-2 rounded-md border border-[#39291F]/15 text-[#25211D]/70 hover:text-red-700 hover:border-red-300 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
