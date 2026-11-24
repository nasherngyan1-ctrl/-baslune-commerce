import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Info, Landmark, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, PaymentMethod } from '../types/commerce';
import { formatDate, formatPriceIqd } from '../utils/format';
import { SafeImage } from '../components/SafeImage';

export const CheckoutPage: React.FC = () => {
  const {
    language,
    t,
    products,
    cart,
    cartSubtotalIqd,
    shippingFeeIqd,
    cartTotalIqd,
    placeDemoOrder,
    navigate,
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (fullName.trim().length < 3) {
      nextErrors.fullName = t.checkout.errors.nameRequired;
    }
    const digits = phone.replace(/[\s\-()+]/g, '');
    if (digits.length < 9 || digits.length > 15 || !/^\d+$/.test(digits)) {
      nextErrors.phone = t.checkout.errors.phoneInvalid;
    }
    if (!city) {
      nextErrors.city = t.checkout.errors.cityRequired;
    }
    if (address.trim().length < 6) {
      nextErrors.address = t.checkout.errors.addressRequired;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!validate()) return;

    const order = placeDemoOrder({
      customerName: fullName,
      phone,
      city,
      address,
      notes,
      paymentMethod,
    });
    setConfirmedOrder(order);
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="bg-white border border-[#39291F]/15 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3 text-[#39291F]">
            <CheckCircle2 className="w-8 h-8 text-[#C6A77B] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C6A77B]">
                {t.checkout.confirmation.kicker}
              </p>
              <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#25211D]">
                {t.checkout.confirmation.title}
              </h1>
            </div>
          </div>

          <p className="text-sm text-[#25211D]/75">
            {t.checkout.confirmation.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-[#F7F3EB] border border-[#39291F]/10 text-sm">
            <div>
              <p className="text-xs text-[#25211D]/60">
                {t.checkout.confirmation.orderNumberLabel}
              </p>
              <p className="font-semibold text-[#39291F] tabular-nums mt-0.5" dir="ltr">
                {confirmedOrder.orderNumber}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#25211D]/60">
                {t.checkout.confirmation.estimatedDeliveryLabel}
              </p>
              <p className="font-semibold text-[#25211D] tabular-nums mt-0.5">
                {formatDate(confirmedOrder.estimatedDelivery, language)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#25211D]/60">
                {t.checkout.confirmation.paymentMethodLabel}
              </p>
              <p className="font-semibold text-[#25211D] mt-0.5">
                {confirmedOrder.paymentMethod === 'cod'
                  ? t.checkout.codTitle
                  : t.checkout.bankTitle}
              </p>
            </div>
          </div>

          <div className="space-y-2 border-t border-[#39291F]/10 pt-4">
            {confirmedOrder.items.map((item, idx) => (
              <div
                key={`${item.productId}-${idx}`}
                className="flex items-center justify-between text-sm py-1"
              >
                <span className="text-[#25211D]/85">
                  {item.name[language]} × {item.quantity}
                </span>
                <span className="tabular-nums font-medium text-[#39291F]">
                  {formatPriceIqd(item.priceIqd * item.quantity, language)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-[#39291F]/10 font-semibold text-base">
              <span>{t.cart.total}</span>
              <span className="tabular-nums text-[#39291F]">
                {formatPriceIqd(confirmedOrder.totalIqd, language)}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#25211D]/65 bg-[#E8DFD1]/60 px-3.5 py-2.5 rounded-md">
            {t.checkout.confirmation.demoDisclaimer}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(`/track-order?ref=${confirmedOrder.orderNumber}`)}
              className="px-6 py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
            >
              {t.checkout.confirmation.trackOrderCta}
            </button>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="px-6 py-2.5 border border-[#39291F]/20 text-[#25211D] text-sm font-medium rounded-md hover:bg-[#E8DFD1]/50 transition-colors cursor-pointer"
            >
              {t.checkout.confirmation.continueShoppingCta}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-editorial text-3xl font-semibold text-[#25211D]">
          {t.checkout.title}
        </h1>
        <p className="text-sm text-[#25211D]/70">{t.checkout.errors.emptyCart}</p>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
        >
          {t.cart.continueShopping}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="border-b border-[#39291F]/10 pb-6 mb-8">
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#25211D]">
          {t.checkout.title}
        </h1>
        <p className="text-sm sm:text-base text-[#25211D]/70 mt-1.5">
          {t.checkout.subtitle}
        </p>
      </div>

      {/* Clear Demo Checkout Notice */}
      <div className="mb-8 p-4 rounded-lg bg-[#E8DFD1]/70 border border-[#39291F]/15 flex items-start gap-3 text-xs sm:text-sm text-[#39291F]">
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        <span>{t.checkout.demoNotice}</span>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
      >
        {/* Left Form Fields */}
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white border border-[#39291F]/10 rounded-xl p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-semibold text-[#25211D] border-b border-[#39291F]/10 pb-3">
              {t.checkout.customerSection}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#25211D] mb-1.5">
                  {t.checkout.fullName} *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.checkout.fullNamePlaceholder}
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm focus:outline-none focus:border-[#39291F]"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#25211D] mb-1.5">
                  {t.checkout.phone} *
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.checkout.phonePlaceholder}
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm focus:outline-none focus:border-[#39291F]"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#25211D] mb-1.5">
                  {t.checkout.city} *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm focus:outline-none focus:border-[#39291F]"
                >
                  <option value="">{t.checkout.cityPlaceholder}</option>
                  {t.checkout.cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.city}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#25211D] mb-1.5">
                  {t.checkout.address} *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t.checkout.addressPlaceholder}
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm focus:outline-none focus:border-[#39291F]"
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#25211D] mb-1.5">
                  {t.checkout.notes}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.checkout.notesPlaceholder}
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm focus:outline-none focus:border-[#39291F]"
                />
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white border border-[#39291F]/10 rounded-xl p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-semibold text-[#25211D] border-b border-[#39291F]/10 pb-3">
              {t.checkout.paymentSection}
            </h2>

            <label
              className={`flex items-start gap-3.5 p-4 rounded-lg border cursor-pointer transition-colors ${
                paymentMethod === 'cod'
                  ? 'border-[#39291F] bg-[#F7F3EB]/60'
                  : 'border-[#39291F]/15 hover:border-[#39291F]/35'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="mt-1 accent-[#39291F]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 font-semibold text-sm text-[#25211D]">
                  <Truck className="w-4 h-4 text-[#C6A77B]" />
                  <span>{t.checkout.codTitle}</span>
                </div>
                <p className="text-xs text-[#25211D]/70 mt-1">{t.checkout.codDesc}</p>
              </div>
            </label>

            <label
              className={`flex items-start gap-3.5 p-4 rounded-lg border cursor-pointer transition-colors ${
                paymentMethod === 'bank_transfer'
                  ? 'border-[#39291F] bg-[#F7F3EB]/60'
                  : 'border-[#39291F]/15 hover:border-[#39291F]/35'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === 'bank_transfer'}
                onChange={() => setPaymentMethod('bank_transfer')}
                className="mt-1 accent-[#39291F]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 font-semibold text-sm text-[#25211D]">
                  <Landmark className="w-4 h-4 text-[#C6A77B]" />
                  <span>{t.checkout.bankTitle}</span>
                </div>
                <p className="text-xs text-[#25211D]/70 mt-1">{t.checkout.bankDesc}</p>
                {paymentMethod === 'bank_transfer' && (
                  <p className="text-xs text-[#39291F] mt-2 p-2.5 bg-white border border-[#39291F]/10 rounded">
                    {t.checkout.bankDetails}
                  </p>
                )}
              </div>
            </label>
          </section>
        </div>

        {/* Right Summary */}
        <aside className="lg:col-span-5 bg-white border border-[#39291F]/10 rounded-xl p-6 sm:p-8 space-y-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold text-[#25211D] border-b border-[#39291F]/10 pb-3">
            {t.checkout.orderSummary}
          </h2>

          <div className="space-y-3.5 max-h-72 overflow-y-auto pe-1">
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              return (
                <div
                  key={`${item.productId}-${item.selectedColorId || ''}-${item.selectedSize || ''}`}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-[#E8DFD1]/50 shrink-0">
                    <SafeImage
                      src={product.image}
                      alt={product.name[language]}
                      objectPosition={product.imagePosition}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#25211D] truncate">
                      {product.name[language]}
                    </p>
                    <p className="text-xs text-[#25211D]/60 tabular-nums">
                      × {item.quantity}
                    </p>
                  </div>
                  <span className="tabular-nums font-medium text-[#39291F] shrink-0">
                    {formatPriceIqd(product.priceIqd * item.quantity, language)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#39291F]/10 space-y-2.5 text-sm">
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
            type="submit"
            className="w-full py-3 px-5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
          >
            {t.checkout.placeOrder}
          </button>
        </aside>
      </form>
    </div>
  );
};
