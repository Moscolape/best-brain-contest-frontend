import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";
import ProtectedRoute from "./components/protected-routes";

const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Services = lazy(() => import("./pages/services"));
const Programs = lazy(() => import("./pages/programs"));
const Blog = lazy(() => import("./pages/blog"));
const Contact = lazy(() => import("./pages/contact"));
const Gallery = lazy(() => import("./pages/gallery"));

const AdminLayout = lazy(() => import("./components/admin-layout"));
const Dashboard = lazy(() => import("./components/admin-dashboard"));
const QuestionList = lazy(() => import("./components/questions"));
const QuestionForm = lazy(() => import("./components/question-form"));
const CheckSubmissions = lazy(() => import("./components/check-submissions"));
// const PublishWeek = lazy(() => import('./components/publish-week'));

// const SignUp = lazy(() => import("./pages/signup"));
const Login = lazy(() => import("./pages/login"));

const AnambraTeachersForm = lazy(
  () => import("./components/anambra-state-teachers-competition-form")
);
const SoutheastTeachersForm = lazy(
  () => import("./components/teachers-registration-form")
);
const ScholarshipForm = lazy(
  () => import("./components/dipf-scholarship-form")
);
const WeeeklyQuizForm = lazy(
  () => import("./components/bbc-weekly-quiz-regForm")
);

const ScholarshipBeneficiaries2023 = lazy(
  () => import("./components/2023-scholarship-beneficiaries")
);
const ScholarshipBeneficiaries2024 = lazy(
  () => import("./components/2024-scholarship-beneficiaries")
);
const AboutBBCQuiz = lazy(() => import("./components/about-bbc-weekly-quiz"));

const TakeQuiz = lazy(() => import("./pages/take-quiz"));
const QuizInProgress = lazy(() => import("./components/quiz-in-progress"));

const AllParticipants = lazy(
  () => import("./components/all-quiz-participants")
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
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/take-quiz" element={<TakeQuiz />} />

          {/* Protect Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="questions" element={<QuestionList />} />
              <Route path="questions/new" element={<QuestionForm />} />
              <Route path="questions/:id" element={<QuestionForm />} />
              <Route path="quiz-submissions" element={<CheckSubmissions />} />
              <Route path="quiz-participants" element={<AllParticipants />} />
            </Route>
          </Route>

          <Route path="/take-quiz/questions" element={<QuizInProgress />} />

          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/login" element={<Login />} />

          <Route path="/scholarship-form" element={<ScholarshipForm />} />
          <Route
            path="/programs/bbc-weekly-online-quiz-registration-form"
            element={<WeeeklyQuizForm />}
          />
          <Route
            path="/programs/about-bbc-weekly-online-quiz"
            element={<AboutBBCQuiz />}
          />

          <Route
            path="/programs/2025-southeast-teachers-competition-registration-form"
            element={<SoutheastTeachersForm />}
          />
          <Route
            path="/programs/2025-anambra-state-teachers-competition-registration-form"
            element={<AnambraTeachersForm />}
          />

          <Route
            path="/programs/2023-scholarship-beneficiaries"
            element={<ScholarshipBeneficiaries2023 show={false} />}
          />
          <Route
            path="/programs/2024-scholarship-beneficiaries"
            element={<ScholarshipBeneficiaries2024 show={false} />}
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
