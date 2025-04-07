import React from "react";
import { Link } from "react-router-dom";
import { flier } from "../constants/assets";
import PageWrapper from "./pageWrapper";

const WeeklyQuizCompetition: React.FC = () => {
  return (
    <PageWrapper>
      <section
        className="font-Montserrat sm:my-30 px-4 sm:px-0"
      >
        <div className="sm:w-4/5 mx-auto flex flex-col sm:flex-row items-center justify-between gap-10" data-aos="fade-up">
          <img
            src={flier}
            alt="Weekly Quiz"
            className="sm:w-1/2 w-full rounded-lg object-cover"
          />

          <div className="sm:w-1/2 w-full flex flex-col justify-center items-start text-[#071125] space-y-4">
            <h2 className="text-2xl sm:text-3xl font-Urbanist font-bold">
              Join Our Weekly Quiz Competition!
            </h2>
            <p className="text-base sm:text-lg">
              Compete with brilliant minds across the country every week and
              stand a chance to win a cash prize of{" "}
              <b>ten thousand naira (#10,000)</b>, sharpen your skills, and gain
              national recognition.
            </p>
          </div>
        </div>

        <div className="sm:w-4/5 mx-auto mt-12 space-y-8 text-[#071125]">
          <div data-aos="fade-down">
            <h3 className="text-xl font-bold mb-2">📌 What’s It About?</h3>
            <p className="text-base leading-relaxed">
              The BBC Weekly Online Quiz is designed to promote healthy
              competition, critical thinking, and academic excellence among senior secondary school
              students across Nigeria. Each week features a new set of
              challenging, fun, and rewarding quiz questions.
            </p>
          </div>

          <div data-aos="fade-down">
            <h3 className="text-xl font-bold mb-2">⚙️ How It Works</h3>
            <ul className="list-disc ml-6 space-y-1 text-base">
              <li>Register anytime to join for the next quiz.</li>
              <li>
                Receive quiz details and guidelines via email or WhatsApp.
              </li>
              <li>Complete the quiz online within the given time frame.</li>
              <li>
                Top scorers will be announced on our platform and contacted.
              </li>
            </ul>
          </div>

          <div data-aos="fade-down">
            <h3 className="text-xl font-bold mb-2">🏆 Why You Should Join</h3>
            <ul className="list-disc ml-6 space-y-1 text-base">
              <li>Win an exciting cash prize weekly.</li>
              <li>Boost your academic confidence and problem-solving speed.</li>
              <li>Get recognized on a national stage.</li>
              <li>Prepare for school exams and competitions in a fun way!</li>
            </ul>
          </div>

          <div className="text-center mt-10" data-aos="fade-up">
            <Link to="/programs/bbc-weekly-online-quiz-registration-form">
              <button className="px-8 py-3 bg-[#071125] text-white text-lg hover:bg-[#ffcc2a] hover:text-[#071125] transition-all cursor-pointer rounded-md font-medium">
                Register Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default WeeklyQuizCompetition;
