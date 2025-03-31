import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PageWrapper from "./pageWrapper";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";

interface FormData {
  fullName: string;
  gender: "Male" | "Female";
  dob: string;
  phoneNumber: string;
  email: string;
  stateOrigin: string;
  lgaOrigin: string;
  stateResidence: string;
  lgaResidence: string;
  schoolName: string;
  schoolAddress: string;
  state: string;
  lgaOfSchool: string;
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
  uploadPassport: File;
}

const TeachersRegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  // Watch selected states
  //   const stateOrigin = watch("stateOrigin");
  //   const stateResidence = watch("stateResidence");
  //   const stateSchool = watch("state");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Append all form fields **except the file**
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "uploadPassport") {
          formData.append(key, value as string);
        }
      });

      // Append the file correctly (Expecting a File, not a FileList)
      if (data.uploadPassport instanceof File) {
        formData.append("uploadPassport", data.uploadPassport);
      } else {
        console.error("File not selected or invalid!", data.uploadPassport);
        return alert("Please select a valid passport image.");
      }

      console.log("FormData Entries:", [...formData.entries()]);

      const response = await fetch(
        "https://best-brain-contest-backend.onrender.com/api/register/anambra",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Backend Error:", errorResponse);
        throw new Error(errorResponse.message || "Failed to register.");
      }

      const result = await response.json();
      alert("Registration successful!");
      console.log(result);
      reset();
      navigate("/");
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
        <h2
          className="sm:text-3xl text-2xl font-bold mb-4 font-Prism text-center"
          data-aos="fade-left"
        >
          2025 ANAMBRA STATE TEACHERS COMPETITION
        </h2>
        <h2
          className="sm:text-3xl text-2xl font-bold mb-4 font-Prism text-center"
          data-aos="fade-left"
        >
          Registration Form
        </h2>
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
          This competition is open for only <b>secondary school teachers</b> in
          private, public, and mission schools in <b>Anambra</b> State.
        </p>
        <br />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-bold mt-6 mb-4">
            Participant's Information
          </h2>
          <label>Full Name</label>
          <input
            {...register("fullName", { required: "Full Name is required" })}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}

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
            {...register("dob", { required: "Date of Birth is required" })}
            placeholder="DD-MM-YYYY e.g. 30-01-1985"
            className="w-full p-3 border rounded-lg"
          />
          {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}

          <label>Phone Number (WhatsApp)</label>
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

          <label>Address of School</label>
          <input
            {...register("schoolAddress", {
              required: "School address is required",
            })}
            placeholder="School Address"
            className="w-full p-3 border rounded-lg"
          />
          {errors.schoolAddress && (
            <p className="text-red-500">{errors.schoolAddress.message}</p>
          )}

          <label>LGA of School</label>

          <select
            {...register("lgaOfSchool", {
              required: "LGA of School is required",
            })}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select LGA</option>
            {[
              "Aguata","Anambra East","Anambra West","Anaocha","Awka North","Awka South","Ayamelum",
              "Dunukofia","Ekwusigo","Idemili North","Idemili South","Ihiala","Njikoka","Nnewi North",
              "Nnewi South","Ogbaru","Onitsha North","Onitsha South","Orumba North","Orumba South","Oyi"
            ].map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </select>
          {errors.lgaOfSchool && <p className="text-red-500">{errors.lgaOfSchool.message}</p>}

          <label>Phone Number of Contact Person (WhatsApp)</label>
          <input
            {...register("contactPhone", {
              required: "Phone number is required",
            })}
            placeholder="Contact Phone"
            className="w-full p-3 border rounded-lg"
          />
          {errors.contactPhone && (
            <p className="text-red-500">{errors.contactPhone.message}</p>
          )}

          <label>School's Official Email Address</label>
          <input
            type="email"
            {...register("contactEmail", { required: "Email is required" })}
            placeholder="School Email"
            className="w-full p-3 border rounded-lg"
          />
          {errors.contactEmail && (
            <p className="text-red-500">{errors.contactEmail.message}</p>
          )}

          <h2 className="text-xl font-bold mt-6 mb-4">Teaching Details</h2>

          <label>What Subject Do You Teach? (enter only one)</label>
          <input
            {...register("subjectTaught", { required: "Subject is required" })}
            placeholder="Subject Taught"
            className="w-full p-3 border rounded-lg"
          />
          {errors.subjectTaught && (
            <p className="text-red-500">{errors.subjectTaught.message}</p>
          )}

          <label>How Many Years Have You Been A Teacher?</label>
          <input
            type="number"
            {...register("yearsOfExperience", {
              required: "Years of experience is required",
              min: 0,
            })}
            placeholder="Years of Experience"
            className="w-full p-3 border rounded-lg"
          />
          {errors.yearsOfExperience && (
            <p className="text-red-500">{errors.yearsOfExperience.message}</p>
          )}

          <label>What's Your Current Position?</label>
          <input
            {...register("currentPosition", {
              required: "Position is required",
            })}
            placeholder="Current Position"
            className="w-full p-3 border rounded-lg"
          />
          {errors.currentPosition && (
            <p className="text-red-500">{errors.currentPosition.message}</p>
          )}

          <h2 className="text-xl font-bold mt-6 mb-4">Competition Category</h2>

          <label>What Category Do You Want To Compete In?</label>
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
            placeholder="List any relevant certifications/awards (if any)"
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

          {/* File Upload Section */}
          <div className="mb-4 mt-6">
            <h2 className="text-xl font-bold">Upload Passport</h2>
            <span className="text-gray-500 text-sm">
              Passport should not be more than 1MB
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreviewImage(URL.createObjectURL(file));
                setValue("uploadPassport", file);
              }
            }}
          />

          {errors.uploadPassport && (
            <p className="text-red-500">{errors.uploadPassport.message}</p>
          )}

          {/* Image Preview */}
          {previewImage && (
            <div>
              <p className="font-medium mb-2">Image Preview:</p>
              <img
                src={previewImage}
                alt="Passport Preview"
                className="w-32 h-32 object-cover"
              />
            </div>
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
            best of my knowledge. I understand that any false information may
            lead to disqualification.
          </label>
          {errors.declaration && (
            <p className="text-red-500">{errors.declaration.message}</p>
          )}

          <h2 className="text-xl font-bold mt-6 mb-4">Feedback</h2>
          <p>
            For feedback and more information about the competition, chat us on
            WhatsApp via{" "}
            <Link
              to={"https://wa.me/+2347077145544"}
              target="_blank"
              className="text-blue-800 font-medium"
            >
              0707 714 5544
            </Link>{" "}
            and click to follow us on all the Facebook Pages below;
          </p>
          <div>
            <a
              href={"https://www.facebook.com/share/18LvqCJULT/"}
              target="_blank"
              className="text-blue-800 font-bold block"
            >
              @Best Brain Contest
            </a>
            <a
              href={"https://www.facebook.com/share/1H1uYUHta9/"}
              target="_blank"
              className="inline-block text-blue-800 font-bold"
            >
              @De Imperial Philanthropic Family
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#071125] text-white hover:text-[#be9611] p-3 rounded-lg cursor-pointer animate-hop mt-4"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      {/* <img src={dipfHeader} alt="dipf" className="sm:w-1/2 w-full sm:h-30 h-20 mx-auto sm:mt-30 sm:mb-10 mb-5 block" /> */}
    </PageWrapper>
  );
};

export default TeachersRegistrationForm;
