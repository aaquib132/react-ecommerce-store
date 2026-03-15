import { Suspense, lazy } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const ProductListing = lazy(() => import("./pages/ProductListing"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Cart = lazy(() => import("./pages/Cart"));
const ShippingPage = lazy(() => import("./pages/ShippingPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const OrderConfirm = lazy(() => import("./pages/OrderConfirm"));
const ProfilePage = lazy(() => import("./pages/Profile"));

const FallbackLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50">
    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
  </div>
);

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar/>
        <ScrollToTop />
        <main className="flex-grow">
          <Suspense fallback={<FallbackLoader />}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="products" element={<ProductListing/>} />
              <Route path="/products/:id" element={<ProductDetail/>} />
              <Route path="/wishlist" element={<Wishlist/>} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/confirmation" element={<OrderConfirm />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
