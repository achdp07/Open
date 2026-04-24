import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}