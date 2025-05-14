import { useState } from "react";
import QuizSubmissions from "./quiz-submissions";

const CheckSubmissions = () => {
  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [weekIdentifier, setWeekIdentifier] = useState<string>(
    getTodayDateString()
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeekIdentifier(event.target.value);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-100 rounded-lg shadow-lg font-Montserrat">
      <div className="mb-6 flex justify-center items-center">
        <label htmlFor="week-selector" className="text-lg mr-4 text-gray-700">
          Select a Date:
        </label>
        <input
          id="week-selector"
          type="date"
          value={weekIdentifier}
          onChange={handleDateChange}
          className="px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <QuizSubmissions weekIdentifier={weekIdentifier} />
    </div>
  );
};

export default CheckSubmissions;
