import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface SliderProps {
  images: string[];
  interval?: number;
  title?: string;
}

const ImageSlider: React.FC<SliderProps> = ({ images, interval = 3000, title }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(imageInterval);
  }, [images.length, interval]);

  const prevSlide = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative sm:w-4/5 w-full mx-auto my-10 overflow-hidden" data-aos="fade-up">
      <div className="relative flex items-center justify-center">
        <button
          className="absolute cursor-pointer left-2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10"
          onClick={prevSlide}
        >
          <FaArrowLeft size={20} />
        </button>

        <img
          src={images[imageIndex]}
          alt={`Slide ${imageIndex + 1}`}
          className="w-full sm:h-[30rem] h-[20rem] rounded-lg shadow-lg"
        />

        <button
          className="absolute cursor-pointer right-2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10"
          onClick={nextSlide}
        >
          <FaArrowRight size={20} />
        </button>
      </div>
      {title && <p className="font-Montserrat mt-5 text-center">{title}</p>}
    </div>
  );
};

export default ImageSlider;