import PageWrapper from "../components/pageWrapper";
import { useEffect } from "react";
import initializeAOS from "../utils/aos-init";
import { notAvailableYet } from "../constants/assets";

const Blog = () => {
  useEffect(() => {
    initializeAOS();
  }, []);

  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center my-5 h-[60vh]">
        <img src={notAvailableYet} alt="no-data" className="w-30 h-30"/>
        <span className="block my-4">No blogs uploaded yet</span>
      </div>
    </PageWrapper>
  );
};

export default Blog;
