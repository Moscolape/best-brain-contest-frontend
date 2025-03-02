import PageWrapper from "../components/pageWrapper";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import initializeAOS from "../utils/aos-init";
import { landingPage } from "../constants/assets";


const texts = [
  "Preparing the Next Generation of Nigerian Leaders",
  "Empowering Minds, Shaping Future Leaders Through Education and Innovation",
  "Igniting Knowledge, Inspiring Excellence in Every Competition and Program",
  "Where Talent Meets Opportunity, Fueling Growth and Success For All",
];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    initializeAOS();

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageWrapper>
      <div className="relative sm:h-[30rem] h-[15rem] sm:mt-0 -mt-10 w-full flex flex-col items-center justify-center text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${landingPage})` }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          {/* Fixed Text */}
          <h1 className="text-2xl md:text-6xl font-Script mb-10 animate-fadeDown">
            Best Brain Contest
          </h1>

          {/* Sliding Text Animation */}
          <div className="overflow-hidden w-[90%] mx-auto">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                className="text-lg md:text-6xl font-Montserrat"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                {texts[index]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="my-10 w-[95%] mx-auto">Home</div>
    </PageWrapper>
  );
};

export default Home;
