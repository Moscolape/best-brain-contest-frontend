import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PageWrapper from "./pageWrapper";

interface FormData {
  name: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
  phoneNumber: string;
  email: string;
  schoolName: string;
  schoolAddress: string;
  lga: string;
  contactPhone: string;
  contactEmail: string;
  subjectTaught: string;
  yearsOfExperience: number;
  currentPosition: string;
  competitionCategory:
    | "Best Teaching Practices"
    | "Innovative Classroom Strategies"
    | "Educational Technology Integration";
  certifications: string;
  motivation: string;
  declaration: boolean;
}

const TeachersRegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <PageWrapper>
      <div className="p-6 bg-gray-100 rounded-md shadow-lg max-w-3xl mx-auto sm:mt-30 -mt-5">
        <h2
          className="sm:text-3xl text-2xl font-bold mb-4 font-Prism text-center"
          data-aos="fade-left"
        >
          Teachers Registration Form
        </h2>
        <p
          className="text-gray-800 font-Urbanist"
          data-aos="fade-left"
          data-aos-delay={500}
        >
          <b>N.B:</b> This competition is open for only secondary school
          teachers in private, public, and mission schools in Anambra State.
        </p>
        <br />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-bold mt-6 mb-4">
            Participant's Information
          </h2>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg placeholder:text-gray-400"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <select
            {...register("gender", { required: "Gender is required" })}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}

          <input
            type="date"
            {...register("dob", { required: "Date of Birth is required" })}
            className="w-full p-3 border rounded-lg"
          />
          {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}

          <input
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}

          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <h2 className="text-xl font-bold mt-6 mb-4">School Information</h2>
          <input
            {...register("schoolName", { required: "School name is required" })}
            placeholder="School Name"
            className="w-full p-3 border rounded-lg"
          />

          <input
            {...register("schoolAddress", {
              required: "School address is required",
            })}
            placeholder="School Address"
            className="w-full p-3 border rounded-lg"
          />

          <input
            {...register("lga", {
              required: "Local Government Area is required",
            })}
            placeholder="LGA"
            className="w-full p-3 border rounded-lg"
          />

          <input
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            placeholder="Phone number of contact person"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="School Email"
            className="w-full p-3 border rounded-lg"
          />

          <h2 className="text-xl font-bold mt-6 mb-4">Teaching Details</h2>
          <input
            {...register("subjectTaught", { required: "Subject is required" })}
            placeholder="Subject Taught"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="number"
            {...register("yearsOfExperience", {
              required: "Years of experience is required",
              min: 0,
            })}
            placeholder="Years of Experience"
            className="w-full p-3 border rounded-lg"
          />

          <input
            {...register("currentPosition", {
              required: "Position is required",
            })}
            placeholder="Current Position"
            className="w-full p-3 border rounded-lg"
          />

          <h2 className="text-xl font-bold mt-6 mb-4">Competition Category</h2>
          <select
            {...register("competitionCategory", {
              required: "Select a category",
            })}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="Best Teaching Practices">
              Best Teaching Practices
            </option>
            <option value="Innovative Classroom Strategies">
              Innovative Classroom Strategies
            </option>
            <option value="Educational Technology Integration">
              Educational Technology Integration
            </option>
          </select>
          {errors.competitionCategory && (
            <p className="text-red-500">{errors.competitionCategory.message}</p>
          )}

          <h2 className="text-xl font-bold mt-6 mb-4">
            Additional Information
          </h2>
          <textarea
            {...register("certifications", {
              required: "Certification is not required",
            })}
            placeholder="Start work here if there is..."
            className="w-full p-3 border rounded-lg resize-none"
            rows={5}
          />
          <textarea
            {...register("motivation", { required: "Motivation is required" })}
            placeholder="Describe your motivation for participating in this competition"
            className="w-full p-3 border rounded-lg resize-none"
            rows={5}
          />
          {errors.motivation && (
            <p className="text-red-500">{errors.motivation.message}</p>
          )}

          <h2 className="text-xl font-bold mt-6 mb-4">Declaration</h2>
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("declaration", {
                required: "You must accept the declaration",
              })}
              className="mr-2"
            />
            I hereby declare that the information provided is accurate to the
            best of my knowledge.
          </label>
          {errors.declaration && (
            <p className="text-red-500">{errors.declaration.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#071125] text-white hover:text-[#be9611] p-3 rounded-lg cursor-pointer animate-hop mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default TeachersRegistrationForm;
