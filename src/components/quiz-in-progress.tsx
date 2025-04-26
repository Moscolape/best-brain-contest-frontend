import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "./pageWrapper";
import Lottie from "lottie-react";
import confettiAnimation from "../utils/Animation - 1744283286259.json";

const QUIZ_DURATION = 10 * 60 * 1000;

type Question = {
  _id: string;
  prompt: string;
  options: string[];
  type: string;
};

const QuizInProgress = () => {
  const navigate = useNavigate();
  const [quizTimeLeft, setQuizTimeLeft] = useState(QUIZ_DURATION);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    () => JSON.parse(localStorage.getItem("quizAnswers") || "{}")
  );

  const [scoreData, setScoreData] = useState<null | {
    score: number;
    percentage: number;
    totalPoints: number;
  }>(null);

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(() =>
    JSON.parse(localStorage.getItem("hasSubmitted") || "false")
  );
  const [error, setError] = useState("");

  const fullAnswers = useMemo(() => {
    const result: { [key: string]: string | string[] } = {};

    for (const question of questions) {
      const userAnswer = answers[question._id];
      if (userAnswer !== undefined) {
        result[question._id] = userAnswer;
      } else {
        result[question._id] = question.type === "multiple-choice" ? [] : "";
      }
    }

    return result;
  }, [questions, answers]);

  const handleSubmit = useCallback(async () => {
    if (hasSubmitted) return;

    setHasSubmitted(true);
    setSubmitting(true);
    localStorage.setItem("hasSubmitted", "true");
    setError("");

    const email = localStorage.getItem("quizUserEmail");
    console.log(fullAnswers);

    try {
      const response = await fetch(
        "https://best-brain-contest-backend.onrender.com/api/quiz/submit",
        // "http://localhost:5000/api/quiz/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: fullAnswers, email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to submit quiz");
        throw new Error(data.message);
      }

      setScoreData(data);
      localStorage.removeItem("quizAnswers");
    } catch (error) {
      console.error("Submission error:", error);
      setHasSubmitted(false);
      localStorage.setItem("hasSubmitted", "false");
    } finally {
      setSubmitting(false);
    }
  }, [fullAnswers, hasSubmitted]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://best-brain-contest-backend.onrender.com/api/admin/questions?day=2025-04-26"
        );
        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to fetch questions");
          throw new Error(data.message);
        }

        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const targetTime = new Date("April 26, 2025 18:00:00").getTime();
    const endTime = targetTime + QUIZ_DURATION;

    const quizTimer = setInterval(() => {
      const now = Date.now();
      const remainingTime = endTime - now;
      setQuizTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(quizTimer);

        const hasAnyAnswer = Object.values(answers).some((value) => {
          if (Array.isArray(value)) return value.length > 0;
          return value !== "";
        });

        if (hasAnyAnswer) {
          (async () => {
            await handleSubmit();
          })();
        } else {
          console.log("Quiz ended but no answers were submitted.");
        }
      }
    }, 1000);

    return () => clearInterval(quizTimer);
  }, [navigate, handleSubmit, answers]);

  useEffect(() => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
  }, [answers]);

  const handleSelect = (questionId: string, option: string) => {
    const question = questions.find((q) => q._id === questionId);
    if (!question) return;

    if (question.type === "multiple-choice") {
      const selectedOptions = new Set((answers[questionId] as string[]) || []);
      if (selectedOptions.has(option)) {
        selectedOptions.delete(option);
      } else {
        selectedOptions.add(option);
      }
      setAnswers({
        ...answers,
        [questionId]: Array.from(selectedOptions),
      });
    } else {
      setAnswers({ ...answers, [questionId]: option });
    }
  };

  const formatTime = (ms: number) => {
    if (ms <= 0 || hasSubmitted) return "00m 00s";
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <PageWrapper>
      <div className="w-full max-w-3xl mx-auto sm:mt-30 p-6 bg-white sm:shadow-lg rounded-lg font-Montserrat">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Quiz in Progress
        </h2>
        <p className="text-xl font-medium">
          <b>Time Remaining:</b> {formatTime(quizTimeLeft)}
        </p>
        <p className="text-gray-600 mt-2">
          Answer the questions before time runs out.
        </p>

        {loading ? (
          <div className="flex items-center justify-center h-[10vh]">
            <div className="w-8 h-8 border-4 border-[#071125] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mt-4 nocopy">
            {questions.map((q, idx) => (
              <div key={q._id} className="mb-6">
                <p className="font-semibold">
                  {idx + 1}. {q.prompt}
                </p>

                {q.type === "multiple-choice" ? (
                  <div className="mt-2 space-y-2">
                    {q.options.map((option) => {
                      const selected =
                        (answers[q._id] as string[] | undefined) || [];
                      return (
                        <label
                          key={option}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selected.includes(option)}
                            disabled={hasSubmitted || submitting}
                            onChange={() => handleSelect(q._id, option)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {q.options.map((option) => {
                      const isSelected = answers[q._id] === option;
                      return (
                        <button
                          key={option}
                          disabled={hasSubmitted || submitting}
                          className={`p-2 border rounded-lg text-left transition hover:bg-gray-100 ${
                            isSelected ? "bg-blue-500 text-white" : ""
                          }`}
                          onClick={() => handleSelect(q._id, option)}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600 font-medium text-center">
            {error}
          </div>
        )}

        {!loading && questions.length > 0 && !scoreData && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              disabled={hasSubmitted || submitting}
              className="px-6 py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting
                ? "Submitting..."
                : hasSubmitted
                ? "Submitted"
                : "Submit Quiz"}
            </button>
          </div>
        )}

        {scoreData && (
          <div className="w-screen h-screen bg-[#00000090] flex items-center justify-center z-50 fixed top-0 left-0">
            <div className="bg-white sm:w-[35%] w-4/5 m-auto rounded-lg py-10 animate-fadeDownFast max-h-[90vh] overflow-y-auto relative text-center font-Montserrat">
              <div className="absolute inset-0 flex justify-center items-start pointer-events-none z-20">
                <Lottie
                  animationData={confettiAnimation}
                  loop={true}
                  autoplay
                  style={{ height: 200 }}
                />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  🎉 Congratulations!
                </h2>
                <p className="text-xl font-semibold mb-2">
                  You scored{" "}
                  <span className="text-blue-600">{scoreData.score}</span> out
                  of{" "}
                  <span className="text-blue-600">
                    {scoreData.totalPoints} points
                  </span>
                </p>
                <p>Check your mail for more details!!</p>
              </div>
              <button
                onClick={() => {
                  navigate("/", { replace: true });
                }}
                className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-900 transition cursor-pointer"
              >
                Okay
              </button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default QuizInProgress;
