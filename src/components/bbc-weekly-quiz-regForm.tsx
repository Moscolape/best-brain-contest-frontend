import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PageWrapper from "./pageWrapper";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { statesData } from "../utils/all-states-data";
import { logo } from "../constants/assets";

interface FormData {
  fullName: string;
  gender: "Male" | "Female";
  dob: string;
  myClass: "SS1" | "SS2" | "SS3";
  phoneNumber: string;
  email: string;
  facebookName: string;
  schoolName: string;
  stateOfSchool: string;
  townOfSchool: string;
  lgaOfSchool: string;
  schoolNumber: string;
  declaration: boolean;
  followed: boolean;
}

const WeeklyQuizRegForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    // setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const stateOfSchool = watch("stateOfSchool");
  const selectedState = statesData.find(
    (state) => state.state === stateOfSchool
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsSubmitting(true);

      console.log("Payload:", data);

      const response = await fetch(
        "https://best-brain-contest-backend.onrender.com/api/register/weekly-quiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Backend Error:", errorResponse);
        throw new Error(errorResponse.message || "Failed to register.");
      }

      const result = await response.json();
      alert("Registration successful! Check your mailbox (spam folder also)");
      console.log(result);
      reset();
      setMessage(result.message);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <div className="p-6 sm:bg-gray-100 rounded-md shadow-lg max-w-3xl mx-auto sm:mt-30 font-Montserrat">
        <div className="sm:flex justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className="sm:w-40 w-20 h-15 sm:h-30 sm:mx-0 mx-auto"
          />
          <div>
            <h2
              className="sm:text-3xl text-2xl font-bold sm:mb-4 font-Prism text-center"
              data-aos="fade-left"
            >
              BBC WEEKLY ONLINE QUIZ
            </h2>
            <h2
              className="sm:text-3xl text-2xl font-bold mb-4 font-Prism text-center"
              data-aos="fade-left"
            >
              Registration Form
            </h2>
          </div>
        </div>
        <Marquee className="font-Montserrat font-bold my-5">
          <span className="pr-60">
            THIS FORM IS <span className="text-red-700">NOT FOR SALE!!</span>
          </span>
        </Marquee>{" "}
        <p
          className="text-gray-800 font-Urbanist mt-2"
          data-aos="fade-left"
          data-aos-delay={500}
        >
          <b>
            <u>N.B:</u>
          </b>{" "}
          This QUIZ is open for only{" "}
          <b>senior secondary (SS1 - SS3) school students</b> across Nigeria.
        </p>
        <p
          className="text-gray-800 font-Urbanist mt-2"
          data-aos="fade-left"
          data-aos-delay={500}
        >
          <b>
            <u>N.B:</u>
          </b>{" "}
          Check your email <b>upon successful registration</b> for more details
          on the Quiz.
        </p>
        <br />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-bold mt-6 mb-4">Student's Information</h2>
          <label>Full Name</label>
          <input
            {...register("fullName", { required: "Full Name is required" })}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}

          <label>Gender</label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}

          <label>Date of Birth</label>
          <input
            type="text"
            {...register("dob", {
              required: "Date of Birth is required",
              pattern: {
                value:
                  /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/,
                message: "Date must be in DD-MM-YYYY format",
              },
            })}
            placeholder="DD-MM-YYYY e.g. 30-01-1985"
            className="w-full p-3 border rounded-lg"
          />
          {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}

          <label>Your Class</label>
          <select
            {...register("myClass", { required: "Gender is required" })}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select class</option>
            <option value="SS1">SS1</option>
            <option value="SS2">SS2</option>
            <option value="SS3">SS3</option>
          </select>
          {errors.myClass && (
            <p className="text-red-500">{errors.myClass.message}</p>
          )}

          <label>Phone Number (must be a WhatsApp number)</label>
          <input
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg"
            inputMode="numeric"
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.value = input.value.replace(/\D/g, "").slice(0, 11);
            }}
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}

          <label>Email Address</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <label>Facebook Name</label>
          <input
            {...register("facebookName", {
              required: "Your facebook name is required",
            })}
            placeholder="Your facebook name"
            className="w-full p-3 border rounded-lg"
          />
          {errors.facebookName && (
            <p className="text-red-500">{errors.facebookName.message}</p>
          )}

          <h2 className="text-xl font-bold mt-6 mb-4">School Information</h2>

          <label>Name of School</label>
          <input
            {...register("schoolName", { required: "School name is required" })}
            placeholder="School Name"
            className="w-full p-3 border rounded-lg"
          />
          {errors.schoolName && (
            <p className="text-red-500">{errors.schoolName.message}</p>
          )}

          <label>State School is Located At</label>
          <select
            {...register("stateOfSchool", { required: "State is required" })}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select State</option>
            {statesData.map(({ state }) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.stateOfSchool && (
            <p className="text-red-500">{errors.stateOfSchool.message}</p>
          )}

          <label>LGA School is Located At</label>
          <select
            {...register("lgaOfSchool", { required: "LGA is required" })}
            className="w-full p-3 border rounded-lg"
            disabled={!selectedState}
          >
            <option value="">Select LGA</option>
            {selectedState?.lgas.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </select>
          {errors.lgaOfSchool && (
            <p className="text-red-500">{errors.lgaOfSchool.message}</p>
          )}

          <label>Town School is Located At</label>
          <input
            {...register("townOfSchool", {
              required: "School's town is required",
            })}
            placeholder="School's town"
            className="w-full p-3 border rounded-lg"
          />
          {errors.townOfSchool && (
            <p className="text-red-500">{errors.townOfSchool.message}</p>
          )}

          <label>Principal or Proprietor's Phone number</label>
          <input
            {...register("schoolNumber", {
              required: "Contact number for school is required",
            })}
            placeholder="Phone number of contact person"
            className="w-full p-3 border rounded-lg"
            inputMode="numeric"
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.value = input.value.replace(/\D/g, "").slice(0, 11);
            }}
          />
          {errors.schoolNumber && (
            <p className="text-red-500">{errors.schoolNumber.message}</p>
          )}

          <h2 className="text-xl font-bold mt-6 mb-4">
            Click Below to Follow Us On Facebook:
          </h2>
          <div>
            <a
              href={"https://www.facebook.com/share/18LvqCJULT/"}
              target="_blank"
              className="text-blue-800 font-bold block"
            >
              @Best Brain Contest
            </a>
            <a
              href={"https://www.facebook.com/share/1BDvdoZf6Y/"}
              target="_blank"
              className="inline-block text-blue-800 font-bold"
            >
              @Akpoazaa Foundation
            </a>
          </div>

          <h2 className="text-xl font-bold mt-6 mb-4">Declaration</h2>
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("followed", {
                required: "You have to follow the facebook pages",
              })}
              className="mr-2"
            />
            I hereby declare that I have followed the above listed facebook
            pages.
          </label>
          {errors.followed && (
            <p className="text-red-500">{errors.followed.message}</p>
          )}

          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("declaration", {
                required: "You must accept the declaration",
              })}
              className="mr-2"
            />
            I hereby declare that the information provided in this form is
            accurate to the best of my knowledge. I understand that any false
            information may lead to disqualification.
          </label>
          {errors.declaration && (
            <p className="text-red-500">{errors.declaration.message}</p>
          )}

          <h2 className="text-xl font-bold mt-6 mb-4">Feedback</h2>
          <p>
            For more enquiries about the quiz, chat us on WhatsApp via{" "}
            <Link
              to={"https://wa.me/+2347030555581"}
              target="_blank"
              className="text-blue-800 font-medium"
            >
              0703 055 5581
            </Link>{" "}
          </p>

          {message !== "" && (
            <p className="text-green-700 p-3 rounded text-center bg-green-200 font-medium">
              {message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[#071125] text-white hover:text-[#be9611] p-3 rounded-lg cursor-pointer animate-hop mt-4"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default WeeklyQuizRegForm;
