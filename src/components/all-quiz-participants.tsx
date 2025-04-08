import React, { useEffect, useState } from "react";

interface Participant {
  _id: string;
  fullName: string;
  gender: string;
  dob: string;
  myClass: string;
  phoneNumber: string;
  email: string;
  facebookName?: string;
  schoolName: string;
  stateOfSchool: string;
  townOfSchool: string;
  lgaOfSchool: string;
  schoolNumber: string;
  quizCode: string;
  declaration: boolean;
  followed: boolean;
  createdAt: string;
}

const AllParticipants: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit] = useState<number>(10);

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://best-brain-contest-backend.onrender.com/api/quiz-participants?page=${currentPage}&limit=${limit}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch participants");
        }

        setParticipants(data.participants);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [currentPage, limit]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <div className="w-8 h-8 border-4 border-[#071125] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="p-6 bg-white mt-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        All Quiz Participants
      </h2>

      {participants.length === 0 ? (
        <p className="text-center text-gray-500">No participants found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="sm:w-[200%] w-[300%] border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  Full Name
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  Facebook Name
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  Phone
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  Gender
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  Class
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  School
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700">
                  Principal Number
                </th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p._id}>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {p.fullName}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {p.facebookName}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {p.phoneNumber}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {p.gender}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {p.myClass}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {p.schoolName}
                  </td>
                  <td className="px-4 py-2 border-b text-gray-800">
                    {p.schoolNumber}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

export default AllParticipants;
