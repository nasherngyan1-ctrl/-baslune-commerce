import React, { useEffect, useState } from 'react';
import { Check, Package, Search, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types/commerce';
import { formatDate, formatPriceIqd } from '../utils/format';
import { SafeImage } from '../components/SafeImage';

const TIMELINE_STEPS: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'shipped',
  'delivered',
];

export const OrderTrackingPage: React.FC = () => {
  const { language, t, orders } = useStore();
  const [query, setQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] ?? null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setQuery(ref);
      const match = orders.find(
        (o) => o.orderNumber.toLowerCase() === ref.trim().toLowerCase()
      );
      setSelectedOrder(match ?? null);
      setSearched(true);
    }
  }, [orders]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const found = orders.find((o) => o.orderNumber.toLowerCase() === q);
    setSelectedOrder(found ?? null);
    setSearched(true);
  };

  const quickSelectOrder = (orderNumber: string) => {
    setQuery(orderNumber);
    const found = orders.find((o) => o.orderNumber === orderNumber);
    setSelectedOrder(found ?? null);
    setSearched(true);
  };

  const currentStepIdx = selectedOrder
    ? TIMELINE_STEPS.indexOf(selectedOrder.status)
    : -1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-8">
      <div className="border-b border-[#39291F]/10 pb-6">
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#25211D]">
          {t.tracking.title}
        </h1>
        <p className="text-sm sm:text-base text-[#25211D]/70 mt-2">
          {t.tracking.subtitle}
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white border border-[#39291F]/10 rounded-xl p-6 space-y-4">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#25211D]/45 absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
            <input
              type="text"
              dir="ltr"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.tracking.inputPlaceholder}
              aria-label={t.tracking.inputLabel}
              className="w-full ps-10 pe-4 py-2.5 bg-[#F7F3EB]/50 border border-[#39291F]/20 rounded-md text-sm focus:outline-none focus:border-[#39291F]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors whitespace-nowrap cursor-pointer"
          >
            {t.tracking.searchCta}
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 text-xs text-[#25211D]/70">
          <span>{t.tracking.sampleOrdersLabel}</span>
          {orders.slice(0, 4).map((o) => (
            <button
              key={o.id}
              type="button"
              dir="ltr"
              onClick={() => quickSelectOrder(o.orderNumber)}
              className="px-2.5 py-1 rounded bg-[#E8DFD1]/70 hover:bg-[#E8DFD1] text-[#39291F] font-medium tabular-nums transition-colors cursor-pointer"
            >
              {o.orderNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {searched && !selectedOrder ? (
        <div className="bg-white border border-[#39291F]/10 rounded-xl p-10 text-center space-y-2">
          <Package className="w-8 h-8 mx-auto text-[#39291F]/50 stroke-[1.5]" />
          <h2 className="text-base font-semibold text-[#25211D]">
            {t.tracking.notFoundTitle}
          </h2>
          <p className="text-sm text-[#25211D]/65">{t.tracking.notFoundBody}</p>
        </div>
      ) : (
        selectedOrder && (
          <div className="bg-white border border-[#39291F]/10 rounded-xl p-6 sm:p-8 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#39291F]/10 pb-5">
              <div>
                <p className="text-xs text-[#25211D]/60">{t.tracking.inputLabel}</p>
                <h2
                  className="text-xl font-semibold text-[#39291F] tabular-nums"
                  dir="ltr"
                >
                  {selectedOrder.orderNumber}
                </h2>
              </div>

              <div className="text-sm font-medium px-3 py-1.5 rounded bg-[#E8DFD1]/70 text-[#39291F]">
                {t.tracking.steps[selectedOrder.status]}
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs text-[#25211D]/60">{t.tracking.orderDate}</p>
                <p className="font-medium text-[#25211D] mt-0.5">
                  {formatDate(selectedOrder.createdAt, language)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#25211D]/60">{t.tracking.estimatedDelivery}</p>
                <p className="font-medium text-[#25211D] mt-0.5">
                  {formatDate(selectedOrder.estimatedDelivery, language)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#25211D]/60">{t.tracking.destination}</p>
                <p className="font-medium text-[#25211D] mt-0.5">
                  {selectedOrder.city} — {selectedOrder.customerName}
                </p>
              </div>
            </div>

            {/* Progress Timeline */}
            {selectedOrder.status !== 'cancelled' && (
              <div className="pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {TIMELINE_STEPS.map((step, idx) => {
                    const completed = idx <= currentStepIdx;
                    return (
                      <div
                        key={step}
                        className={`p-3 rounded-lg border text-center space-y-1.5 ${
                          completed
                            ? 'bg-[#39291F] text-[#F7F3EB] border-[#39291F]'
                            : 'bg-[#F7F3EB]/60 text-[#25211D]/55 border-[#39291F]/10'
                        }`}
                      >
                        <div className="flex justify-center">
                          {completed ? (
                            <Check className="w-4 h-4 text-[#C6A77B]" />
                          ) : (
                            <Truck className="w-4 h-4 opacity-40" />
                          )}
                        </div>
                        <p className="text-xs font-medium">{t.tracking.steps[step]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Items */}
            <div className="border-t border-[#39291F]/10 pt-5 space-y-3">
              <h3 className="text-sm font-semibold text-[#25211D]">
                {t.tracking.itemsTitle}
              </h3>
              {selectedOrder.items.map((item, idx) => (
                <div
                  key={`${item.productId}-${idx}`}
                  className="flex items-center gap-4 text-sm"
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-[#E8DFD1]/50 shrink-0">
                    <SafeImage src={item.image} alt={item.name[language]} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#25211D] truncate">
                      {item.name[language]}
                    </p>
                    <p className="text-xs text-[#25211D]/60 tabular-nums">
                      × {item.quantity}
                    </p>
                  </div>
                  <span className="tabular-nums font-medium text-[#39291F]">
                    {formatPriceIqd(item.priceIqd * item.quantity, language)}
                  </span>
                </div>
              ))}

              <div className="pt-3 border-t border-[#39291F]/10 flex justify-between text-base font-semibold">
                <span>{t.cart.total}</span>
                <span className="tabular-nums text-[#39291F]">
                  {formatPriceIqd(selectedOrder.totalIqd, language)}
                </span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
