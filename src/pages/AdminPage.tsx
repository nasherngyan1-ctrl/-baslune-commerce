import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  Edit3,
  LayoutDashboard,
  LogOut,
  Package,
  Plus,
  RotateCcw,
  Settings,
  ShoppingCart,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { ASSET_IMAGES, CATEGORIES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { CategoryId, Language, OrderStatus, Product } from '../types/commerce';
import { formatDate, formatPriceIqd } from '../utils/format';
import { SafeImage } from '../components/SafeImage';

type AdminTab =
  | 'overview'
  | 'products'
  | 'inventory'
  | 'orders'
  | 'customers'
  | 'reports'
  | 'settings';

const ASSET_OPTIONS = Object.entries(ASSET_IMAGES).map(([key, url]) => ({
  key,
  url,
}));

export const AdminPage: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    navigate,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    settings,
    updateSettings,
    resetDemoData,
    adminAuthenticated,
    loginAdmin,
    logoutAdmin,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Product modal state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formState, setFormState] = useState({
    sku: '',
    nameEn: '',
    nameCkb: '',
    nameAr: '',
    descEn: '',
    descCkb: '',
    descAr: '',
    category: 'fashion' as CategoryId,
    priceIqd: 120000,
    stock: 10,
    image: ASSET_IMAGES.fashionDressingRoom as string,
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsMessage, setSettingsMessage] = useState('');

  const BackArrow = t.dir === 'rtl' ? ArrowRight : ArrowLeft;

  const totalRevenue = useMemo(
    () =>
      orders
        .filter((o) => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.totalIqd, 0),
    [orders]
  );

  const lowStockCount = useMemo(
    () => products.filter((p) => p.stock <= 5).length,
    [products]
  );

  const customers = useMemo(() => {
    const map = new Map<
      string,
      { name: string; phone: string; city: string; count: number; spent: number }
    >();
    orders.forEach((o) => {
      const key = o.phone;
      const existing = map.get(key);
      if (existing) {
        existing.count += 1;
        existing.spent += o.totalIqd;
      } else {
        map.set(key, {
          name: o.customerName,
          phone: o.phone,
          city: o.city,
          count: 1,
          spent: o.totalIqd,
        });
      }
    });
    return Array.from(map.values());
  }, [orders]);

  const topProductStats = useMemo(() => {
    const map = new Map<
      string,
      { name: Product['name']; units: number; revenue: number }
    >();
    orders.forEach((o) => {
      if (o.status === 'cancelled') return;
      o.items.forEach((item) => {
        const current = map.get(item.productId);
        if (current) {
          current.units += item.quantity;
          current.revenue += item.priceIqd * item.quantity;
        } else {
          map.set(item.productId, {
            name: item.name,
            units: item.quantity,
            revenue: item.priceIqd * item.quantity,
          });
        }
      });
    });
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue);
  }, [orders]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(loginEmail, loginPassword);
    setLoginError(!ok);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormState({
      sku: `BSL-NEW-${100 + products.length}`,
      nameEn: '',
      nameCkb: '',
      nameAr: '',
      descEn: '',
      descCkb: '',
      descAr: '',
      category: 'fashion',
      priceIqd: 120000,
      stock: 10,
      image: ASSET_IMAGES.fashionDressingRoom,
    });
    setProductModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormState({
      sku: prod.sku,
      nameEn: prod.name.en,
      nameCkb: prod.name.ckb,
      nameAr: prod.name.ar,
      descEn: prod.shortDescription.en,
      descCkb: prod.shortDescription.ckb,
      descAr: prod.shortDescription.ar,
      category: prod.category,
      priceIqd: prod.priceIqd,
      stock: prod.stock,
      image: prod.image,
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      sku: formState.sku.trim() || `BSL-${Date.now()}`,
      name: {
        en: formState.nameEn.trim() || formState.nameCkb.trim() || 'Untitled Product',
        ckb: formState.nameCkb.trim() || formState.nameEn.trim() || 'بەرهەمی نوێ',
        ar: formState.nameAr.trim() || formState.nameEn.trim() || 'منتج جديد',
      },
      shortDescription: {
        en: formState.descEn.trim() || 'Curated BASLUNE piece.',
        ckb: formState.descCkb.trim() || 'بەرهەمی هەڵبژێردراوی باسلون.',
        ar: formState.descAr.trim() || 'قطعة مختارة من باسلون.',
      },
      description: {
        en: formState.descEn.trim() || 'Curated BASLUNE piece.',
        ckb: formState.descCkb.trim() || 'بەرهەمی هەڵبژێردراوی باسلون.',
        ar: formState.descAr.trim() || 'قطعة مختارة من باسلون.',
      },
      material: {
        en: 'Curated Studio Material',
        ckb: 'ماددەی هەڵبژێردراوی ستۆدیۆ',
        ar: 'خامات مختارة من الاستوديو',
      },
      category: formState.category,
      priceIqd: Math.max(1000, Number(formState.priceIqd) || 1000),
      stock: Math.max(0, Number(formState.stock) || 0),
      image: formState.image,
      colors: [
        {
          id: 'default',
          hex: '#39291F',
          name: { ckb: 'بنەڕەتی', ar: 'أساسي', en: 'Signature' },
        },
      ],
      isNewArrival: true,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    setProductModalOpen(false);
  };

  // Demo Login Gate
  if (!adminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F7F3EB] flex flex-col">
        <div className="bg-[#39291F] text-[#F7F3EB] text-xs py-2 px-4 text-center border-b border-[#C6A77B]/20">
          {t.admin.demoBanner}
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-[#39291F]/15 rounded-2xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1.5 text-xs text-[#25211D]/70 hover:text-[#25211D] cursor-pointer"
              >
                <BackArrow className="w-3.5 h-3.5" />
                <span>{t.admin.backToStore}</span>
              </button>

              <div className="flex gap-1">
                {(['ckb', 'ar', 'en'] as Language[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLanguage(l)}
                    className={`px-2 py-0.5 text-[11px] rounded cursor-pointer ${
                      language === l
                        ? 'bg-[#39291F] text-white'
                        : 'text-[#25211D]/70 hover:bg-[#E8DFD1]/60'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C6A77B]">
                BASLUNE Commerce · DEMO MODE
              </p>
              <h1 className="font-editorial text-2xl font-semibold text-[#25211D] mt-1">
                {t.admin.loginTitle}
              </h1>
              <p className="text-xs text-[#25211D]/65 mt-1">{t.admin.loginSubtitle}</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#25211D] mb-1">
                  {t.admin.emailLabel}
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@baslune.demo"
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm focus:outline-none focus:border-[#39291F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#25211D] mb-1">
                  {t.admin.passwordLabel}
                </label>
                <input
                  type="password"
                  dir="ltr"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm focus:outline-none focus:border-[#39291F]"
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-700">{t.admin.loginError}</p>
              )}

              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
                >
                  {t.admin.loginButton}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail('admin@baslune.demo');
                    setLoginPassword('baslune2026');
                    setLoginError(false);
                  }}
                  className="w-full py-2 border border-[#39291F]/20 text-[#39291F] text-xs font-medium rounded-md hover:bg-[#E8DFD1]/50 transition-colors cursor-pointer"
                >
                  {t.admin.demoFillButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const sidebarItems: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: t.admin.nav.overview, icon: LayoutDashboard },
    { id: 'products', label: t.admin.nav.products, icon: Package },
    { id: 'inventory', label: t.admin.nav.inventory, icon: Boxes },
    { id: 'orders', label: t.admin.nav.orders, icon: ShoppingCart },
    { id: 'customers', label: t.admin.nav.customers, icon: Users },
    { id: 'reports', label: t.admin.nav.reports, icon: BarChart3 },
    { id: 'settings', label: t.admin.nav.settings, icon: Settings },
  ];

  const orderStatusOptions: OrderStatus[] = [
    'pending',
    'confirmed',
    'preparing',
    'shipped',
    'delivered',
    'cancelled',
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EB] text-[#25211D] flex flex-col">
      {/* Persistent Demo Mode Top Banner */}
      <div className="bg-[#39291F] text-[#F7F3EB] text-xs py-2 px-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#C6A77B]/25">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-[#C6A77B] shrink-0" />
          <span className="font-medium">{t.admin.demoBanner}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {(['ckb', 'ar', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLanguage(l)}
                className={`px-2 py-0.5 text-[11px] rounded cursor-pointer ${
                  language === l
                    ? 'bg-[#C6A77B] text-[#25211D] font-semibold'
                    : 'text-[#E8DFD1] hover:bg-white/10'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-[#C6A77B] hover:text-white underline underline-offset-2 cursor-pointer"
          >
            {t.admin.backToStore}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-e border-[#39291F]/10 p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="px-2 pt-1">
              <p className="font-editorial text-xl font-semibold text-[#25211D]">
                BASLUNE Admin
              </p>
              <p className="text-[11px] text-[#C6A77B] font-semibold tracking-wider uppercase">
                DEMO MODE
              </p>
            </div>

            <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#39291F] text-[#F7F3EB]'
                        : 'text-[#25211D]/75 hover:bg-[#E8DFD1]/60 hover:text-[#25211D]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <button
            type="button"
            onClick={logoutAdmin}
            className="hidden lg:flex items-center gap-2 px-3 py-2.5 rounded-md text-xs font-medium text-[#25211D]/70 hover:bg-[#E8DFD1]/60 hover:text-[#25211D] transition-colors cursor-pointer mt-6"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.admin.logout}</span>
          </button>
        </aside>

        {/* Main Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full space-y-8 overflow-x-hidden">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#39291F]/10 rounded-xl p-5 space-y-1">
                  <p className="text-xs text-[#25211D]/60">{t.admin.kpi.totalRevenue}</p>
                  <p className="text-xl font-semibold text-[#39291F] tabular-nums">
                    {formatPriceIqd(totalRevenue, language)}
                  </p>
                </div>
                <div className="bg-white border border-[#39291F]/10 rounded-xl p-5 space-y-1">
                  <p className="text-xs text-[#25211D]/60">{t.admin.kpi.totalOrders}</p>
                  <p className="text-xl font-semibold text-[#25211D] tabular-nums">
                    {orders.length}
                  </p>
                </div>
                <div className="bg-white border border-[#39291F]/10 rounded-xl p-5 space-y-1">
                  <p className="text-xs text-[#25211D]/60">{t.admin.kpi.totalProducts}</p>
                  <p className="text-xl font-semibold text-[#25211D] tabular-nums">
                    {products.length}
                  </p>
                </div>
                <div className="bg-white border border-[#39291F]/10 rounded-xl p-5 space-y-1">
                  <p className="text-xs text-[#25211D]/60">{t.admin.kpi.lowStockAlerts}</p>
                  <p className="text-xl font-semibold text-amber-700 tabular-nums">
                    {lowStockCount}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white border border-[#39291F]/10 rounded-xl p-6 space-y-4">
                  <h2 className="text-base font-semibold text-[#25211D]">
                    {t.admin.overview.recentOrders}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-[#39291F]/10 text-[#25211D]/60 text-start">
                          <th className="py-2.5 text-start font-medium">{t.admin.overview.orderNumber}</th>
                          <th className="py-2.5 text-start font-medium">{t.admin.overview.customer}</th>
                          <th className="py-2.5 text-start font-medium">{t.admin.overview.date}</th>
                          <th className="py-2.5 text-end font-medium">{t.admin.overview.total}</th>
                          <th className="py-2.5 text-end font-medium">{t.admin.overview.status}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 6).map((ord) => (
                          <tr key={ord.id} className="border-b border-[#39291F]/8 last:border-0">
                            <td className="py-3 font-medium text-[#39291F] tabular-nums" dir="ltr">
                              {ord.orderNumber}
                            </td>
                            <td className="py-3">{ord.customerName}</td>
                            <td className="py-3 text-[#25211D]/65">
                              {formatDate(ord.createdAt, language)}
                            </td>
                            <td className="py-3 text-end tabular-nums font-medium">
                              {formatPriceIqd(ord.totalIqd, language)}
                            </td>
                            <td className="py-3 text-end text-xs font-medium text-[#39291F]">
                              {t.tracking.steps[ord.status]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white border border-[#39291F]/10 rounded-xl p-6 space-y-4">
                  <h2 className="text-base font-semibold text-[#25211D]">
                    {t.admin.overview.categoryBreakdown}
                  </h2>
                  <div className="space-y-3">
                    {CATEGORIES.map((cat) => {
                      const count = products.filter((p) => p.category === cat.id).length;
                      const pct = Math.round((count / Math.max(1, products.length)) * 100);
                      return (
                        <div key={cat.id} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium">{cat.name[language]}</span>
                            <span className="tabular-nums text-[#25211D]/65">
                              {count} ({pct}%)
                            </span>
                          </div>
                          <div className="h-2 bg-[#E8DFD1] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#39291F]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products CRUD */}
          {activeTab === 'products' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-xl font-semibold text-[#25211D]">
                  {t.admin.productsTab.title}
                </h1>
                <button
                  type="button"
                  onClick={openAddModal}
                  className="px-4 py-2 bg-[#39291F] text-[#F7F3EB] text-xs sm:text-sm font-medium rounded-md hover:bg-[#25211D] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.admin.productsTab.addProduct}</span>
                </button>
              </div>

              <div className="bg-white border border-[#39291F]/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#F7F3EB]/70 border-b border-[#39291F]/10 text-[#25211D]/65">
                        <th className="py-3 px-4 text-start font-medium">
                          {t.admin.productsTab.sku}
                        </th>
                        <th className="py-3 px-4 text-start font-medium">
                          {t.admin.productsTab.category}
                        </th>
                        <th className="py-3 px-4 text-end font-medium">
                          {t.admin.productsTab.priceIqd}
                        </th>
                        <th className="py-3 px-4 text-end font-medium">
                          {t.admin.productsTab.stock}
                        </th>
                        <th className="py-3 px-4 text-end font-medium">
                          {t.admin.productsTab.actions}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((prod) => {
                        const cat = CATEGORIES.find((c) => c.id === prod.category);
                        return (
                          <tr
                            key={prod.id}
                            className="border-b border-[#39291F]/8 last:border-0 hover:bg-[#F7F3EB]/40"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded overflow-hidden bg-[#E8DFD1] shrink-0">
                                  <SafeImage
                                    src={prod.image}
                                    alt={prod.name[language]}
                                    objectPosition={prod.imagePosition}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-[#25211D] truncate max-w-[220px]">
                                    {prod.name[language]}
                                  </p>
                                  <p className="text-[11px] text-[#25211D]/55" dir="ltr">
                                    {prod.sku}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-[#25211D]/75">
                              {cat?.name[language]}
                            </td>
                            <td className="py-3 px-4 text-end tabular-nums font-medium">
                              {formatPriceIqd(prod.priceIqd, language)}
                            </td>
                            <td className="py-3 px-4 text-end tabular-nums">
                              {prod.stock}
                            </td>
                            <td className="py-3 px-4 text-end">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => openEditModal(prod)}
                                  aria-label={t.admin.productsTab.edit}
                                  className="p-1.5 rounded border border-[#39291F]/15 hover:bg-[#E8DFD1] cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteProduct(prod.id)}
                                  aria-label={t.admin.productsTab.delete}
                                  className="p-1.5 rounded border border-[#39291F]/15 text-red-700 hover:bg-red-50 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Inventory */}
          {activeTab === 'inventory' && (
            <div className="space-y-5">
              <div>
                <h1 className="text-xl font-semibold text-[#25211D]">
                  {t.admin.inventoryTab.title}
                </h1>
                <p className="text-xs sm:text-sm text-[#25211D]/65 mt-1">
                  {t.admin.inventoryTab.subtitle}
                </p>
              </div>

              <div className="bg-white border border-[#39291F]/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#F7F3EB]/70 border-b border-[#39291F]/10 text-[#25211D]/65">
                        <th className="py-3 px-4 text-start font-medium">SKU</th>
                        <th className="py-3 px-4 text-start font-medium">
                          {t.admin.productsTab.nameEn}
                        </th>
                        <th className="py-3 px-4 text-start font-medium">
                          {t.admin.inventoryTab.status}
                        </th>
                        <th className="py-3 px-4 text-end font-medium">
                          {t.admin.inventoryTab.adjustStock}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((prod) => (
                        <tr key={prod.id} className="border-b border-[#39291F]/8 last:border-0">
                          <td className="py-3 px-4 text-xs text-[#25211D]/65" dir="ltr">
                            {prod.sku}
                          </td>
                          <td className="py-3 px-4 font-medium">{prod.name[language]}</td>
                          <td className="py-3 px-4 text-xs">
                            {prod.stockStatus === 'out_of_stock' ? (
                              <span className="text-red-700 font-medium">
                                {t.product.outOfStock}
                              </span>
                            ) : prod.stockStatus === 'low_stock' ? (
                              <span className="text-amber-700 font-medium">
                                {t.product.lowStock}
                              </span>
                            ) : (
                              <span className="text-emerald-800 font-medium">
                                {t.product.inStock}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-end">
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateProduct(prod.id, {
                                    stock: Math.max(0, prod.stock - 1),
                                  })
                                }
                                className="w-7 h-7 rounded border border-[#39291F]/20 hover:bg-[#E8DFD1] cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-8 text-center tabular-nums font-semibold">
                                {prod.stock}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateProduct(prod.id, { stock: prod.stock + 1 })
                                }
                                className="w-7 h-7 rounded border border-[#39291F]/20 hover:bg-[#E8DFD1] cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-5">
              <div>
                <h1 className="text-xl font-semibold text-[#25211D]">
                  {t.admin.ordersTab.title}
                </h1>
                <p className="text-xs sm:text-sm text-[#25211D]/65 mt-1">
                  {t.admin.ordersTab.subtitle}
                </p>
              </div>

              <div className="bg-white border border-[#39291F]/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#F7F3EB]/70 border-b border-[#39291F]/10 text-[#25211D]/65">
                        <th className="py-3 px-4 text-start font-medium">
                          {t.admin.overview.orderNumber}
                        </th>
                        <th className="py-3 px-4 text-start font-medium">
                          {t.admin.overview.customer}
                        </th>
                        <th className="py-3 px-4 text-start font-medium">
                          {t.admin.ordersTab.city}
                        </th>
                        <th className="py-3 px-4 text-end font-medium">
                          {t.admin.overview.total}
                        </th>
                        <th className="py-3 px-4 text-end font-medium">
                          {t.admin.ordersTab.updateStatus}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((ord) => (
                        <tr key={ord.id} className="border-b border-[#39291F]/8 last:border-0">
                          <td className="py-3 px-4 font-semibold text-[#39291F] tabular-nums" dir="ltr">
                            {ord.orderNumber}
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium">{ord.customerName}</p>
                            <p className="text-[11px] text-[#25211D]/60" dir="ltr">
                              {ord.phone}
                            </p>
                          </td>
                          <td className="py-3 px-4">{ord.city}</td>
                          <td className="py-3 px-4 text-end tabular-nums font-medium">
                            {formatPriceIqd(ord.totalIqd, language)}
                          </td>
                          <td className="py-3 px-4 text-end">
                            <select
                              value={ord.status}
                              onChange={(e) =>
                                updateOrderStatus(ord.id, e.target.value as OrderStatus)
                              }
                              className="px-2.5 py-1.5 bg-[#F7F3EB] border border-[#39291F]/20 rounded text-xs cursor-pointer"
                            >
                              {orderStatusOptions.map((st) => (
                                <option key={st} value={st}>
                                  {t.tracking.steps[st]}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Customers */}
          {activeTab === 'customers' && (
            <div className="space-y-5">
              <div>
                <h1 className="text-xl font-semibold text-[#25211D]">
                  {t.admin.customersTab.title}
                </h1>
                <p className="text-xs sm:text-sm text-[#25211D]/65 mt-1">
                  {t.admin.customersTab.subtitle}
                </p>
              </div>

              <div className="bg-white border border-[#39291F]/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#F7F3EB]/70 border-b border-[#39291F]/10 text-[#25211D]/65">
                        <th className="py-3 px-4 text-start font-medium">
                          {t.admin.customersTab.name}
                        </th>
                        <th className="py-3 px-4 text-start font-medium">
                          {t.admin.customersTab.phone}
                        </th>
                        <th className="py-3 px-4 text-start font-medium">
                          {t.admin.customersTab.city}
                        </th>
                        <th className="py-3 px-4 text-end font-medium">
                          {t.admin.customersTab.ordersCount}
                        </th>
                        <th className="py-3 px-4 text-end font-medium">
                          {t.admin.customersTab.totalSpent}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c) => (
                        <tr key={c.phone} className="border-b border-[#39291F]/8 last:border-0">
                          <td className="py-3 px-4 font-medium">{c.name}</td>
                          <td className="py-3 px-4 text-[#25211D]/75" dir="ltr">
                            {c.phone}
                          </td>
                          <td className="py-3 px-4">{c.city}</td>
                          <td className="py-3 px-4 text-end tabular-nums">{c.count}</td>
                          <td className="py-3 px-4 text-end tabular-nums font-semibold text-[#39291F]">
                            {formatPriceIqd(c.spent, language)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sales Reports */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-[#25211D]">
                  {t.admin.reportsTab.title}
                </h1>
                <p className="text-xs sm:text-sm text-[#25211D]/65 mt-1">
                  {t.admin.reportsTab.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-[#39291F]/10 rounded-xl p-5">
                  <p className="text-xs text-[#25211D]/60">
                    {t.admin.reportsTab.avgOrderValue}
                  </p>
                  <p className="text-xl font-semibold text-[#39291F] tabular-nums mt-1">
                    {formatPriceIqd(
                      orders.length ? totalRevenue / orders.length : 0,
                      language
                    )}
                  </p>
                </div>
                <div className="bg-white border border-[#39291F]/10 rounded-xl p-5">
                  <p className="text-xs text-[#25211D]/60">
                    {t.admin.reportsTab.deliveredOrders}
                  </p>
                  <p className="text-xl font-semibold text-[#25211D] tabular-nums mt-1">
                    {orders.filter((o) => o.status === 'delivered').length}
                  </p>
                </div>
                <div className="bg-white border border-[#39291F]/10 rounded-xl p-5">
                  <p className="text-xs text-[#25211D]/60">
                    {t.admin.reportsTab.codShare}
                  </p>
                  <p className="text-xl font-semibold text-[#25211D] tabular-nums mt-1">
                    {orders.length
                      ? `${Math.round(
                          (orders.filter((o) => o.paymentMethod === 'cod').length /
                            orders.length) *
                            100
                        )}%`
                      : '0%'}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#39291F]/10 rounded-xl p-6 space-y-4">
                <h2 className="text-base font-semibold text-[#25211D]">
                  {t.admin.reportsTab.topProducts}
                </h2>
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#39291F]/10 text-[#25211D]/60">
                      <th className="py-2 text-start font-medium">
                        {t.admin.productsTab.nameEn}
                      </th>
                      <th className="py-2 text-end font-medium">
                        {t.admin.reportsTab.unitsSold}
                      </th>
                      <th className="py-2 text-end font-medium">
                        {t.admin.reportsTab.revenue}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProductStats.map((row, i) => (
                      <tr key={i} className="border-b border-[#39291F]/8 last:border-0">
                        <td className="py-2.5 font-medium">{row.name[language]}</td>
                        <td className="py-2.5 text-end tabular-nums">{row.units}</td>
                        <td className="py-2.5 text-end tabular-nums font-semibold text-[#39291F]">
                          {formatPriceIqd(row.revenue, language)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Store Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="text-xl font-semibold text-[#25211D]">
                  {t.admin.settingsTab.title}
                </h1>
                <p className="text-xs sm:text-sm text-[#25211D]/65 mt-1">
                  {t.admin.settingsTab.subtitle}
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSettings(settingsForm);
                  setSettingsMessage(t.admin.settingsTab.savedMessage);
                }}
                className="bg-white border border-[#39291F]/10 rounded-xl p-6 space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {t.admin.settingsTab.storeName}
                  </label>
                  <input
                    type="text"
                    value={settingsForm.storeName}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, storeName: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      {t.admin.settingsTab.supportEmail}
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      value={settingsForm.supportEmail}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          supportEmail: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      {t.admin.settingsTab.supportPhone}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={settingsForm.supportPhone}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          supportPhone: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      {t.admin.settingsTab.freeShippingThreshold}
                    </label>
                    <input
                      type="number"
                      dir="ltr"
                      value={settingsForm.freeShippingThresholdIqd}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          freeShippingThresholdIqd: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3.5 py-2 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      {t.admin.settingsTab.standardShipping}
                    </label>
                    <input
                      type="number"
                      dir="ltr"
                      value={settingsForm.standardShippingFeeIqd}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          standardShippingFeeIqd: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3.5 py-2 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm tabular-nums"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2.5 text-sm pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.showAnnouncement}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        showAnnouncement: e.target.checked,
                      })
                    }
                    className="accent-[#39291F]"
                  />
                  <span>{t.admin.settingsTab.showAnnouncement}</span>
                </label>

                {settingsMessage && (
                  <p className="text-xs font-medium text-[#39291F] flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#C6A77B]" />
                    {settingsMessage}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] cursor-pointer"
                  >
                    {t.admin.settingsTab.saveSettings}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetDemoData();
                      setSettingsMessage(t.admin.settingsTab.resetDone);
                    }}
                    className="px-4 py-2 border border-[#39291F]/20 text-xs font-medium rounded-md hover:bg-[#E8DFD1]/60 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.admin.settingsTab.resetDemoData}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Product Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25211D]/50 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-xl border border-[#39291F]/15 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-[#39291F]/10 flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#25211D]">
                {editingProduct
                  ? t.admin.productsTab.editProduct
                  : t.admin.productsTab.addProduct}
              </h2>
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                className="p-1.5 rounded hover:bg-[#E8DFD1]/50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSaveProduct}
              className="p-6 overflow-y-auto space-y-4 text-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {t.admin.productsTab.nameCkb}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.nameCkb}
                    onChange={(e) =>
                      setFormState({ ...formState, nameCkb: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#39291F]/20 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {t.admin.productsTab.nameAr}
                  </label>
                  <input
                    type="text"
                    value={formState.nameAr}
                    onChange={(e) =>
                      setFormState({ ...formState, nameAr: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#39291F]/20 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {t.admin.productsTab.nameEn}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={formState.nameEn}
                    onChange={(e) =>
                      setFormState({ ...formState, nameEn: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#39291F]/20 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {t.admin.productsTab.descCkb}
                  </label>
                  <input
                    type="text"
                    value={formState.descCkb}
                    onChange={(e) =>
                      setFormState({ ...formState, descCkb: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#39291F]/20 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {t.admin.productsTab.descAr}
                  </label>
                  <input
                    type="text"
                    value={formState.descAr}
                    onChange={(e) =>
                      setFormState({ ...formState, descAr: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#39291F]/20 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {t.admin.productsTab.descEn}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={formState.descEn}
                    onChange={(e) =>
                      setFormState({ ...formState, descEn: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#39291F]/20 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {t.admin.productsTab.sku}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={formState.sku}
                    onChange={(e) =>
                      setFormState({ ...formState, sku: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#39291F]/20 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {t.admin.productsTab.category}
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        category: e.target.value as CategoryId,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#39291F]/20 rounded-md"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name[language]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {t.admin.productsTab.priceIqd}
                  </label>
                  <input
                    type="number"
                    dir="ltr"
                    min={1000}
                    value={formState.priceIqd}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        priceIqd: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#39291F]/20 rounded-md tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {t.admin.productsTab.stock}
                  </label>
                  <input
                    type="number"
                    dir="ltr"
                    min={0}
                    value={formState.stock}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        stock: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#39291F]/20 rounded-md tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2">
                  {t.admin.productsTab.imageAsset}
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {ASSET_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setFormState({ ...formState, image: opt.url })}
                      className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer ${
                        formState.image === opt.url
                          ? 'border-[#39291F]'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <SafeImage src={opt.url} alt={opt.key} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#39291F]/10">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 border border-[#39291F]/20 rounded-md text-xs font-medium cursor-pointer"
                >
                  {t.admin.productsTab.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#39291F] text-[#F7F3EB] rounded-md text-xs font-medium hover:bg-[#25211D] cursor-pointer"
                >
                  {t.admin.productsTab.saveProduct}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
