import PageWrapper from "../components/pageWrapper";
import { useEffect, useState } from "react";
import initializeAOS from "../utils/aos-init";
import { Link } from "react-router-dom";

interface ProgramItem {
  title: string;
  details: string[];
}

interface ProgramSubcategory {
  title: string;
  items: ProgramItem[];
}

interface Program {
  title: string;
  subcategories: ProgramSubcategory[];
}

const programsData: Program[] = [
  {
    title: "Scholarships",
    subcategories: [
      {
        title: "De Imperial Philanthropic Family (DIPF)",
        items: [
          {
            title: "Scholarships Exam Registration",
            details: ["2025 DIPF Registration Form"],
          },
          {
            title: "Scholarship Beneficiaries",
            details: ["2023", "2024", "2025", "2026"].map(
              (year) => `${year} Scholarship Beneficiaries`
            ),
          },
          {
            title: "Pictures and Videos of DIPF Scholarship Programs",
            details: ["2023", "2024", "2025", "2026"].map(
              (year) => `${year} DIPF Programs`
            ),
          },
          {
            title: "About DIPF",
            details: [
              "De Imperial Philanthropic Family (DIPF) are philanthropists from Southeastern Nigeria focused on alleviating poverty through education.",
              "Their mission is to take 1,000 children off the streets and back to school.",
              "They support 250 JSS1 students annually for four years, covering school fees, WAEC, and secondary education.",
            ],
          },
        ],
      },
      {
        title: "Akpoazaa Foundation",
        items: [
          { title: "Scholarship Registration Form", details: [] },
          { title: "Scholarship Beneficiaries", details: [] },
          { title: "About Akpoazaa Foundation", details: [] },
        ],
      },
    ],
  },
  {
    title: "BBC Anambra State Mathematics and Igbo Quiz Competition",
    subcategories: [
      {
        title: "Editions",
        items: [
          ...[2021, 2022, 2023, 2024].map((year) => ({
            title: `${year} Edition`,
            details: ["Pictures and Videos with Explanatory Details"],
          })),
          {
            title: "2025 Edition",
            details: [
              "2025 BBC Quiz Registration Form",
              "2025 BBC Quiz Adverts",
              "BBC Education Icon Award Nominees",
              "Pictures and Videos of 2025 BBC Champions",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Anambra State Teachers Competition",
    subcategories: [
      {
        title: "Competition Details",
        items: [
          { title: "2025 ASTC Registration Form", details: [] },
          { title: "About The Competition", details: [] },
          { title: "Photos of the Champions", details: [] },
        ],
      },
    ],
  },
  {
    title: "SouthEast Teachers Competition",
    subcategories: [
      {
        title: "Competition Details",
        items: [
          { title: "2025 Teachers Registration Form", details: [] },
          { title: "About The Competition", details: [] },
          { title: "Photos of the Champions", details: [] },
        ],
      },
    ],
  },
];

const Programs = () => {
  useEffect(() => {
    initializeAOS();
  }, []);

  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <PageWrapper>
      <div className="container sm:w-4/5 mx-auto px-4 sm:py-8 font-Montserrat">
        <h1
          className="sm:text-3xl text-xl font-bold text-center mb-6"
          data-aos="fade-down"
        >
          Our Programs
        </h1>
        {programsData.map((program, index) => (
          <div key={index} className="mb-6">
            <h2 className="sm:text-2xl font-semibold mb-3" data-aos="fade-up">
              {program.title}
            </h2>
            {program.subcategories.map((sub, subIndex) => {
              const uniqueKey = `${index}-${subIndex}`;
              return (
                <div key={uniqueKey} className="border-b border-gray-300 mb-4">
                  <button
                    className="w-full text-left py-2 px-4 bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() => toggleAccordion(uniqueKey)}
                  >
                    <h3
                      className="sm:text-lg text-sm font-bold"
                      data-aos="fade-up"
                    >
                      {sub.title}
                    </h3>
                  </button>
                  {openIndex === uniqueKey && (
                    <div className="p-4 bg-gray-50">
                      {sub.items.map((item, itemIndex) => {
                        const isTeachers = item.title
                          .toLowerCase()
                          .includes("teachers");
                        const isAnambraTeachers = item.title
                          .toLowerCase()
                          .includes("astc");
                        const is2023Beneficiaries = item.details.map((det) =>
                          det
                            .toLowerCase()
                            .includes("2023 scholarship beneficiaries")
                        );
                        const is2024Beneficiaries = item.details.map((det) =>
                          det
                            .toLowerCase()
                            .includes("2024 scholarship beneficiaries")
                        );
                        return (
                          <div key={itemIndex} className="mb-3">
                            {isTeachers ? (
                              <Link to="/programs/2025-southeast-teachers-competition-registration-form">
                                <h4
                                  className="text-sm font-medium text-blue-600 underline cursor-pointer"
                                  data-aos="fade-up"
                                >
                                  {item.title}
                                </h4>
                              </Link>
                            ) : isAnambraTeachers ? (
                              <Link to="/programs/2025-anambra-state-teachers-competition-registration-form">
                                <h4
                                  className="text-sm font-medium text-blue-600 underline cursor-pointer"
                                  data-aos="fade-up"
                                >
                                  {item.title}
                                </h4>
                              </Link>
                            ) : (
                              <h4
                                className="text-sm font-bold"
                                data-aos="fade-up"
                              >
                                {item.title}
                              </h4>
                            )}
                            <ul className="pl-5">
                              {item.details.map((detail, detailIndex) => (
                                <li
                                  key={detailIndex}
                                  className="text-sm"
                                  data-aos="fade-up"
                                >
                                  {is2023Beneficiaries &&
                                  detail ===
                                    "2023 Scholarship Beneficiaries" ? (
                                    <Link
                                      to="/programs/2023-scholarship-beneficiaries"
                                      className="text-blue-600 underline"
                                    >
                                      {detail}
                                    </Link>
                                  ) : is2024Beneficiaries &&
                                    detail ===
                                      "2024 Scholarship Beneficiaries" ? (
                                    <Link
                                      to="/programs/2024-scholarship-beneficiaries"
                                      className="text-blue-600 underline"
                                    >
                                      {detail}
                                    </Link>
                                  ) : (
                                    detail
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default Programs;
