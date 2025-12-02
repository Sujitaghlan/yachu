import React, { useEffect, useRef } from "react";
import Img from "../assets/image.png";

const ingredients = [
  {
    id: 1,
    name: "Aloe Vera",
    category: "Soothing",
    works: "Soothes and moisturizes skin",
    image: "https://images.unsplash.com/photo-1612831455543-5c50e6ef8f2b",
  },
  {
    id: 2,
    name: "Vitamin C",
    category: "Brightening",
    works: "Brightens skin and reduces dark spots",
    image: "https://images.unsplash.com/photo-1600180758890-4d4f6b1d24e6",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Antioxidant",
    works: "Antioxidant and reduces inflammation",
    image: "https://images.unsplash.com/photo-1592928303187-b1bb6f6d4f1e",
  },
  {
    id: 4,
    name: "Hyaluronic Acid",
    category: "Hydration",
    works: "Deeply hydrates and plumps skin",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
  },
  {
    id: 5,
    name: "Retinol",
    category: "Anti-aging",
    works: "Reduces fine lines and wrinkles",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
  },
  {
    id: 6,
    name: "Niacinamide",
    category: "Repair",
    works: "Strengthens skin barrier and reduces redness",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908",
  },
];

export default function Ingredients() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-x-0");
            entry.target.classList.remove("opacity-0", "-translate-x-6");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const setCardRef = (el, index) => {
    cardRefs.current[index] = el;
  };

  return (
    <div className="w-full py-12 bg-white">
      {/* Outer container with same padding as NavBar */}
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary mb-4 md:mb-6">
            Our Ingredients
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-tertiary mt-2 max-w-2xl mx-auto">
            Discover the natural and effective ingredients we use to care for your skin.
          </p>
        </div>

        {/* Ingredients List */}
        <div className="flex flex-col space-y-8 md:space-y-10 max-w-4xl mx-auto">
          {ingredients.map((ingredient, index) => (
            <div
              key={ingredient.id}
              ref={(el) => setCardRef(el, index)}
              className="group relative h-64 md:h-72 w-full rounded-xl overflow-hidden shadow-lg opacity-0 -translate-x-6 transition-all duration-500 ease-out hover:shadow-xl"
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Background Image */}
              <img
                src={Img}
                alt={ingredient.name}
                className="absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-300 group-hover:scale-110"
              />

              {/* Content Overlay */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-xl">
                <span className="text-lg md:text-xl text-green mb-2 md:mb-3 font-paragraph">
                  {ingredient.category}
                </span>
                <h2 className="text-white text-2xl md:text-3xl font-headline mb-2">
                  {ingredient.name}
                </h2>
                <p className="text-white text-base md:text-lg font-paragraph opacity-90">
                  {ingredient.works}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-200 max-w-4xl mx-auto">
          <p className="font-paragraph text-lg md:text-xl text-tertiary text-center">
            All ingredients are carefully selected and tested for maximum effectiveness and safety.
          </p>
        </div>
      </div>
    </div>
  );
}