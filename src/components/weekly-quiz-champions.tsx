import React from "react";
import PageWrapper from "./pageWrapper";
import { champ1, champ2, champ6 } from "../constants/assets";

const champions = [
  {
    week: "Week 1 (2025-04-12)",
    name: "Christopher Johnpaul",
    school: "College of Immaculate Conception",
    gender: "Male",
    class: "SS3",
    score: 10,
    timeCompleted: "4m 21s",
    location: "Enugu South, Ogui, Enugu",
    image: champ1,
  },
  {
    week: "Week 2 (2025-04-19)",
    name: "Rebecca Ajayi",
    school: "Iba Housing Estate Secondary School ",
    gender: "Female",
    class: "SS2",
    score: 10,
    timeCompleted: "1m 58s",
    location: "Ojo, Iba, Lagos",
    image: champ2,
  },
  {
    week: "Week 3 (2025-04-26)",
    name: "Aji Samuel Terfan",
    school: "SamJosh Best Brains International Academy Makurdi ",
    phone: "07076656018",
    gender: "Male",
    class: "SS2",
    score: 10,
    timeCompleted: "2m 03s",
    location: "Ushongo, Makurdi, Benue",
  },
  {
    week: "Week 4 (2025-05-03)",
    name: "Salaudeen Abdulkabir",
    school: "Command Day Secondary school ",
    phone: "07039799592",
    gender: "Male",
    class: "SS3",
    score: 10,
    timeCompleted: "2m 38s",
    location: "Ojo, Ojo, Lagos",
  },
  {
    week: "Week 5 (2025-05-10)",
    name: "Salaudeen Abdulkabir",
    school: "Command Day Secondary school ",
    phone: "07039799592",
    gender: "Male",
    class: "SS3",
    score: 10,
    timeCompleted: "1m 57s",
    location: "Ojo, Ojo, Lagos",
  },
  {
    week: "Week 6 (2025-05-17)",
    name: "Christopher Johnpaul",
    school: "College of Immaculate Conception",
    gender: "Male",
    class: "SS3",
    score: 10,
    timeCompleted: "2m 27s",
    location: "Enugu South, Ogui, Enugu",
    image: champ6,
  },
];

const WeeklyQuizChampions: React.FC = () => {
  return (
    <PageWrapper>
      <section className="font-Montserrat sm:my-30 px-4 sm:px-10">
        <h2 className="sm:text-3xl text-2xl font-bold text-center mb-10 text-gray-800">
          Weekly Quiz Champions
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {champions.map((champion, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden p-5 transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-5">
                <img
                  src={champion.image}
                  alt={champion.name}
                  className="sm:w-48 sm:h-48 h-24 w-24 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold">{champion.week}</h3>
                  <p className="text-lg text-gray-600 my-1 font-bold">
                    {champion.name}
                  </p>
                  <p className="text-sm text-gray-500">{champion.school}</p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-700">
                <p className="mb-1">
                  <span className="font-semibold">Location:</span>{" "}
                  {champion.location}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Class:</span> {champion.class}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Gender:</span>{" "}
                  {champion.gender}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Score:</span> {champion.score}
                  /10
                </p>
                <p>
                  <span className="font-semibold">Time Completed:</span>{" "}
                  {champion.timeCompleted}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default WeeklyQuizChampions;
