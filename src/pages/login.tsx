import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/pageWrapper";
import { useAuth } from "../hooks/use-auth";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success" | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    setFormMessage(null);
    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
      // const response = await fetch("https://best-brain-contest-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.message.toLowerCase().includes("invalid")) {
        setFormMessage(result.message);
        setMessageType("error");
        return;
      }

      if (result.message.toLowerCase().includes("successful")) {
        setFormMessage(result.message);
        setMessageType("success");
        login(result.token, result.roleAccess);
        reset();

        // delay before navigation
        setTimeout(() => {
          navigate("/scholarship-form");
        }, 2000);

        return;
      }

      // fallback for unexpected
      setFormMessage(result.message);
      setMessageType(response.ok ? "success" : "error");
    } catch (err) {
      console.error("Login Error:", err);
      setFormMessage("Login failed. Please try again.");
      setMessageType("error");
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
          Admin Login
        </h2>

        {formMessage && (
          <div
            className={`p-3 mb-4 rounded text-center ${
              messageType === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {formMessage}
          </div>
        )}

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
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full p-3 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#071125] text-white p-3 rounded-lg font-bold hover:bg-[#0c2559] disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default Login;