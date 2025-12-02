import React from "react";
import { HiHand, HiClock } from "react-icons/hi";
import { FaShower } from "react-icons/fa";
import HowToUseCard from "../utils/HowToUseCard";
import FactoryVideo from "../constant/FactoryVideo";

function HowToUse() {
  const cards = [
    {
      icon: HiHand,
      title: "Apply",
      textEN: "Massage oil into scalp twice a week for 15 minutes.",
      textNP: "यो तेल हप्तामा दुई पटक कपालमा १५ मिनेटसम्म मसाज गर्दै लगाउनुहोस्",
    },
    {
      icon: HiClock,
      title: "Wait",
      textEN: "Leave for 2-4 hours.",
      textNP: "२ देखि ४ घण्टाको लागि छोडिदिनुहोस्",
    },
    {
      icon: FaShower,
      title: "Wash",
      textEN: "Use Yachu Shampoo to wash your hair.",
      textNP: "आफ्नो कपाल पखाल्नको लागि यचु श्याम्पू प्रयोग गर्नुहोस्",
    },
  ];

  return (
    <div className="w-full py-10 bg-white">
      {/* Header */}
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto mb-8">
        <h1 className="text-heading font-headline font-bold text-black mb-0 text-center">
          How to Use
        </h1>
        <p className="font-headline text-h1 mb-8 text-tertiary text-center">
          प्रयोग विधि
        </p>
      </div>

      {/* Cards */}
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto mb-10">
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {cards.map((card, idx) => (
            <HowToUseCard
              key={idx}
              icon={card.icon}
              title={card.title}
              textEN={card.textEN}
              textNP={card.textNP}
            />
          ))}
        </div>
      </div>

      {/* Video */}
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto">
        <FactoryVideo videoId="BbU549WYbbI" />
      </div>
    </div>
  );
}

export default HowToUse;