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
  {
    title: "BBC Weekly Online Quiz",
    subcategories: [
      {
        title: "Quiz Details",
        items: [
          { title: "Weekly Quiz Registration Form", details: [] },
          { title: "About The Quiz", details: [] },
          { title: "Photos of our Champions", details: [] },
        ],
      },
    ],
  }
];

interface ProgramAccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const ProgramAccordion: React.FC<ProgramAccordionProps> = ({
  title,
  isOpen,
  onToggle,
  children,
}) => (
  <div className="border-b border-gray-300 mb-4">
    <button
      className="w-full text-left py-2 px-4 bg-gray-100 hover:bg-gray-200 transition"
      onClick={onToggle}
    >
      <h3 className="sm:text-lg text-sm font-bold" data-aos="fade-up">
        {title}
      </h3>
    </button>
    {isOpen && <div className="p-4 bg-gray-50">{children}</div>}
  </div>
);

interface ProgramItemProps {
  title: string;
  details: string[];
}

const ProgramItem: React.FC<ProgramItemProps> = ({ title, details }) => {
  const getLink = (title: string): string | null => {
    if (title.toLowerCase().includes("teachers")) {
      return "/programs/2025-southeast-teachers-competition-registration-form";
    }
    if (title.toLowerCase().includes("astc")) {
      return "/programs/2025-anambra-state-teachers-competition-registration-form";
    }
    if (title.toLowerCase().includes("weekly")) {
      return "/programs/bbc-weekly-online-quiz-registration-form";
    }
    return null;
  };

  const link = getLink(title);

  return (
    <div className="mb-3">
      {link ? (
        <Link to={link}>
          <h4
            className="text-sm font-medium text-blue-600 underline cursor-pointer"
            data-aos="fade-up"
          >
            {title}
          </h4>
        </Link>
      ) : (
        <h4 className="text-sm font-bold" data-aos="fade-up">
          {title}
        </h4>
      )}
      <ul className="pl-5">
        {details.map((detail, index) => (
          <li key={index} className="text-sm" data-aos="fade-up">
            {detail.includes("2023 Scholarship Beneficiaries") ? (
              <Link
                to="/programs/2023-scholarship-beneficiaries"
                className="text-blue-600 underline"
              >
                {detail}
              </Link>
            ) : detail.includes("2024 Scholarship Beneficiaries") ? (
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
};

const Programs = () => {
  useEffect(() => {
    initializeAOS();
  }, []);

  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (index: string) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
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
                <ProgramAccordion
                  key={uniqueKey}
                  title={sub.title}
                  isOpen={openIndex === uniqueKey}
                  onToggle={() => toggleAccordion(uniqueKey)}
                >
                  {sub.items.map((item, itemIndex) => (
                    <ProgramItem
                      key={itemIndex}
                      title={item.title}
                      details={item.details}
                    />
                  ))}
                </ProgramAccordion>
              );
            })}
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default Programs;
