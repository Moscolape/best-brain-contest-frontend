import { NavLink, Outlet } from "react-router-dom";
import PageWrapper from "./pageWrapper";

export default function AdminLayout() {
  return (
    <PageWrapper>
      <div className="flex min-h-screen font-Montserrat">
        <aside className="w-64 bg-[#071125] text-white p-4 border-b-gray-100 border-b-2">
          <h2 className="text-xl font-bold mb-4">ADMIN PANEL</h2>
          <nav className="space-y-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-500 font-bold"
                  : "block hover:text-blue-300"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/questions"
              end
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-500 font-bold"
                  : "block hover:text-blue-300"
              }
            >
              Questions
            </NavLink>

            <NavLink
              to="/admin/questions/new"
              end
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-500 font-bold"
                  : "block hover:text-blue-300"
              }
            >
              Create Question
            </NavLink>

            <NavLink
              to="/admin/quiz-submissions"
              end
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-500 font-bold"
                  : "block hover:text-blue-300"
              }
            >
              Quiz Submissions
            </NavLink>

            <NavLink
              to="/admin/quiz-participants"
              end
              className={({ isActive }) =>
                isActive
                  ? "block text-blue-500 font-bold"
                  : "block hover:text-blue-300"
              }
            >
              Quiz Participants
            </NavLink>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </PageWrapper>
  );
}