import React from "react";
import Images1 from "../assets/saroj.jpg";
import Images2 from "../assets/sujan.jpg";

export default function ResultPage() {
  return (
    <div className="w-full flex flex-col items-center bg-white text-black px-4 py-4 md:px-10 md:py-8 md:max-w-5xl md:mx-auto">

      {/* Title */}
      <h2 className="font-headline text-h2 text-primary mb-6 md:mb-10 text-center">
        Results of Yachu Hair Oil
      </h2>

      {/* Image grid */}
      <div className="flex flex-col gap-10 w-full max-w-md md:max-w-full md:grid md:grid-cols-2 md:gap-12">
        {/* Image 1 */}
        <div className="w-[360px] h-[200px] md:w-full md:h-[300px] overflow-hidden rounded-lg shadow-md mx-auto">
          <img
            src={Images2}
            alt="result2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 2 */}
        <div className="w-[360px] h-[220px] md:w-full md:h-[300px] overflow-hidden rounded-lg shadow-md mx-auto">
          <img
            src={Images1}
            alt="result1"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* How to Use */}
      <h2 className="font-headline text-h1 mt-10 md:mt-14 mb-4 md:mb-6 text-center">
        How to Use
      </h2>

      <ul className="font-paragraph text-h2 leading-7 w-full max-w-md md:max-w-3xl text-left ml-4 md:ml-0 text-tertiary">
        <li><strong>Step 1:</strong> This oil needs to be applied twice a week.</li>
        <li><strong>Step 2:</strong> Massage your hair with the oil for 15 minutes.</li>
        <li><strong>Step 3:</strong> Wash your hair after 2–4 hours.</li>
        <li><strong>Step 4:</strong> Use mild shampoo to wash your hair.</li>
      </ul>

      {/* Precautions */}
      <h2 className="font-headline text-h1 mt-10 md:mt-14 mb-4 md:mb-6 text-center">
        PRECAUTION
      </h2>

      <ul className="font-paragraph text-h2 leading-7 mb-16 w-full max-w-md md:max-w-3xl text-left ml-4 md:ml-0 text-tertiary">
        <li><strong>Step 1:</strong> Keep it away from children.</li>
        <li><strong>Step 2:</strong> Do not use if irritation.</li>
        <li><strong>Step 3:</strong> Do not keep in freezer.</li>
        <li><strong>Step 4:</strong> Not for oral use.</li>
        <li><strong>Step 5:</strong> Do not accept if seal is broken.</li>
      </ul>
    </div>
  );
}
