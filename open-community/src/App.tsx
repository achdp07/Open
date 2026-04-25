import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
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
import AdminDashboard from '../src/pages/dashboard/Admin/AdminDashboard';
import AdminUsers from '../src/pages/dashboard/Admin/AdminUsers';
import AdminPrograms from '../src/pages/dashboard/Admin/AdminPrograms';
import AdminSettings from '../src/pages/dashboard/Admin/AdminSettings';

import InstructorLayout from './layouts/InstractorLayout';
import InstructorDashboard from './pages/dashboard/instructor/InstractorDashboard';
import InstructorPrograms from './pages/dashboard/instructor/InstractorPrograms';
import InstructorLearners from './pages/dashboard/instructor/InstructorLearners';

import ModeratorLayout from './layouts/ModeratorLayout';
import ModeratorDashboard from './pages/dashboard/Moderator/ModeratorDashboard';
import ModeratorCommunity from './pages/dashboard/Moderator/ModeratorCommunity';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:id" element={<ProgramDetail />} />

        {/* Member Dashboard — layout wraps all child routes */}
        <Route path="/dashboard/member" element={<MemberLayout />}>
          <Route index element={<MemberDashboard />} />
          <Route path="programs" element={<MemberPrograms />} />
          <Route path="community" element={<MemberCommunity />} />
          <Route path="events" element={<MemberEvents />} />
          <Route path="subscription" element={<MemberSubscription />} />
          <Route path="profile" element={<MemberProfile />} />
        </Route>

        {/* Admin Dashboard — layout wraps all child routes */}
        <Route path="/dashboard/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="programs" element={<AdminPrograms />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Instructor Dashboard — layout wraps all child routes */}
        <Route path="/dashboard/instructor" element={<InstructorLayout />}>
          <Route index element={<InstructorDashboard />} />
          <Route path="programs" element={<InstructorPrograms />} />
          <Route path="learners" element={<InstructorLearners />} />
        </Route>

        {/* Moderator Dashboard — layout wraps all child routes */}
        <Route path="/dashboard/moderator" element={<ModeratorLayout />}>
          <Route index element={<ModeratorDashboard />} />
          <Route path="community" element={<ModeratorCommunity />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}