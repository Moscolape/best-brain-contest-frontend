import PageWrapper from "../components/pageWrapper";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import initializeAOS from "../utils/aos-init";
import axios from "axios";
import { Link } from "react-router-dom";

// Define Form Data Type
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  useEffect(() => {
    initializeAOS();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const [status, setStatus] = useState<string>("");

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setStatus("Sending...");
    try {
      const response = await axios.post<{ message: string }>(
        "https://best-brain-contest-backend.onrender.com/api/contact",
        data
      );

      if (response.status === 200) {
        setStatus("Message sent successfully!");
        reset();
      }
    } catch (error) {
      setStatus("Failed to send message. Try again.");
      console.log(error);
    }
  };

  const socialMediaLinks = [
    {
      icon: <FaFacebook />,
      href: "https://www.facebook.com/share/18LvqCJULT/",
    },
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/officialbestbraincontest?igsh=MWFqZDJpZHV5MTc4Yw==",
    },
  ];

  return (
    <PageWrapper>
      <div className="w-[90%] mx-auto sm:mt-32 flex flex-col-reverse sm:grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="p-6 bg-gray-100 rounded-md shadow-lg">
          <h2 className="text-3xl font-bold mb-4 font-Prism" data-aos="fade-left">Get In Touch</h2>
          <p className="text-gray-800 font-Urbanist" data-aos="fade-left" data-aos-delay={500}>
            Reach out to Best Brain Contest for inquiries, feedback, support, or
            collaboration opportunities.
          </p>
          <br />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Your Name"
              className="w-full p-2 border rounded placeholder:text-gray-400"
              data-aos="fade-in" data-aos-delay={1000}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Your Email"
              className="w-full p-2 border rounded placeholder:text-gray-400"
              data-aos="fade-in" data-aos-delay={1000}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Your Message"
              className="w-full p-2 border rounded resize-none placeholder:text-gray-400"
              rows={8}
              data-aos="fade-in" data-aos-delay={1000}
            />
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#071125] text-white hover:text-[#be9611] p-2 rounded cursor-pointer animate-hop"
            >
              Send Message
            </button>
          </form>
          {status && <p className="mt-4 text-center text-green-700 font-medium">{status}</p>}
        </div>

        {/* Contact Details */}
        <div className="sm:p-6 font-Montserrat" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4">Contact Details</h2>
          <div className="mb-4">
            <h3 className="font-bold">ADDRESS:</h3>
            <p>
              Suite B6 Millennium Plaza by Total Filling Station, Aroma
              Junction, Awka, Anambra State, Nigeria.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">TELEPHONE:</h3>
            <p>0703 055 5581</p>
            <p>0707 714 5544</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">EMAIL:</h3>
            <p>bestbraincontest@gmail.com</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">FOLLOW US ON:</h3>
            <div className="text-h6 flex mt-2">
              {socialMediaLinks.map((link, index) => (
                <Link
                  to={link.href}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4 text-2xl"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Contact;
