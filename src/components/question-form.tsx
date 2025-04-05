import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

type QuestionType = "multiple-choice" | "objective" | "subjective";

interface FormState {
  prompt: string;
  type: QuestionType;
  options: string[];
  correctAnswers: string[];
  correctAnswer: string;
  week: string;
  points: number;
}

export default function QuestionForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    prompt: "",
    type: "multiple-choice",
    options: ["", "", "", ""],
    correctAnswers: [""],
    correctAnswer: "",
    week: "",
    points: 1,
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/admin/questions/${id}`)
        .then((res) => res.json())
        .then((data: FormState) => setForm(data));
    }
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionsChange = (idx: number, value: string) => {
    setForm((prev) => {
      const opts = [...prev.options];
      opts[idx] = value;
      return { ...prev, options: opts };
    });
  };

  const handleCorrectAnswersChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      correctAnswers: e.target.value.split(",").map((ans) => ans.trim()),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `http://localhost:5000/api/admin/questions/${id}`
        : `http://localhost:5000/api/admin/questions`;
  
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }
  
      const responseData = await response.json();
      console.log("Response:", responseData);
  
      alert(id ? "Question updated successfully!" : "Question created successfully!");
      navigate("/admin/questions");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit question. Please check console for errors.");
    }
  };
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit" : "New"} Question
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block">Prompt</label>
          <textarea
            name="prompt"
            value={form.prompt}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="objective">Objective</option>
            <option value="subjective">Subjective</option>
          </select>
        </div>

        {form.type === "multiple-choice" && (
          <>
            <label className="block">Options</label>
            {form.options.map((opt, i) => (
              <input
                key={i}
                value={opt}
                onChange={(e) => handleOptionsChange(i, e.target.value)}
                className="w-full border p-2 mb-2"
                placeholder={`Option ${i + 1}`}
              />
            ))}
            <label className="block">Correct Answers (comma separated)</label>
            <input
              name="correctAnswers"
              value={form.correctAnswers.join(", ")}
              onChange={handleCorrectAnswersChange}
              className="w-full border p-2"
            />
          </>
        )}

        {form.type === "objective" && (
          <div>
            <label className="block">Options</label>
            {form.options.map((opt, i) => (
              <input
                key={i}
                value={opt}
                onChange={(e) => handleOptionsChange(i, e.target.value)}
                className="w-full border p-2 mb-2"
                placeholder={`Option ${i + 1}`}
              />
            ))}
            <label className="block">Correct Answer</label>
            <input
              name="correctAnswer"
              value={form.correctAnswer}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
        )}

        <div>
          <label className="block">Week (e.g. 2025-W15)</label>
          <input
            name="week"
            value={form.week}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <div>
          <label className="block">Points</label>
          <input
            name="points"
            type="number"
            value={form.points}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          {id ? "Update" : "Create"} Question
        </button>
      </form>
    </div>
  );
}
