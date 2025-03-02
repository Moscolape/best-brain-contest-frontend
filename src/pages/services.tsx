import PageWrapper from "../components/pageWrapper";
import { useEffect } from "react";
import initializeAOS from "../utils/aos-init";
import {
//   services,
  undrawDebate,
  undrawQuiz,
  undrawScholarship,
  undrawSeminar,
  undrawSkills,
  undrawSpelling,
} from "../constants/assets";

const Services = () => {
  useEffect(() => {
    initializeAOS();
  }, []);

  const ourServices = [
    {
      pic: undrawQuiz,
      title: "Quiz Competition",
      text: "Best Brain Contest Quiz Competition promotes knowledge, critical thinking, healthy competition, and rewards intellectual excellence among participants.",
    },
    {
      pic: undrawScholarship,
      title: "Scholarship Examination",
      text: "Best Brain Contest Scholarship Examination evaluates academic excellence, offering opportunities, recognition, and financial support to students.",
    },
    {
      pic: undrawDebate,
      title: "Debate",
      text: "Best Brain Contest Debate fosters critical thinking, public speaking, logical reasoning, and intellectual engagement among participants.",
    },
    {
      pic: undrawSpelling,
      title: "Spelling Bee",
      text: "Best Brain Contest Spelling Bee enhances vocabulary, spelling skills, confidence, and academic excellence among participants.",
    },
    {
      pic: undrawSeminar,
      title: "Seminar",
      text: "Best Brain Contest Seminar promotes knowledge sharing, skill development, and intellectual growth through interactive and insightful discussions.",
    },
    {
      pic: undrawSkills,
      title: "Skill Acquisition Training",
      text: "Best Brain Contest Skill Acquisition Training empowers participants with practical skills, fostering personal growth and professional development.",
    },
  ];

  return (
    <PageWrapper>
      {/* <div className="relative sm:h-[30rem] h-[15rem] sm:mt-0 -mt-10 w-full flex flex-col items-center justify-center text-white"> */}
        {/* Background Image */}
        {/* <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${services})` }}
        ></div> */}

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
      {/* </div> */}
      <div className="w-[90%] mx-auto sm:my-40">
        <h1
          className="text-[#071125] text-5xl text-center font-semibold font-Script"
          data-aos="flip-up"
        >
          What We Offer
        </h1>
        <div className="sm:grid grid-cols-3 gap-20 flex flex-col font-DM-Sans mt-20">
          {ourServices.map((service, index) => {
            return (
              <div
                className="flex flex-col justify-center items-center"
                data-aos={`${index % 2 == 0 ? "fade-up" : "fade-down"}`}
                key={index}
              >
                <img src={service.pic} alt="undraw" className="w-30 h-30" />
                <h1 className="text-2xl font-bold font-Montserrat my-5">
                  {service.title}
                </h1>
                <p className="text-center text-gray-500">{service.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Services;
