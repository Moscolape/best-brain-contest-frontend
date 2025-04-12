import React, { useEffect, useState } from "react";

interface Email {
  fullName: string;
  email: string;
  gender: string;
  dob: string;
  myClass: string;
  phoneNumber: string;
  schoolName: string;
  stateOfSchool: string;
  townOfSchool: string;
  lgaOfSchool: string;
  schoolNumber: string;
}

interface Submission {
  _id: string;
  email: Email;
  score: number;
  percentage: number;
  totalPoints: number;
  weekIdentifier: string;
  submittedAt: string;
}

interface QuizSubmissionsProps {
  weekIdentifier: string;
}

const QuizSubmissions: React.FC<QuizSubmissionsProps> = ({
  weekIdentifier,
}) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit] = useState<number>(10);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://best-brain-contest-backend.onrender.com/api/quiz-submissions?weekIdentifier=${weekIdentifier}&page=${currentPage}&limit=${limit}`
        );
        const data = await response.json();
        console.log("API Response Data:", data);

        if (!response.ok) {
          setError(data.message || "Failed to fetch quiz submissions");
          throw new Error(data.message || "Failed to fetch quiz submissions");
        }

        if (data.message && data.message === "No quiz submissions found") {
          setError("No submissions for this date.");
          return;
        }

        setSubmissions(data.submissions); // Assuming data.submissions is an array
        setTotalPages(data.pagination.totalPages); // Assuming data.pagination contains totalPages
      } catch (err) {
        console.error("Error fetching quiz submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (weekIdentifier) {
      fetchSubmissions();
    }
  }, [weekIdentifier, currentPage, limit]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[10vh]">
        <div className="w-8 h-8 border-4 border-[#071125] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-6 p-6 bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Quiz Submissions for {weekIdentifier}
      </h2>
      <div>
        {submissions.length === 0 ? (
          <p className="text-center text-gray-500">
            No submissions for this week.
          </p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  Full Name
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  WhatsApp Number
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  School Contact
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  Gender
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  Class
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  Score
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  Submitted At
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission._id}>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {submission.email.fullName}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {submission.email.phoneNumber}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {submission.email.schoolNumber}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {submission.email.gender}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {submission.email.myClass}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {submission.score}pts
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded-l disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded-r disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizSubmissions;
