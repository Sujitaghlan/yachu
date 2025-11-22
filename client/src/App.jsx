/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";
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

// Admin Components
import AddProducts from "./admin/component/AddProducts";
import AdProductForm from "./admin/component/AdProductForm";

// -------------------- Animated Section Wrapper --------------------
const AnimatedSection = ({ children, delay = 0 }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section opacity-0 translate-y-6 transition-all duration-500 ease-out"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
};

// -------------------- Public Layout --------------------
const Layout = () => {
  const location = useLocation();
  const [isCartOpen, setCartOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  // Hide navbar on login and signup
  const hideNav = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNav && <NavBar onCartClick={openCart} />}
      {!hideNav && isCartOpen && <Cart onClose={closeCart} />}

      <main className="pt-20 overflow-x-hidden">
        <Outlet />
      </main>
    </>
  );
};

// -------------------- Admin Layout --------------------
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <Outlet />
    </div>
  );
};

// -------------------- App Component --------------------
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>

          {/* ---------------- Public Pages Wrapped With Layout ---------------- */}
          <Route element={<Layout />}>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <AnimatedSection delay={0}><HomePage /></AnimatedSection>
                  <AnimatedSection delay={100}><DiscountBanner /></AnimatedSection>
                  <AnimatedSection delay={200}><BestSellers /></AnimatedSection>
                  <AnimatedSection delay={300}><ShareCard /></AnimatedSection>
                  <AnimatedSection delay={400}><OurProducts /></AnimatedSection>
                  <AnimatedSection delay={500}><HowToUse /></AnimatedSection>
                  <AnimatedSection delay={600}><CommentsAndReviews /></AnimatedSection>
                  <AnimatedSection delay={700}><ContactUs /></AnimatedSection>
                  <AnimatedSection delay={800}><AdditionalInfo /></AnimatedSection>
                </>
              }
            />

            {/* Other Public Routes */}
            <Route path="/product-view" element={<ProductView />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/payment" element={<PaymentDetails />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/billing" element={<BillingForm />} />
          </Route>

          {/* ---------------- Auth Pages (No Navbar) ---------------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ---------------- Admin Routes ---------------- */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="add-products" element={<AddProducts />} />
            <Route path="ad-products" element={<AdProductForm />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
