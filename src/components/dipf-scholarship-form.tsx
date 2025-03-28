import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/pageWrapper";
import { statesData } from "../utils/statesdata";
import { dipfHeader } from "../constants/assets";
import BeneficiariesTable2023 from "./2023-scholarship-beneficiaries";

interface BeneficiaryData {
  beneficiaryName: string;
  codeNo: string;
  school: string;
  state: string;
  year: string;
  parentPhone: string;
  accountName: string;
  accountNo: string;
  bank: string;
  js1: string;
  js2: string;
  js3: string;
  juniorWAEC: string;
  ss1: string;
  ss2: string;
  ss3: string;
  seniorWAEC: string;
}

const BeneficiaryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "beneficiaries" | "beneficiaryForm"
  >("beneficiaryForm");
  //   const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BeneficiaryData>();

  const onSubmit: SubmitHandler<BeneficiaryData> = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await fetch(
        "https://best-brain-contest-backend.onrender.com/api/beneficiary/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit registration request.");
      }

      const responseData = await response.json();

      console.log("Response Data:", responseData);

      alert("Entry successful!");
      reset();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <img
        src={dipfHeader}
        alt="dipf"
        className="sm:w-1/2 w-full sm:h-30 h-20 mx-auto sm:mt-30 sm:mb-10 mb-5 block"
      />
      {/* Toggle Tabs with Sliding Effect */}
      <div className="mb-6 flex justify-center relative">
        <div className="relative flex bg-gray-200 p-1 rounded-lg w-[22rem] font-Montserrat">
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-[#071125] transition-all duration-300 ${
              activeTab === "beneficiaries"
                ? "translate-x-full rounded-r-lg"
                : "translate-x-0 rounded-l-lg"
            }`}
          ></div>
          <button
            className={`relative z-10 flex-1 py-2 font-semibold transition duration-300 cursor-pointer ${
              activeTab === "beneficiaryForm" ? "text-white" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("beneficiaryForm")}
          >
            Beneficiary Form
          </button>
          <button
            className={`relative z-10 flex-1 py-2 font-semibold transition duration-300 cursor-pointer ${
              activeTab === "beneficiaries" ? "text-white" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("beneficiaries")}
          >
            Beneficiaries
          </button>
        </div>
      </div>
      {activeTab === "beneficiaryForm" ? (
        <div className="p-6 sm:bg-gray-100 rounded-md sm:shadow-lg max-w-3xl mx-auto ">
          <h2
            className="sm:text-3xl text-2xl font-bold mb-4 font-Prism text-center"
            data-aos="fade-left"
          >
            Scholarship Beneficiary Registration
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 font-Montserrat"
          >
            <label>Beneficiary Name</label>
            <input
              {...register("beneficiaryName", {
                required: "Beneficiary Name is required",
              })}
              className="w-full p-3 border rounded-lg"
            />
            {errors.beneficiaryName && (
              <p className="text-red-500">{errors.beneficiaryName.message}</p>
            )}

            <label>State</label>
            <select
              {...register("state", { required: true })}
              className="w-full p-3 border rounded-lg"
            >
              {Object.keys(statesData).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500">{errors.state.message}</p>
            )}

            <label>Year</label>
            <select
              {...register("year", { required: true })}
              className="w-full p-3 border rounded-lg"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2025">2025</option>
            </select>
            {errors.year && (
              <p className="text-red-500">{errors.year.message}</p>
            )}

            <label>Code No</label>
            <input
              {...register("codeNo", { required: "Code No is required" })}
              className="w-full p-3 border rounded-lg"
            />
            {errors.codeNo && (
              <p className="text-red-500">{errors.codeNo.message}</p>
            )}

            <label>School</label>
            <input
              {...register("school", { required: "School is required" })}
              className="w-full p-3 border rounded-lg"
            />
            {errors.school && (
              <p className="text-red-500">{errors.school.message}</p>
            )}

            <label>Parent’s Phone No</label>
            <input
              type="tel"
              {...register("parentPhone", {
                required: "Parent’s Phone No is required",
              })}
              className="w-full p-3 border rounded-lg"
            />
            {errors.parentPhone && (
              <p className="text-red-500">{errors.parentPhone.message}</p>
            )}

            <label>Account Name</label>
            <input
              {...register("accountName", {
                required: "Account Name is required",
              })}
              className="w-full p-3 border rounded-lg"
            />
            {errors.accountName && (
              <p className="text-red-500">{errors.accountName.message}</p>
            )}

            <label>Account No</label>
            <input
              {...register("accountNo", { required: "Account No is required" })}
              className="w-full p-3 border rounded-lg"
            />
            {errors.accountNo && (
              <p className="text-red-500">{errors.accountNo.message}</p>
            )}

            <label>Bank</label>
            <input
              {...register("bank", { required: "Bank is required" })}
              className="w-full p-3 border rounded-lg"
            />
            {errors.bank && (
              <p className="text-red-500">{errors.bank.message}</p>
            )}

            {/* Payment Status Fields */}
            {[
              "js1",
              "js2",
              "js3",
              "juniorWAEC",
              "ss1",
              "ss2",
              "ss3",
              "seniorWAEC",
            ].map((level) => (
              <div key={level}>
                <label>{level.toUpperCase()} Payment</label>
                <select
                  {...register(level as keyof BeneficiaryData, {
                    required: true,
                  })}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Not Paid">Not Paid</option>
                </select>
                {errors[level as keyof BeneficiaryData] && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#071125] text-white p-3 mt-3 rounded-lg font-bold cursor-pointer hover:bg-[#0c2559]"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      ) : (
        <BeneficiariesTable2023 show={true}/>
      )}
    </PageWrapper>
  );
};

export default BeneficiaryForm;
