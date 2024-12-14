import React, { useEffect, useState } from "react";
import one from "../assets/1.png";
import two from "../assets/2.png";

import gif1 from "../assets/Grab your taste.gif";

function Couresel() {
  // State to track the active slide index
  const [activeIndex, setActiveIndex] = useState(0);

  // Array of image sources for the slides
  const slides = [gif1, one, two];

  // Function to handle next button click

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Function to handle previous button click
  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return ()=>clearInterval(interval);
  }, [activeIndex]);


  return (
    <div className="relative w-full mx-auto mt-3" style={{ width: "100%" }}>
      {/* Carousel wrapper */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute mt-8 inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-30 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/30 hover:bg-white/50 dark:bg-gray-800/30 dark:hover:bg-gray-800/60 rounded-full focus:outline-none"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="sr-only">Previous</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-30 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/30 hover:bg-white/50 dark:bg-gray-800/30 dark:hover:bg-gray-800/60 rounded-full focus:outline-none"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="sr-only">Next</span>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              index === activeIndex ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Couresel;
