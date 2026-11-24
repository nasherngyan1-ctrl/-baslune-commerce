import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { SafeImage } from '../components/SafeImage';
import { formatPriceIqd } from '../utils/format';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const {
    language,
    t,
    products,
    navigate,
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useStore();

  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [products, productId]
  );

  const [selectedColorId, setSelectedColorId] = useState<string | undefined>(
    product?.colors[0]?.id
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedColorId(product?.colors[0]?.id);
    setSelectedSize(product?.sizes?.[0]);
    setQuantity(1);
  }, [productId, product]);

  const BackArrow = t.dir === 'rtl' ? ArrowRight : ArrowLeft;

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-editorial text-3xl font-semibold text-[#25211D]">
          {t.product.notFoundTitle}
        </h1>
        <p className="text-sm text-[#25211D]/70">{t.product.notFoundBody}</p>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
        >
          {t.product.backToShop}
        </button>
      </div>
    );
  }

  const categoryInfo = CATEGORIES.find((c) => c.id === product.category);
  const wishlisted = isWishlisted(product.id);
  const isOutOfStock = product.stock <= 0 || product.stockStatus === 'out_of_stock';

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
      <button
        type="button"
        onClick={() => navigate('/shop')}
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#25211D]/70 hover:text-[#25211D] mb-8 cursor-pointer"
      >
        <BackArrow className="w-4 h-4" />
        <span>{t.product.backToShop}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Product Image */}
        <div className="lg:col-span-7 lg:sticky lg:top-24">
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#E8DFD1]/50 border border-[#39291F]/10">
            <SafeImage
              src={product.image}
              alt={product.name[language]}
              objectPosition={product.imagePosition}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-[#39291F]/10">
          <div className="space-y-2 border-b border-[#39291F]/10 pb-5">
            <div className="flex items-center justify-between gap-3 text-xs text-[#25211D]/60">
              <span>
                {categoryInfo?.name[language]} · {t.product.sku}: {product.sku}
              </span>
              <span className="inline-flex items-center gap-1 tabular-nums text-[#25211D]">
                <Star className="w-3.5 h-3.5 fill-[#C6A77B] text-[#C6A77B]" />
                {product.rating.toFixed(1)} ({product.reviewCount} {t.product.reviews})
              </span>
            </div>

            <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#25211D] leading-snug">
              {product.name[language]}
            </h1>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-xl sm:text-2xl font-semibold text-[#39291F] tabular-nums">
                {formatPriceIqd(product.priceIqd, language)}
              </span>
              {product.compareAtIqd && product.compareAtIqd > product.priceIqd && (
                <span className="text-sm text-[#25211D]/45 line-through tabular-nums">
                  {formatPriceIqd(product.compareAtIqd, language)}
                </span>
              )}
            </div>

            <p className="text-xs font-medium text-[#39291F]/80">
              {isOutOfStock
                ? t.product.outOfStock
                : product.stockStatus === 'low_stock'
                ? `${t.product.lowStock} — ${product.stock} ${t.product.leftInStock}`
                : t.product.inStock}
            </p>
          </div>

          <p className="text-sm text-[#25211D]/80 leading-relaxed">
            {product.description[language]}
          </p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="space-y-2.5">
              <span className="block text-xs font-semibold text-[#25211D]">
                {t.product.selectColor}:{' '}
                <span className="font-normal text-[#25211D]/70">
                  {product.colors.find((c) => c.id === selectedColorId)?.name[language]}
                </span>
              </span>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedColorId(color.id)}
                    aria-label={color.name[language]}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                      selectedColorId === color.id
                        ? 'border-[#39291F] scale-110'
                        : 'border-[#39291F]/20'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2.5">
              <span className="block text-xs font-semibold text-[#25211D]">
                {t.product.selectSize}
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#39291F] text-[#F7F3EB] border-[#39291F]'
                        : 'bg-[#F7F3EB]/60 text-[#25211D] border-[#39291F]/15 hover:border-[#39291F]/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center border border-[#39291F]/20 rounded-md bg-[#F7F3EB]/60">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="-"
                  className="p-3 text-[#25211D] hover:bg-[#E8DFD1] rounded-s-md cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(Math.max(1, product.stock), q + 1))}
                  aria-label="+"
                  className="p-3 text-[#25211D] hover:bg-[#E8DFD1] rounded-e-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                disabled={isOutOfStock}
                onClick={() => addToCart(product.id, quantity, selectedColorId, selectedSize)}
                className={`flex-1 py-3 px-5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isOutOfStock
                    ? 'bg-[#E8DFD1] text-[#25211D]/45 cursor-not-allowed'
                    : 'bg-[#39291F] text-[#F7F3EB] hover:bg-[#25211D]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isOutOfStock ? t.product.outOfStock : t.product.addToCart}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="w-full py-2.5 px-4 border border-[#39291F]/20 rounded-md text-xs sm:text-sm font-medium text-[#25211D] hover:bg-[#E8DFD1]/50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlisted ? 'fill-[#C6A77B] text-[#C6A77B]' : 'stroke-[1.75]'
                }`}
              />
              <span>
                {wishlisted ? t.product.removeFromWishlist : t.product.addToWishlist}
              </span>
            </button>
          </div>

          {/* Material & Shipping Info */}
          <div className="pt-5 border-t border-[#39291F]/10 space-y-2.5 text-xs text-[#25211D]/75">
            <div className="flex justify-between gap-4">
              <span className="font-semibold text-[#25211D]">{t.product.material}</span>
              <span className="text-end">{product.material[language]}</span>
            </div>
            <div className="flex items-center gap-2 pt-1 text-[#39291F]">
              <Truck className="w-4 h-4 text-[#C6A77B] shrink-0" />
              <span>{t.product.shippingNote}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-[#39291F]/10">
          <h2 className="font-editorial text-2xl font-semibold text-[#25211D] mb-6">
            {t.product.relatedProducts}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
