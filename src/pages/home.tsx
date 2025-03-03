import PageWrapper from "../components/pageWrapper";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import initializeAOS from "../utils/aos-init";
import {
  bestlanding,
  CEO,
  flier1,
  flier2,
  flier3,
  guest1,
  guest2,
  guest3,
  guest4,
  guest5,
  guest6,
  guest7,
  landingPage,
  landingPage2,
  landingPage3,
  landingPage4,
  school1,
  school2,
  school3,
  school4,
  school5,
  school6,
  school7,
  school8,
  school9,
  winner1,
  winner2,
  winner3,
  winner4,
  winner5,
  winner6,
} from "../constants/assets";
import { Link } from "react-router-dom";
import ImageSlider from "../components/imageSlider";

const texts = [
  "Preparing the Next Generation of Nigerian Leaders",
  "Empowering Minds, Shaping Future Leaders Through Education and Innovation",
  "Igniting Knowledge, Inspiring Excellence in Every Competition and Program",
  "Where Talent Meets Opportunity, Fueling Growth and Success For All",
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  const backgroundImages = [
    landingPage,
    landingPage2,
    landingPage3,
    landingPage4,
  ];
  const slider1 = [flier1, flier2, flier3];
  const slider2 = [guest1, guest2, guest3, guest4, guest5, guest6, guest7];
  const slider3 = [
    school1,
    school2,
    school3,
    school4,
    school5,
    school6,
    school7,
    school8,
    school9,
  ];
  const slider4 = [winner1, winner2, winner3, winner4, winner5, winner6];

  useEffect(() => {
    initializeAOS();

    // Text sliding interval
    const textInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 8000);

    // Background image slider interval
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);

    return () => {
      clearInterval(textInterval);
      clearInterval(bgInterval);
    };
  }, [backgroundImages.length]);

  return (
    <PageWrapper>
      <div className="relative sm:h-[30rem] h-[20rem] sm:mt-0 -mt-10 w-full flex flex-col items-center justify-center text-white">
        {/* Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

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
                initial={{ x: "-100%", opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                {texts[index]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="my-10">
        <h1
          className="text-[#071125] sm:text-5xl text-2xl text-center font-semibold font-Prism"
          data-aos="fade-down"
        >
          Welcome to our Official Website
        </h1>
        <img
          src={bestlanding}
          alt=""
          className="w-[80%] mx-auto"
          data-aos="fade-up"
        />
      </div>
      <div className="font-Montserrat sm:w-4/5 mx-auto p-2" data-aos="fade-up">
        <p>
          <span className="text-[#071125] font-bold">Best Brain Contest</span>{" "}
          is a non-governmental educational organization dedicated to empowering
          students through a variety of educational initiatives, including
          scholarship programs, quiz competitions, spelling bees, and more. Our
          mission is to make quality education accessible to all, nurturing the
          minds of future leaders and innovators.{" "}
          <Link to={"/about"}>
            <span className="font-bold text-[#ffcc2a]">Read more...</span>
          </Link>
        </p>
      </div>
      <div className="relative sm:h-[30rem] h-[15rem] my-20 w-full flex flex-col items-center justify-center text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${CEO})` }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#040914] opacity-70"></div>

        {/* Content */}
        <div
          className="relative z-10 text-center px-6 sm:w-3/5"
          data-aos="fade-up"
        >
          {/* Fixed Text */}
          <h1 className="text-2xl md:text-6xl font-Montserrat mb-10 animate-fadeDown">
            "Excellence is not an act but a habit, and at Best Brain Contest, we
            make it a way of life."
          </h1>
          <p className="sm:text-xl text-sm">Dr. Frank Odinaka Igbojindu</p>
        </div>
      </div>
      <div className="font-Montserrat sm:w-4/5 mx-auto p-2" data-aos="fade-up">
        <h1 className="sm:text-5xl text-2xl font-Urbanist font-bold text-center">
          Maiden Competition of Anambra State Mathematics & Igbo Quiz
          Competition 2021
        </h1>
        {/* Image Slider */}
        <ImageSlider images={slider1} title="Participants in the competition" />
        <ImageSlider
          images={slider2}
          title="Officiating committee members of the competition"
        />
        <ImageSlider
          images={slider3}
          title="Photos of some School Representatives"
        />
        <ImageSlider
          images={slider4}
          title="Photos of some Competition Winners and Beneficiaries"
        />
      </div>
      <div
        className="font-Montserrat sm:w-1/3 mx-auto flex flex-col justify-center items-center sm:text-center mt-10"
        data-aos="fade-up"
      >
        <h1 className="sm:text-5xl text-2xl font-Urbanist font-bold sm:mb-5 p-2">
          Get In Touch For Enquiries, Support or Collaborations
        </h1>
        <p className="font-Montserrat mb-5 p-2">
          Whether you have questions, need assistance, or want to collaborate,
          we’re here for you. Together, let’s inspire brilliance!
        </p>
        <Link to={"/contact"}>
          <button className="px-6 py-3 bg-[#071125] text-white hover:bg-[#ffcc2a] hover:text-[#071125] hover:font-medium cursor-pointer">
            Contact Us
          </button>
        </Link>
      </div>
    </PageWrapper>
  );
};

export default Home;
