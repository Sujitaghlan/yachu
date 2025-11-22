import React from "react";

function FactoryVideo({ videoId }) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md">
      <iframe
        className="w-full aspect-video md:h-[500px]"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1&controls=0&modestbranding=1`}
        title="How to Use Tutorial"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default FactoryVideo;
