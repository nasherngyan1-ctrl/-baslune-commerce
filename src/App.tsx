import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentPath } = useStore();
  const pathname = currentPath.split('?')[0] || '/';

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return (
      <>
        <AdminPage />
        <Toast />
      </>
    );
  }

  const renderPage = () => {
    if (pathname === '/') return <HomePage />;
    if (pathname === '/shop') return <ShopPage />;
    if (pathname.startsWith('/product/')) {
      const productId = pathname.replace('/product/', '').trim();
      return <ProductDetailPage productId={productId} />;
    }
    if (pathname === '/categories') return <CategoriesPage />;
    if (pathname === '/wishlist') return <WishlistPage />;
    if (pathname === '/cart') return <CartPage />;
    if (pathname === '/checkout') return <CheckoutPage />;
    if (pathname === '/about') return <AboutPage />;
    if (pathname === '/contact') return <ContactPage />;
    if (pathname === '/track-order') return <OrderTrackingPage />;
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EB] text-[#25211D]">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
