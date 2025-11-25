import React from "react";
import ProductCard from "../utils/ProductCard";
import productImg from "../assets/oil.png";  

function RelatedProducts({ currentProduct }) {
  const products = [
    { id: 1, title: "Dandruff Case", description: "...", size: "250ml", price: "Rs. 2,500" },
    { id: 2, title: "Baldness Case", description: "...", size: "250ml", price: "Rs. 2,500" },
    { id: 3, title: "Hair Growth Oil", description: "...", size: "100ml", price: "Rs. 1,800" },
    { id: 4, title: "Anti-Hairfall Shampoo", description: "...", size: "200ml", price: "Rs. 1,200" },
    { id: 5, title: "Conditioner", description: "...", size: "150ml", price: "Rs. 900" }
  ];

  const filteredProducts = products.filter(p => p.title !== currentProduct.title);

  return (
    <div className="w-full py-6 bg-white">
      <h2 className="text-heading font-headline text-center mb-4">
        Related Products
      </h2>
      <div className="px-4 md:pl-20 md:pr-12 pb-3">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              size={item.size}
              price={item.price}
              productImg={productImg}   
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedProducts;
