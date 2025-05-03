import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/pageWrapper";
import initializeAOS from "../utils/aos-init";

const TARGET_DATE = new Date("May 03, 2025 19:00:00").getTime();

const TakeQuiz = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(TARGET_DATE - new Date().getTime());
  const [quizReady, setQuizReady] = useState(false);
  const [email, setEmail] = useState("");
  const [quizCode, setQuizCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    initializeAOS();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;
      setTimeLeft(difference);
      if (difference <= 0) {
        clearInterval(timer);
        setQuizReady(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms: number) => {
    if (ms <= 0) return "00d 00h 00m 00s";
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(
        "https://best-brain-contest-backend.onrender.com/api/verify-quiz",
        // "http://localhost:5000/api/verify-quiz",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, quizCode }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        setMessage(result.message);
        throw new Error(result.message || "Invalid email or quiz code.");
      }

      localStorage.setItem("quizUserEmail", email);
      localStorage.removeItem("hasSubmitted");

      setMessage("Access granted. Starting quiz...");
      setTimeout(() => {
        navigate("/take-quiz/questions");
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <div className="sm:w-4/5 mx-auto px-4 sm:py-8 font-Montserrat">
        {!quizReady ? (
          <div className="text-center mt-40 sm:mt-10">
            <h1 className="text-3xl sm:text-5xl font-bold">Quiz starts in:</h1>
            <p className="text-2xl sm:text-5xl mt-4 font-mono">{formatTime(timeLeft)}</p>
          </div>
        ) : (
          <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg font-Montserrat">
            <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
                disabled={isSubmitting}
              />
              <input
                type="text"
                placeholder="Enter your quiz code"
                value={quizCode}
                onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-900 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Proceed to Quiz"}
              </button>
            </form>
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.toLowerCase().includes("invalid") || message.toLowerCase().includes("already")
                    ? "text-red-700"
                    : "text-green-700"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default TakeQuiz;
