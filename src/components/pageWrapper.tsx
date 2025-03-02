import Footer from "./footer";
import NavLinks from "./navbar";
import { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="w-full h-full custom-scrollbar-example">
      <NavLinks />
      <div className="mt-20">{children}</div>
      <Footer />
    </div>
  );
};

export default PageWrapper;
