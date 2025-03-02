import { FaFacebook, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import initializeAOS from "../utils/aos-init";

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

const quickLinks = [
  {
    text: "About Us",
    href: "/about",
  },
  {
    text: "Contact Us",
    href: "/contact",
  },
  {
    text: "Our Services",
    href: "/services",
  },
  {
    text: "Our Programs",
    href: "/programs",
  },
//   {
//     text: "Our Gallery",
//     href: "/gallery",
//   },
  {
    text: "Our Blog",
    href: "/blog",
  },
];

export default function Footer() {
  useEffect(() => {
    initializeAOS();
  }, []);

  return (
    <div className="w-full bg-[#071125] text-white text-body1 mt-20">
      <div className="flex sm:flex-row flex-col justify-between items-start sm:p-6 p-3">
        <div className="sm:w-1/3" data-aos = "fade-up">
          <h1 className="text-lg">LOCATE US</h1>
          <br />
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-white text-5xl mr-2" />
            <p>
              Suite B6 Millennium Plaza by Total Filling Station, Aroma
              Junction, Awka, Anambra State.
            </p>
          </div>
        </div>
        <div className="sm:w-1/3 sm:mt-0 mt-10" data-aos = "fade-down">
          <h1 className="text-lg">QUICK LINKS</h1>
          <br />
          <div className="flex flex-col">
            {quickLinks.map((link, index) => (
              <Link
                to={link.href}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 text-[1rem] hover:text-[#be9611] hover:scale-105"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start border-t-2 border-white p-6">
        {/* Footer Text */}
        <div className="sm:w-1/3">
          <p className="sm:px-0 mo:px-7 sm:text-body2 mo:text-sub">
            &copy; 2025 Best Brain Contest. All rights reserved.
          </p>
        </div>
        <div className="sm:w-1/3 mo:w-1/5 hidden sm:block">
          Follow us on our social media pages below;
          {/* Social Media Icons */}
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
  );
}
