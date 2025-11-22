/* eslint-disable no-unused-vars */
import React from "react";

function HowToUseCard({ icon: Icon, title, textEN, textNP }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center md:items-center">
      <Icon className="text-green text-4xl mb-2" />
      <strong className="text-h2 font-headline mb-1">{title}</strong>
      <p className="text-paragraph font-paragraph text-tertiary text-center mb-1">
        {textEN}
      </p>
      <p className="text-paragraph font-paragraph text-tertiary text-center">
        {textNP}
      </p>
    </div>
  );
}

export default HowToUseCard;
