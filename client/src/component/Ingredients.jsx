import React, { useEffect, useRef } from "react";
import { hairCareIngredients, ingredientImages } from "../constant/hairCareIngredients";

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
      { threshold: 0.1 }
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
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary mb-4 md:mb-6">
            Our Ingredients
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-tertiary mt-2 max-w-2xl mx-auto">
            Discover the natural and effective ingredients we use to care for your hair.
          </p>
        </div>

        {/* Ingredients List */}
        <div className="flex flex-col space-y-8 md:space-y-10 max-w-6xl mx-auto w-full">
          {hairCareIngredients.map((ingredient, index) => (
            <div
              key={index}
              ref={(el) => setCardRef(el, index)}
              className="group relative h-48 md:h-56 lg:h-64 w-full rounded-xl overflow-hidden shadow-lg opacity-0 -translate-x-6 transition-all duration-500 ease-out hover:shadow-xl"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Background Image */}
              <img
                src={ingredientImages[ingredient.image]}
                alt={ingredient.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Content Overlay */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-xl">
                <h2 className="text-white text-2xl md:text-3xl font-headline mb-2">
                  {ingredient.name}
                </h2>
                <p className="text-white text-base md:text-lg font-paragraph opacity-90">
                  {ingredient.description}
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
