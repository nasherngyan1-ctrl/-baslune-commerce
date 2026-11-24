import React from 'react';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/SafeImage';
import { formatPriceIqd } from '../utils/format';

export const CartPage: React.FC = () => {
  const {
    language,
    t,
    products,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotalIqd,
    shippingFeeIqd,
    cartTotalIqd,
    settings,
    navigate,
  } = useStore();

  const remainingForFree = Math.max(0, settings.freeShippingThresholdIqd - cartSubtotalIqd);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="border-b border-[#39291F]/10 pb-8 mb-10">
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#25211D]">
          {t.cart.title}
        </h1>
        <p className="text-sm sm:text-base text-[#25211D]/70 mt-2">
          {t.cart.subtitle}
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white border border-[#39291F]/10 rounded-xl py-16 px-6 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#E8DFD1] flex items-center justify-center text-[#39291F]">
            <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h2 className="text-lg font-semibold text-[#25211D]">{t.cart.emptyTitle}</h2>
          <p className="text-sm text-[#25211D]/65 max-w-md mx-auto">
            {t.cart.emptyBody}
          </p>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="px-6 py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
          >
            {t.cart.continueShopping}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Items Column */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              const colorObj = product.colors.find((c) => c.id === item.selectedColorId);

              return (
                <div
                  key={`${item.productId}-${item.selectedColorId || ''}-${item.selectedSize || ''}`}
                  className="bg-white border border-[#39291F]/10 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="w-24 h-24 rounded-lg overflow-hidden bg-[#E8DFD1]/40 shrink-0 cursor-pointer"
                  >
                    <SafeImage
                      src={product.image}
                      alt={product.name[language]}
                      objectPosition={product.imagePosition}
                    />
                  </button>

                  <div className="flex-1 min-w-0 space-y-1">
                    <button
                      type="button"
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="text-start font-semibold text-[#25211D] hover:text-[#39291F] cursor-pointer"
                    >
                      {product.name[language]}
                    </button>
                    <p className="text-xs text-[#25211D]/60">
                      {product.sku}
                      {colorObj ? ` · ${t.cart.colorLabel}: ${colorObj.name[language]}` : ''}
                      {item.selectedSize ? ` · ${t.cart.sizeLabel}: ${item.selectedSize}` : ''}
                    </p>
                    <p className="text-sm font-medium text-[#39291F] tabular-nums pt-1">
                      {formatPriceIqd(product.priceIqd, language)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#39291F]/10">
                    <div className="inline-flex items-center border border-[#39291F]/15 rounded-md bg-[#F7F3EB]/60">
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(
                            item.productId,
                            item.quantity - 1,
                            item.selectedColorId,
                            item.selectedSize
                          )
                        }
                        aria-label="-"
                        className="p-2 text-[#25211D] hover:bg-[#E8DFD1] rounded-s-md cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3.5 text-sm font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(
                            item.productId,
                            item.quantity + 1,
                            item.selectedColorId,
                            item.selectedSize
                          )
                        }
                        aria-label="+"
                        className="p-2 text-[#25211D] hover:bg-[#E8DFD1] rounded-e-md cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-end min-w-[110px]">
                      <p className="text-sm font-semibold text-[#25211D] tabular-nums">
                        {formatPriceIqd(product.priceIqd * item.quantity, language)}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(
                            item.productId,
                            item.selectedColorId,
                            item.selectedSize
                          )
                        }
                        className="mt-1 inline-flex items-center gap-1 text-xs text-[#25211D]/55 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t.cart.remove}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Column */}
          <aside className="lg:col-span-4 bg-white border border-[#39291F]/10 rounded-xl p-6 space-y-5 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-[#25211D] border-b border-[#39291F]/10 pb-3">
              {t.checkout.orderSummary}
            </h2>

            {remainingForFree > 0 ? (
              <p className="text-xs text-[#39291F] bg-[#E8DFD1]/60 px-3 py-2.5 rounded-md">
                {t.cart.freeShippingProgress}{' '}
                <strong className="tabular-nums">
                  {formatPriceIqd(remainingForFree, language)}
                </strong>
              </p>
            ) : (
              <p className="text-xs text-[#39291F] bg-[#E8DFD1]/60 px-3 py-2.5 rounded-md font-medium">
                {t.cart.freeShippingUnlocked}
              </p>
            )}

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-[#25211D]/75">
                <span>{t.cart.subtotal}</span>
                <span className="tabular-nums font-medium">
                  {formatPriceIqd(cartSubtotalIqd, language)}
                </span>
              </div>
              <div className="flex justify-between text-[#25211D]/75">
                <span>{t.cart.shipping}</span>
                <span className="tabular-nums font-medium">
                  {shippingFeeIqd === 0
                    ? t.cart.freeShipping
                    : formatPriceIqd(shippingFeeIqd, language)}
                </span>
              </div>
              <div className="pt-3 border-t border-[#39291F]/10 flex justify-between text-base font-semibold text-[#25211D]">
                <span>{t.cart.total}</span>
                <span className="tabular-nums text-[#39291F]">
                  {formatPriceIqd(cartTotalIqd, language)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full py-3 px-5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
            >
              {t.cart.checkoutButton}
            </button>

            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="w-full py-2.5 px-5 border border-[#39291F]/20 text-[#25211D] text-sm font-medium rounded-md hover:bg-[#E8DFD1]/50 transition-colors cursor-pointer"
            >
              {t.cart.continueShopping}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};
