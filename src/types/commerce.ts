export type Language = 'ckb' | 'ar' | 'en';

export type CategoryId =
  | 'fashion'
  | 'electronics'
  | 'home'
  | 'beauty'
  | 'accessories';

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'cod' | 'bank_transfer';

export interface LocalizedText {
  ckb: string;
  ar: string;
  en: string;
}

export interface ColorVariant {
  id: string;
  hex: string;
  name: LocalizedText;
}

export interface Product {
  id: string;
  sku: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  material: LocalizedText;
  category: CategoryId;
  priceIqd: number;
  compareAtIqd?: number;
  image: string;
  imagePosition?: string;
  colors: ColorVariant[];
  sizes?: string[];
  stock: number;
  stockStatus: StockStatus;
  rating: number;
  reviewCount: number;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  createdAt: string;
}

export interface CategoryInfo {
  id: CategoryId;
  name: LocalizedText;
  subtitle: LocalizedText;
  image: string;
  imagePosition?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColorId?: string;
  selectedSize?: string;
}

export interface OrderItemSnapshot {
  productId: string;
  name: LocalizedText;
  image: string;
  priceIqd: number;
  quantity: number;
  selectedColor?: LocalizedText;
  selectedSize?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  items: OrderItemSnapshot[];
  subtotalIqd: number;
  shippingIqd: number;
  totalIqd: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
}

export interface StoreSettings {
  storeName: string;
  supportEmail: string;
  supportPhone: string;
  freeShippingThresholdIqd: number;
  standardShippingFeeIqd: number;
  showAnnouncement: boolean;
  cityHub: LocalizedText;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}
