import PageWrapper from "../components/pageWrapper";
import { useEffect } from "react";
import initializeAOS from "../utils/aos-init";
import { CEO } from "../constants/assets";

const About = () => {
  useEffect(() => {
    initializeAOS();
  }, []);

  return (
    <PageWrapper>
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h1
          className="text-[#071125] text-5xl text-center font-semibold font-Script sm:mt-0 -mt-12"
          data-aos="flip-down"
        >
          About Us
        </h1>

        <p
          className="text-2xl text-gray-700 text-center mb-12 mt-6 font-Montserrat"
          data-aos="fade-right"
        >
          Welcome to <strong>Best Brain Contest!</strong>
        </p>

        {/* Introduction */}
        <div className="mb-15 font-Montserrat" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700">
            Best Brain Contest is a{" "}
            <b>non-governmental educational organization</b> dedicated to
            empowering students through a variety of educational initiatives,
            including scholarship programs, quiz competitions, spelling bees,
            and more. <b>Our mission</b> is to make quality education accessible
            to all, nurturing the minds of future leaders and innovators.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mb-15 font-Montserrat" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-700">
            At Best Brain Contest, we believe that education is a powerful
            catalyst for change. Led by our founder,{" "}
            <b>Dr. Frank Odinaka Igbojindu</b>, Group Managing Director
            Akpoazaa, an esteemed entrepreneur and philanthropist, we are
            committed to transforming lives through educational opportunities.
            As he often states,
            <br />
            <br />
            <em>
              "Investment in education is an indirect way of storing wealth for
              future use."
            </em>
            <br />
            <br />
            We share his conviction that with good education, individuals have
            indirectly solved over half of their future life challenges.
          </p>
        </div>

        {/* Programs Section */}
        <div className="mb-15 font-Montserrat" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4">Our Programs</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <strong>Scholarship Programs:</strong> Partnering with NGOs,
              individuals, and corporate entities, we have empowered over 3,000
              students through scholarship grants and aids. Notable partners
              include the De Imperial Philanthropic Family, IG Aguowo Health and
              Academic Foundation, and Akpoazaa Foundation.
            </li>
            <br />
            <li>
              <strong>Quiz Competitions:</strong> The Proud Organizer of BBC
              Anambra State Mathematics and Igbo Quiz Competition for Senior
              Secondary Schools. Our engaging quiz competitions foster a spirit
              of learning and healthy competition among students, enhancing
              their knowledge across various subjects.
            </li>
            <br />
            <li>
              <strong>Spelling Bees:</strong> We host spelling bee contests that
              not only improve literacy skills but also boost confidence and
              encourage a love for language.
            </li>
          </ul>
        </div>

        {/* Recent Initiatives Section */}
        <div className="mb-15 font-Montserrat" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4">Recent Initiatives</h2>
          <p className="text-gray-700">
            We have partnered with <strong>Itel Mobile</strong> for the annual
            Anambra State Mathematics and Igbo Quiz Competition, further
            expanding our reach and impact in the community. This year, 2025, we
            will host the maiden editions of the{" "}
            <strong>Anambra State Teachers Competition</strong>
            and the <strong>Southeast University Quiz Competition</strong>.
          </p>
        </div>

        {/* Join Us Section */}
        <div className="mb-15 font-Montserrat" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
          <p className="text-gray-700">
            We invite educators, students, and supporters to join us in our
            mission. Together, we can create a brighter future and empower our
            youth to achieve their dreams.
          </p>
        </div>

        {/* Founder Section */}
        <div
          className="flex flex-col justify-center items-center text-center font-Montserrat"
          data-aos="fade-up"
        >
          <img src={CEO} alt="" className="w-100 sm:h-100 h-80" />
          <h3 className="text-xl font-semibold mt-10">Dr. Frank Odinaka Igbojindu</h3>
          <p className="text-gray-600">(Dip Acc, BSc Acc, MSc Acc, PhD Acc)</p>
          <p className="text-gray-600">
            CEO, Best Brain Contest | GMD, Akpoazaa Group
          </p>
        </div>
      </section>
    </PageWrapper>
  );
};

export default About;
