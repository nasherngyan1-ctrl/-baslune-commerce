import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { INITIAL_ORDERS, INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/catalog';
import { TRANSLATIONS, TranslationSchema } from '../i18n/translations';
import {
  CartItem,
  Language,
  Order,
  OrderStatus,
  PaymentMethod,
  Product,
  StoreSettings,
} from '../types/commerce';
import { computeStockStatus } from '../utils/format';

const STORAGE_KEYS = {
  LANG: 'baslune_lang_v1',
  PRODUCTS: 'baslune_products_v1',
  CART: 'baslune_cart_v1',
  WISHLIST: 'baslune_wishlist_v1',
  ORDERS: 'baslune_orders_v1',
  SETTINGS: 'baslune_settings_v1',
  ADMIN_AUTH: 'baslune_admin_auth_v1',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

interface ToastState {
  message: string;
  id: number;
}

export interface PlaceOrderInput {
  customerName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: PaymentMethod;
}

interface StoreContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
  currentPath: string;
  navigate: (path: string) => void;

  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'stockStatus' | 'rating' | 'reviewCount'>) => Product;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  cart: CartItem[];
  addToCart: (productId: string, quantity?: number, selectedColorId?: string, selectedSize?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedColorId?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedColorId?: string, selectedSize?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalIqd: number;
  shippingFeeIqd: number;
  cartTotalIqd: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  orders: Order[];
  placeDemoOrder: (input: PlaceOrderInput) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  settings: StoreSettings;
  updateSettings: (next: StoreSettings) => void;
  resetDemoData: () => void;

  adminAuthenticated: boolean;
  loginAdmin: (email: string, password: string) => boolean;
  logoutAdmin: () => void;

  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  announcementDismissed: boolean;
  dismissAnnouncement: () => void;

  toast: ToastState | null;
  showToast: (message: string) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() =>
    readStorage<Language>(STORAGE_KEYS.LANG, 'ckb')
  );
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');

  const [products, setProducts] = useState<Product[]>(() =>
    readStorage<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS)
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(STORAGE_KEYS.CART, [])
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.WISHLIST, [])
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    readStorage<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS)
  );
  const [settings, setSettings] = useState<StoreSettings>(() =>
    readStorage<StoreSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS)
  );
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(() =>
    readStorage<boolean>(STORAGE_KEYS.ADMIN_AUTH, false)
  );

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = t.dir;
    localStorage.setItem(STORAGE_KEYS.LANG, JSON.stringify(language));
  }, [language, t.dir]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(adminAuthenticated));
  }, [adminAuthenticated]);

  useEffect(() => {
    const handlePop = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const showToast = (message: string) => {
    const id = Date.now();
    setToast({ message, id });
    window.setTimeout(() => {
      setToast((prev) => (prev && prev.id === id ? null : prev));
    }, 3200);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (
    productId: string,
    quantity = 1,
    selectedColorId?: string,
    selectedSize?: string
  ) => {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock <= 0) return;

    const colorId = selectedColorId ?? product.colors[0]?.id;
    const size = selectedSize ?? product.sizes?.[0];

    setCart((prev) => {
      const idx = prev.findIndex(
        (item) =>
          item.productId === productId &&
          item.selectedColorId === colorId &&
          item.selectedSize === size
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: Math.min(product.stock, updated[idx].quantity + quantity),
        };
        return updated;
      }
      return [...prev, { productId, quantity: Math.min(product.stock, quantity), selectedColorId: colorId, selectedSize: size }];
    });

    showToast(`${product.name[language]} — ${t.product.addedToCart}`);
  };

  const updateCartQuantity = (
    productId: string,
    quantity: number,
    selectedColorId?: string,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColorId, selectedSize);
      return;
    }
    const product = products.find((p) => p.id === productId);
    const maxStock = product ? Math.max(1, product.stock) : 99;
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId &&
        item.selectedColorId === selectedColorId &&
        item.selectedSize === selectedSize
          ? { ...item, quantity: Math.min(maxStock, quantity) }
          : item
      )
    );
  };

  const removeFromCart = (
    productId: string,
    selectedColorId?: string,
    selectedSize?: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.selectedColorId === selectedColorId &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const cartSubtotalIqd = useMemo(() => {
    return cart.reduce((sum, item) => {
      const p = products.find((prod) => prod.id === item.productId);
      return sum + (p ? p.priceIqd * item.quantity : 0);
    }, 0);
  }, [cart, products]);

  const shippingFeeIqd = useMemo(() => {
    if (cartSubtotalIqd === 0) return 0;
    return cartSubtotalIqd >= settings.freeShippingThresholdIqd
      ? 0
      : settings.standardShippingFeeIqd;
  }, [cartSubtotalIqd, settings]);

  const cartTotalIqd = cartSubtotalIqd + shippingFeeIqd;

  /**
   * Backend Integration Point:
   * Replace this localStorage order creation with POST /api/orders when connecting
   * a production backend and verified payment provider.
   */
  const placeDemoOrder = (input: PlaceOrderInput): Order => {
    const nextSeq = 1045 + orders.length;
    const orderNumber = `BSL-2026-${nextSeq}`;
    const items = cart
      .map((item) => {
        const p = products.find((prod) => prod.id === item.productId);
        if (!p) return null;
        const color = p.colors.find((c) => c.id === item.selectedColorId)?.name;
        return {
          productId: p.id,
          name: p.name,
          image: p.image,
          priceIqd: p.priceIqd,
          quantity: item.quantity,
          selectedColor: color,
          selectedSize: item.selectedSize,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 2);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: input.customerName.trim(),
      phone: input.phone.trim(),
      city: input.city,
      address: input.address.trim(),
      notes: input.notes?.trim() || undefined,
      paymentMethod: input.paymentMethod,
      items,
      subtotalIqd: cartSubtotalIqd,
      shippingIqd: shippingFeeIqd,
      totalIqd: cartTotalIqd,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: estDate.toISOString().split('T')[0],
    };

    // Deduct stock locally in demo mode
    setProducts((prev) =>
      prev.map((prod) => {
        const ordered = cart
          .filter((c) => c.productId === prod.id)
          .reduce((s, c) => s + c.quantity, 0);
        if (!ordered) return prod;
        const nextStock = Math.max(0, prod.stock - ordered);
        return {
          ...prod,
          stock: nextStock,
          stockStatus: computeStockStatus(nextStock),
        };
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const addProduct = (
    input: Omit<Product, 'id' | 'createdAt' | 'stockStatus' | 'rating' | 'reviewCount'>
  ): Product => {
    const newProduct: Product = {
      ...input,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      stockStatus: computeStockStatus(input.stock),
      rating: 4.8,
      reviewCount: 1,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, patch: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== id) return prod;
        const merged = { ...prod, ...patch };
        if (typeof patch.stock === 'number') {
          merged.stockStatus = computeStockStatus(patch.stock);
        }
        return merged;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((c) => c.productId !== id));
    setWishlist((prev) => prev.filter((w) => w !== id));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const updateSettings = (next: StoreSettings) => {
    setSettings(next);
  };

  const resetDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setSettings(INITIAL_SETTINGS);
    setCart([]);
    setWishlist([]);
  };

  const loginAdmin = (email: string, password: string): boolean => {
    if (
      email.trim().toLowerCase() === 'admin@baslune.demo' &&
      password === 'baslune2026'
    ) {
      setAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminAuthenticated(false);
  };

  const dismissAnnouncement = () => setAnnouncementDismissed(true);

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentPath,
        navigate,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotalIqd,
        shippingFeeIqd,
        cartTotalIqd,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        placeDemoOrder,
        updateOrderStatus,
        settings,
        updateSettings,
        resetDemoData,
        adminAuthenticated,
        loginAdmin,
        logoutAdmin,
        cartDrawerOpen,
        setCartDrawerOpen,
        searchOpen,
        setSearchOpen,
        announcementDismissed,
        dismissAnnouncement,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return ctx;
}
