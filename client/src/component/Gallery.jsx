import React, { useEffect, useRef, useState } from "react";
import { getGalleryList } from "../api/galleryApi";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGalleryList();
        setGalleryImages(data.image || []);
      } catch (err) {
        console.error("Error loading gallery:", err);
      }
    };

    fetchGallery();
  }, []);

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

    cardRefs.current.forEach((card) => card && observer.observe(card));

    return () => observer.disconnect();
  }, [galleryImages]);

  const setCardRef = (el, index) => {
    cardRefs.current[index] = el;
  };

  return (
    <div className="w-full py-10 bg-gray-50">
      {/* Outer container with same padding as NavBar */}
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline text-primary mb-4">
            Simple Gallery
          </h1>
          <p className="text-lg md:text-xl font-paragraph text-tertiary max-w-2xl mx-auto">
            Beautiful photos with clean titles
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={image._id}
              ref={(el) => setCardRef(el, index)}
              className="group bg-white rounded-xl shadow-lg overflow-hidden opacity-0 translate-y-6 transition-all duration-500 ease-out hover:shadow-xl"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.description}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Description */}
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-headline text-primary text-center">
                  {image.description}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {galleryImages.length === 0 && (
          <div className="text-center py-16 md:py-20">
            <p className="text-xl md:text-2xl font-paragraph text-tertiary">
              No gallery images found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;