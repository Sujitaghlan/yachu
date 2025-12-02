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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-heading font-headline text-primary mb-4">
            Simple Gallery
          </h1>
          <p className="text-h1 font-paragraph text-tertiary">
            Beautiful photos with clean titles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image._id}
              ref={(el) => setCardRef(el, index)}
              className="group bg-white rounded-lg shadow-md overflow-hidden opacity-0 translate-y-6 transition-all duration-500 ease-out hover:shadow-lg"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.description}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="text-h1 font-headline text-primary text-center">
                  {image.description}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
