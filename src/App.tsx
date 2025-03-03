import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";

const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Services = lazy(() => import("./pages/services"));
const Programs = lazy(() => import("./pages/programs"));
const Blog = lazy(() => import("./pages/blog"));
const Contact = lazy(() => import("./pages/contact"));
const Gallery = lazy(() => import("./pages/gallery"));
const TeachersForm = lazy(
  () => import("./components/teachers-registration-form")
);

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="w-8 h-8 border-4 border-[#071125] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />

          <Route
            path="/programs/anambra-state-teachers-competition-registration-form"
            element={<TeachersForm />}
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
