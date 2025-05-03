import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

const TimeRestrictedRoute: React.FC<PageWrapperProps> = ({ children }) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  const isSaturday = day === 6;
  const isBetween6And611 = hour === 19 && minutes >= 0 && minutes <= 11;

  if (isSaturday && isBetween6And611) {
    return children;
  }

  return <Navigate to="/take-quiz" replace />;
};

export default TimeRestrictedRoute;
