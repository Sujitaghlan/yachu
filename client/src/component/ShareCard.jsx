import { useState } from "react";
import { FiShare2 } from "react-icons/fi";

function ShareCard() {
  const [shares, setShares] = useState(0); 

  const handleShare = async () => {
    const shareData = {
      title: "Yachuuchit",
      text: "Check out this page!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShares(prev => prev + 1);
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
        setShares(prev => prev + 1);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    }
  };

  return (
    <div
      className="bg-white rounded-xl p-4 shadow-md flex flex-col justify-between
                 max-w-full mx-auto w-[90vw]
                 sm:w-[320px] sm:h-auto
                 lg:flex-row lg:items-center lg:justify-between lg:p-6 lg:w-[500px]"
    >
      {/* Top / Left content */}
      <div className="flex flex-col space-y-1 lg:flex-1">
        <p className="text-paragraph text-tertiary truncate font-paragraph text-left lg:text-lg">
          Share yachuuchit.np.com
        </p>
        <p className="text-paragraph text-secondary font-paragraph lg:text-base">
          with friends
        </p>
      </div>

      {/* Bottom / Right row for desktop */}
      <div className="flex items-center justify-start mt-4 gap-6 lg:mt-0 lg:ml-6">
         {/* Share count */}
        <div className="flex flex-col text-right leading-none">
          <span className="font-bold text-h2 font-headline lg:text-2xl">{shares}</span>
          <span className="text-paragraph text-tertiary font-paragraph lg:text-base">shares</span>
        </div>
        {/* Share button */}
        <button
          onClick={handleShare}
          className="bg-green w-12 h-10 rounded-lg flex items-center justify-center
                     shadow-md hover:brightness-90 transition flex-shrink-0 lg:w-16 lg:h-12"
          aria-label="Share"
        >
          <FiShare2 size={20} color="#000000" className="lg:text-2xl"/>
        </button>

       
      </div>
    </div>
  );
}

export default ShareCard;
