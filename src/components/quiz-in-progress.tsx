import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../utils/questions";
import PageWrapper from "./pageWrapper";

const QUIZ_DURATION = 15 * 60 * 1000;

const QuizInProgress = () => {
  const navigate = useNavigate();
  const [quizTimeLeft, setQuizTimeLeft] = useState(QUIZ_DURATION);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleSelect = (questionId: number, option: string) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  useEffect(() => {
    const targetTime = new Date("April 12, 2025 18:00:00").getTime();
    const endTime = targetTime + QUIZ_DURATION;

    const quizTimer = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = endTime - now;
      setQuizTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(quizTimer);
        navigate("/");
      }
    }, 1000);

    return () => clearInterval(quizTimer);
  }, [navigate]);

  const formatTime = (ms: number) => {
    if (ms <= 0) return "00m 00s";
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <PageWrapper>
      <div className="w-full max-w-3xl mx-auto sm:mt-30 p-6 bg-white shadow-lg rounded-lg font-Montserrat">
        <h2 className="text-2xl font-bold mb-4 text-center">Quiz in Progress</h2>
        <p className="text-xl font-medium">
          <b>Time Remaining:</b> {formatTime(quizTimeLeft)}
        </p>
        <p className="text-gray-600 mt-2">
          Answer the questions before time runs out.
        </p>

        <div className="mt-4">
          {questions.map((q) => (
            <div key={q.id} className="mb-4">
              <p className="font-semibold">{q.question}</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {q.options.map((option) => (
                  <button
                    key={option}
                    className={`p-2 border rounded-lg text-left hover:bg-gray-200 ${
                      answers[q.id] === option ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => handleSelect(q.id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default QuizInProgress;
