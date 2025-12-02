import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ResultPage from "./ResultPage";
import CommentsAndReviews from "./CommentsAndReviews";
import AdditionalInfo from "./AdditionalInfo";
import RelatedProducts from "./RelatedProducts";

function ProductView() {
  const { state: productData } = useLocation();
  const navigate = useNavigate();

  if (!productData) {
    navigate("/"); 
    return null;
  }

  return (
    <div className="w-full">
      <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <ProductDetails productData={productData} />
      </div>

      <div className="mt-4 animate-slide-in-left" style={{ animationDelay: '200ms' }}>
        <ResultPage />
      </div>

      <div className="mt-4 animate-slide-in-right" style={{ animationDelay: '300ms' }}>
        <CommentsAndReviews />
      </div>

      <div className="mt-4 animate-fade-in-down" style={{ animationDelay: '400ms' }}>
        <RelatedProducts currentProduct={productData} />
      </div>

      <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <AdditionalInfo />
      </div>
    </div>
  );
}

export default ProductView;
