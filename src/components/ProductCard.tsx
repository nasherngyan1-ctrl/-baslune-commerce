import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/commerce';
import { formatPriceIqd } from '../utils/format';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t, navigate, addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);
  const categoryInfo = CATEGORIES.find((c) => c.id === product.category);
  const isOutOfStock = product.stock <= 0 || product.stockStatus === 'out_of_stock';

  return (
    <article className="group flex flex-col bg-white border border-[#39291F]/10 rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Image Frame */}
      <div className="relative aspect-[4/3] bg-[#E8DFD1]/50 overflow-hidden">
        <button
          type="button"
          onClick={() => navigate(`/product/${product.id}`)}
          className="block w-full h-full cursor-pointer text-start"
          aria-label={product.name[language]}
        >
          <SafeImage
            src={product.image}
            alt={product.name[language]}
            objectPosition={product.imagePosition}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>

        {/* Wishlist Toggle */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? t.product.removeFromWishlist : t.product.addToWishlist}
          className="absolute top-3 end-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-[#39291F]/10 flex items-center justify-center text-[#25211D] hover:bg-[#39291F] hover:text-white transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              wishlisted ? 'fill-[#C6A77B] text-[#C6A77B]' : 'stroke-[1.75]'
            }`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Unboxed Metadata Line */}
          <div className="flex items-center justify-between gap-2 text-xs text-[#25211D]/60 mb-1.5">
            <span className="truncate">
              {categoryInfo?.name[language]}
            </span>
            <span className="flex items-center gap-1 shrink-0 tabular-nums">
              <Star className="w-3 h-3 fill-[#C6A77B] text-[#C6A77B]" />
              {product.rating.toFixed(1)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/product/${product.id}`)}
            className="text-start w-full cursor-pointer"
          >
            <h3 className="text-base font-semibold text-[#25211D] leading-snug line-clamp-1 group-hover:text-[#39291F] transition-colors">
              {product.name[language]}
            </h3>
          </button>

          <p className="mt-1 text-xs text-[#25211D]/65 line-clamp-2 leading-relaxed">
            {product.shortDescription[language]}
          </p>
        </div>

        <div className="pt-3 border-t border-[#39291F]/8 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-semibold text-[#39291F] tabular-nums">
              {formatPriceIqd(product.priceIqd, language)}
            </span>
            {product.compareAtIqd && product.compareAtIqd > product.priceIqd ? (
              <span className="text-[11px] text-[#25211D]/45 line-through tabular-nums">
                {formatPriceIqd(product.compareAtIqd, language)}
              </span>
            ) : (
              <span className="text-[11px] text-[#25211D]/55">
                {isOutOfStock
                  ? t.product.outOfStock
                  : product.stockStatus === 'low_stock'
                  ? `${product.stock} ${t.product.leftInStock}`
                  : t.product.inStock}
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() => addToCart(product.id, 1)}
            className={`px-3.5 py-2 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isOutOfStock
                ? 'bg-[#E8DFD1] text-[#25211D]/40 cursor-not-allowed'
                : 'bg-[#39291F] text-[#F7F3EB] hover:bg-[#25211D]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? t.product.outOfStock : t.product.addToCart}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
