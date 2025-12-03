import React from "react";
import Images1 from "../assets/saroj.jpg";
import Images2 from "../assets/sujan.jpg";

export default function ResultPage() {
  return (
    <div className="w-full py-10 bg-white">
      {/* Outer container with same padding as NavBar */}
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto">
        
        {/* Title */}
        <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-primary mb-8 md:mb-12 text-center">
          Results of Yachu Hair Oil
        </h2>

        {/* Image grid */}
        <div className="flex flex-col gap-8 md:gap-12 w-full md:grid md:grid-cols-2 mb-12 md:mb-16">
          {/* Image 1 */}
          <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-xl shadow-lg mx-auto">
            <img
              src={Images2}
              alt="result2"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Image 2 */}
          <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-xl shadow-lg mx-auto">
            <img
              src={Images1}
              alt="result1"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* How to Use */}
        <div className="mb-12 md:mb-16">
          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl text-primary mb-6 md:mb-8 text-center">
            How to Use
          </h2>

          <ul className="font-paragraph text-lg md:text-xl leading-relaxed md:leading-loose w-full max-w-3xl mx-auto text-tertiary space-y-3 md:space-y-4">
            <li><strong className="text-primary">Step 1:</strong> This oil needs to be applied twice a week.</li>
            <li><strong className="text-primary">Step 2:</strong> Massage your hair with the oil for 15 minutes.</li>
            <li><strong className="text-primary">Step 3:</strong> Wash your hair after 2–4 hours.</li>
            <li><strong className="text-primary">Step 4:</strong> Use mild shampoo to wash your hair.</li>
          </ul>
        </div>

        {/* Precautions */}
        <div className="mb-16 md:mb-20">
          <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl text-primary mb-6 md:mb-8 text-center">
            PRECAUTION
          </h2>

          <ul className="font-paragraph text-lg md:text-xl leading-relaxed md:leading-loose w-full max-w-3xl mx-auto text-tertiary space-y-3 md:space-y-4">
            <li><strong className="text-primary">Step 1:</strong> Keep it away from children.</li>
            <li><strong className="text-primary">Step 2:</strong> Do not use if irritation.</li>
            <li><strong className="text-primary">Step 3:</strong> Do not keep in freezer.</li>
            <li><strong className="text-primary">Step 4:</strong> Not for oral use.</li>
            <li><strong className="text-primary">Step 5:</strong> Do not accept if seal is broken.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}