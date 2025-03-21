import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/pageWrapper";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("https://best-brain-contest-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Invalid credentials.");

      const datae = await response.json();
      console.log("Login Response:", datae);

      // Store token in localStorage
      if(datae.message.includes('successful')) {
        localStorage.setItem("authToken", datae.token);
      }

      alert("Login successful!");
      reset();
      navigate("/scholarship-form");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <div className="p-6 sm:bg-gray-100 rounded-md sm:shadow-lg max-w-3xl mx-auto sm:mt-40">
        <h2
          className="sm:text-3xl text-2xl font-bold mb-4 font-Prism text-center"
          data-aos="fade-left"
        >
          Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 font-Montserrat"
        >
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-3 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <label>Password</label>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            className="w-full p-3 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#071125] text-white p-3 rounded-lg font-bold cursor-pointer hover:bg-[#0c2559]"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default Login;
