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
    <div className="px-4 md:px-20 lg:px-30 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-[60px] text-primary mb-4">
          Our Ingredients
        </h1>
        <p className="font-paragraph text-[18px] text-tertiary mt-2">
          Discover the natural and effective ingredients we use to care for your skin.
        </p>
      </div>

      <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id}
            ref={(el) => setCardRef(el, index)}
            className="group relative h-60 w-full rounded-xl overflow-hidden shadow-lg opacity-0 -translate-x-6 transition-all duration-500 ease-out hover:shadow-xl"
            style={{
              transitionDelay: `${index * 150}ms`
            }}
          >
            {/* Background Image with 100% opacity */}
            <img
              src={Img}
              alt={ingredient.name}
              className="absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-300 group-hover:scale-105"
            />

            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col justify-end h-full bg-gradient-to-t from-black/70 to-transparent rounded-xl">
              <span className="text-lg text-green mb-2 font-paragraph">
                {ingredient.category}
              </span>
              <h2 className="text-white text-2xl font-headline">
                {ingredient.name}
              </h2>
              <p className="text-white text-lg mt-2 font-paragraph">
                {ingredient.works}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}