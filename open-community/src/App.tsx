import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ScrollToTop from './components/ScrollToTop';
// import { AnimatePresence } from "framer-motion";

import RoleGuard from './guards/RoleGuard';

import Home from './pages/Home';
import Join from './pages/Join';
import ProgramsPage from './pages/ProgramsPage';
import ProgramDetail from './pages/ProgramDetail';

import MemberLayout from './layouts/MemberLayout';
import MemberDashboard from './pages/dashboard/member/MemberDashboard';
import MemberPrograms from './pages/dashboard/member/MemberPrograms';
import MemberCommunity from './pages/dashboard/member/MemberCommunity';
import MemberEvents from './pages/dashboard/member/MemberEvents';
import MemberSubscription from './pages/dashboard/member/MemberSubscription';
import MemberProfile from './pages/dashboard/member/MemberProfile';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/dashboard/Admin/AdminDashboard';
import AdminUsers from './pages/dashboard/Admin/AdminUsers';
import AdminPrograms from './pages/dashboard/Admin/AdminPrograms';
import AdminSettings from './pages/dashboard/Admin/AdminSettings';

import InstructorLayout from './layouts/InstractorLayout';
import InstructorDashboard from './pages/dashboard/instructor/InstractorDashboard';
import InstructorPrograms from './pages/dashboard/instructor/InstractorPrograms';
import InstructorLearners from './pages/dashboard/instructor/InstructorLearners';

import ModeratorLayout from './layouts/ModeratorLayout';
import ModeratorDashboard from './pages/dashboard/Moderator/ModeratorDashboard';
import ModeratorCommunity from './pages/dashboard/Moderator/ModeratorCommunity';

import NotFound from './components/NotFound';

import { useAuth } from './context/AuthContext';

export default function App() {
  const { appRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-dark border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:id" element={<ProgramDetail />} />

        {/* Member */}
        <Route
          element={
            <RoleGuard
              allowedRoles={['member', 'instructor', 'moderator', 'admin']}
              currentRole={appRole}
            />
          }
        >
          <Route path="/dashboard/member" element={<MemberLayout />}>
            <Route index element={<MemberDashboard />} />
            <Route path="programs" element={<MemberPrograms />} />
            <Route path="community" element={<MemberCommunity />} />
            <Route path="events" element={<MemberEvents />} />
            <Route path="subscription" element={<MemberSubscription />} />
            <Route path="profile" element={<MemberProfile />} />
          </Route>
        </Route>

        {/* Instructor */}
        <Route
          element={
            <RoleGuard
              allowedRoles={['instructor', 'admin']}
              currentRole={appRole}
              redirectTo="/dashboard/member"
            />
          }
        >
          <Route path="/dashboard/instructor" element={<InstructorLayout />}>
            <Route index element={<InstructorDashboard />} />
            <Route path="programs" element={<InstructorPrograms />} />
            <Route path="learners" element={<InstructorLearners />} />
          </Route>
        </Route>

        {/* Moderator */}
        <Route
          element={
            <RoleGuard
              allowedRoles={['moderator', 'admin']}
              currentRole={appRole}
              redirectTo="/dashboard/member"
            />
          }
        >
          <Route path="/dashboard/moderator" element={<ModeratorLayout />}>
            <Route index element={<ModeratorDashboard />} />
            <Route path="community" element={<ModeratorCommunity />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route
          element={
            <RoleGuard
              allowedRoles={['admin']}
              currentRole={appRole}
              redirectTo="/dashboard/member"
            />
          }
        >
          <Route path="/dashboard/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}