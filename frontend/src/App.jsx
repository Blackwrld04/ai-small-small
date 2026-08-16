import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Landing from './pages/Landing.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import ChildLogin from './pages/ChildLogin.jsx';
import Curriculum from './pages/Curriculum.jsx';
import Chat from './pages/Chat.jsx';
import ChatHistory from './pages/ChatHistory.jsx';
import Profile from './pages/Profile.jsx';
import Progress from './pages/Progress.jsx';
import Settings from './pages/Settings.jsx';
import ParentDashboard from './pages/dashboard/ParentDashboard.jsx';
import LearnerDashboard from './pages/dashboard/LearnerDashboard.jsx';
import SchoolDashboard from './pages/dashboard/SchoolDashboard.jsx';
import ForParents from './pages/ForParents.jsx';
import ForSchools from './pages/ForSchools.jsx';
import ForSponsors from './pages/ForSponsors.jsx';
import About from './pages/About.jsx';
import { useAuth } from './AuthContext.jsx';

function Dashboard() {
  const { user } = useAuth();
  if (user.role === 'parent') return <ParentDashboard />;
  if (user.role === 'learner' || user.role === 'child') return <LearnerDashboard />;
  return <SchoolDashboard />;
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kid-login" element={<ChildLogin />} />
        <Route path="/for-parents" element={<ForParents />} />
        <Route path="/for-schools" element={<ForSchools />} />
        <Route path="/for-sponsors" element={<ForSponsors />} />
        <Route path="/about" element={<About />} />

        {/* Protected */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/curriculum" element={<ProtectedRoute><Curriculum /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/chat-history" element={<ProtectedRoute><ChatHistory /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
