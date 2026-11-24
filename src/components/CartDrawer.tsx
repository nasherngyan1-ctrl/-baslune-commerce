import React from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPriceIqd } from '../utils/format';
import { SafeImage } from './SafeImage';

export const CartDrawer: React.FC = () => {
  const {
    language,
    t,
    products,
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotalIqd,
    shippingFeeIqd,
    cartTotalIqd,
    settings,
    navigate,
  } = useStore();

  if (!cartDrawerOpen) return null;

  const remainingForFree = Math.max(0, settings.freeShippingThresholdIqd - cartSubtotalIqd);
  const progressPct = Math.min(
    100,
    Math.round((cartSubtotalIqd / Math.max(1, settings.freeShippingThresholdIqd)) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-[#25211D]/45 backdrop-blur-[2px]"
        onClick={() => setCartDrawerOpen(false)}
        aria-hidden="true"
      />

      <aside
        className="relative w-full max-w-md bg-[#F7F3EB] h-full shadow-2xl border-s border-[#39291F]/15 flex flex-col"
        aria-label={t.cart.drawerTitle}
      >
        <div className="px-6 py-5 border-b border-[#39291F]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#39291F]" />
            <h2 className="text-lg font-semibold text-[#25211D]">
              {t.cart.drawerTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCartDrawerOpen(false)}
            aria-label={t.nav.close}
            className="p-2 rounded-md text-[#25211D]/70 hover:text-[#25211D] hover:bg-[#E8DFD1]/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress */}
        {cart.length > 0 && (
          <div className="px-6 py-3 bg-[#E8DFD1]/50 border-b border-[#39291F]/10">
            <div className="flex items-center justify-between text-xs text-[#25211D]/80 mb-1.5">
              <span>
                {remainingForFree === 0
                  ? t.cart.freeShippingUnlocked
                  : `${t.cart.freeShippingProgress} ${formatPriceIqd(remainingForFree, language)}`}
              </span>
              <span className="tabular-nums font-medium">{progressPct}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#39291F]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#39291F] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[#E8DFD1] flex items-center justify-center mb-4 text-[#39291F]">
                <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-semibold text-[#25211D] mb-1">
                {t.cart.emptyTitle}
              </h3>
              <p className="text-sm text-[#25211D]/65 max-w-xs mb-6">
                {t.cart.emptyBody}
              </p>
              <button
                type="button"
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigate('/shop');
                }}
                className="px-5 py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
              >
                {t.cart.continueShopping}
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              const colorObj = product.colors.find((c) => c.id === item.selectedColorId);

              return (
                <div
                  key={`${item.productId}-${item.selectedColorId || ''}-${item.selectedSize || ''}`}
                  className="flex gap-4 bg-white p-3.5 rounded-lg border border-[#39291F]/10"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setCartDrawerOpen(false);
                      navigate(`/product/${product.id}`);
                    }}
                    className="w-20 h-20 rounded-md overflow-hidden bg-[#E8DFD1]/40 shrink-0 cursor-pointer"
                  >
                    <SafeImage
                      src={product.image}
                      alt={product.name[language]}
                      objectPosition={product.imagePosition}
                    />
                  </button>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[#25211D] line-clamp-1">
                          {product.name[language]}
                        </h4>
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(
                              item.productId,
                              item.selectedColorId,
                              item.selectedSize
                            )
                          }
                          aria-label={t.cart.remove}
                          className="text-[#25211D]/45 hover:text-[#39291F] transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {(colorObj || item.selectedSize) && (
                        <p className="text-xs text-[#25211D]/60 mt-0.5">
                          {colorObj ? colorObj.name[language] : ''}
                          {colorObj && item.selectedSize ? ' · ' : ''}
                          {item.selectedSize || ''}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
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
                          className="p-1.5 text-[#25211D] hover:bg-[#E8DFD1] rounded-s-md transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums">
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
                          className="p-1.5 text-[#25211D] hover:bg-[#E8DFD1] rounded-e-md transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#39291F] tabular-nums">
                        {formatPriceIqd(product.priceIqd * item.quantity, language)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Totals */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#39291F]/10 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-[#25211D]/75">
                <span>{t.cart.subtotal}</span>
                <span className="tabular-nums font-medium">
                  {formatPriceIqd(cartSubtotalIqd, language)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#25211D]/75">
                <span>{t.cart.shipping}</span>
                <span className="tabular-nums font-medium">
                  {shippingFeeIqd === 0
                    ? t.cart.freeShipping
                    : formatPriceIqd(shippingFeeIqd, language)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#39291F]/10 flex items-center justify-between text-base font-semibold text-[#25211D]">
                <span>{t.cart.total}</span>
                <span className="tabular-nums text-[#39291F]">
                  {formatPriceIqd(cartTotalIqd, language)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigate('/cart');
                }}
                className="py-2.5 px-4 border border-[#39291F]/25 text-[#25211D] text-sm font-medium rounded-md hover:bg-[#E8DFD1]/60 transition-colors cursor-pointer"
              >
                {t.cart.viewCartButton}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigate('/checkout');
                }}
                className="py-2.5 px-4 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
              >
                {t.cart.checkoutButton}
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
