import ProductCard from "../utils/ProductCard";
import productImg from "../assets/oil.png";  

function BestSellers() {
  const products = [
    {
      id: 1,
      title: "Dandruff Case",
      description: "यसले प्रयोगले कपालबाट चिलाउने हटाउँछ र कपाल झर्ने रोकिँदै नयाँ कपाल उम्रिन्छ",
      size: "250ml",
      price: "Rs. 2,500",
    },
    {
      id: 2,
      title: "Baldness Case",
      description: "यसले प्रयोगले नयाँ कपाल उम्रन मद्दत गर्छ",
      size: "250ml",
      price: "Rs. 2,500",
    },
    {
      id: 3,
      title: "Hair Growth Oil",
      description: "कपालको स्वास्थ्य बढाउने तेल",
      size: "100ml",
      price: "Rs. 1,800",
    },
    {
      id: 4,
      title: "Anti-Hairfall Shampoo",
      description: "कपाल झर्ने कम गर्नको लागि श्याम्पू",
      size: "200ml",
      price: "Rs. 1,200",
    },
    {
      id: 5,
      title: "Conditioner",
      description: "कपाललाई नरम र चमकदार बनाउने कन्डिसनर",
      size: "150ml",
      price: "Rs. 900",
    }
  ];

  return (
    <div className="w-full py-6 bg-white">
      <h2 className="text-heading font-headline text-center mb-4">
        Best Sellers
      </h2>

      <div className="px-4 md:pl-20 md:pr-12 pb-3">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {products.map((item) => (
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

export default BestSellers;
