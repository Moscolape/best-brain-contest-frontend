import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  _id: string;
  prompt: string;
  type: string;
  points: string;
  day: string;
}

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/questions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${authToken}`,
          },
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          alert(data.message || 'Failed to fetch questions');
          setQuestions([]);
          throw new Error(data.message || 'Failed to fetch questions');
        }
  
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
  
    fetchQuestions();
  }, []);
  

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/questions/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${authToken}`,
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.message || 'Delete failed');
        throw new Error(data.message || 'Delete failed');
      }
  
      setQuestions((qs) => qs.filter((q) => q._id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Questions</h1>
      <button
        onClick={() => navigate("/admin/questions/new")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        + New Question
      </button>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-2 text-left w-[35%]">Prompt</th>
            <th className="p-2 text-left w-[15%]">Type</th>
            <th className="p-2 text-left w-[15%]">Points</th>
            <th className="p-2 text-left w-[15%]">Day</th>
            <th className="p-2 text-left w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q._id} className="border-t">
              <td className="p-2 w-[35%]">{q.prompt}</td>
              <td className="p-2 w-[15%]">{q.type}</td>
              <td className="p-2 w-[15%]">{q.points}</td>
              <td className="p-2 w-[15%]">{q.day}</td>
              <td className="p-2 space-x-2 w-[20%]">
                <button
                  onClick={() => navigate(`/admin/questions/${q._id}`)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(q._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
