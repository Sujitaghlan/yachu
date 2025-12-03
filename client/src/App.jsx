import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import "./App.css";

// Public Components
import NavBar from "./component/NavBar";
import Cart from "./component/Cart";
import HomePage from "./component/HomePage";
import DiscountBanner from "./component/DiscountBanner";
import BestSellers from "./component/BestSellers";
import ShareCard from "./component/ShareCard";
import OurProducts from "./component/OurProducts";
import HowToUse from "./component/HowToUse";
import CommentsAndReviews from "./component/CommentsAndReviews";
import ContactUs from "./component/ContactUs";
import AdditionalInfo from "./component/AdditionalInfo";
import ProductView from "./component/ProductView";
import ProductDetails from "./component/ProductDetails";
import BillingForm from "./component/BillingForm";
import PaymentDetails from "./component/PaymentDetails";
import Ingredients from "./component/Ingredients";
import Gallery from "./component/Gallery";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Footer from "./component/Footer.jsx";

// Admin Components
import AddProducts from "./admin/component/AddProducts";
import AdProductForm from "./admin/component/AdProductForm";
import Dashboard from "./admin/component/Dashboard";
import AdminLayout from "./admin/layout/AdminLayout";
import ListProducts from "./admin/component/ListProducts";
import CategoryList from "./admin/component/CategoryList";
import OrderManagement from "./admin/component/OrderManagement";
import ViewOrder from "./admin/component/ViewOrder";
import AddCategory from "./admin/component/AddCategory";
import AdList from "./admin/component/AdList";
import GalleryList from "./admin/component/GalleryList";
import AddGallery from "./admin/component/AddImages";

import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import OrderHistory from "./component/OrderHistory.jsx";

// -------------------- PUBLIC LAYOUT --------------------
const PublicLayout = ({ onSearch }) => {
  const location = useLocation();
  const [isCartOpen, setCartOpen] = useState(false);

  const hideNav =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNav && (
        <NavBar onCartClick={() => setCartOpen(true)} onSearch={onSearch} />
      )}
      {!hideNav && isCartOpen && <Cart onClose={() => setCartOpen(false)} />}

      <main className="pt-20 pb-32 overflow-x-hidden">
        <div className="page-container">
          <Outlet />
        </div>
      </main>

      {!hideNav && <Footer />}
    </>
  );
};

// -------------------- APP COMPONENT --------------------
function App() {
  const [search, setSearch] = useState("");

  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* ---------- PUBLIC CLIENT SIDE ---------- */}
          <Route element={<PublicLayout onSearch={setSearch} />}>
            <Route
              path="/"
              element={
                <>
                  <div className="section">
                    <HomePage search={search} />
                  </div>

                  <div className="section">
                    <DiscountBanner />
                  </div>

                  <div className="section">
                    <BestSellers search={search} />
                  </div>

                  <div className="section">
                    <ShareCard />
                  </div>

                  <div className="section">
                    <OurProducts search={search} />
                  </div>

                  <div className="section">
                    <HowToUse />
                  </div>

                  <div className="section">
                    <CommentsAndReviews />
                  </div>

                  <div className="section">
                    <ContactUs />
                  </div>

                  <div className="section">
                    <AdditionalInfo />
                  </div>
                </>
              }
            />

            <Route path="/product-view" element={<ProductView />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/payment" element={<PaymentDetails />} />
            <Route path="/billing" element={<BillingForm />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/order-history" element={<OrderHistory />} />

          </Route>

          {/* ---------- AUTH ---------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ---------- ADMIN ONLY ---------- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="add-products" element={<AddProducts />} />
              <Route path="add-products/:id" element={<AddProducts />} />
              <Route path="ad-products" element={<AdProductForm />} />
              <Route path="list-products" element={<ListProducts />} />
              <Route path="category" element={<CategoryList />} />
              <Route path="order" element={<OrderManagement />} />
              <Route path="order/:id" element={<ViewOrder />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="ad-list" element={<AdList />} />
              <Route path="ad-form" element={<AdProductForm />} />
              <Route path="ad-form/:id" element={<AdProductForm />} />
              <Route path="list-gallery" element={<GalleryList />} />
              <Route path="add-images" element={<AddGallery />} />
              <Route path="add-images/:id" element={<AddGallery />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
