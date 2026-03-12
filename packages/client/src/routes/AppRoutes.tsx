import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import LoginPage from '../features/login/LoginPage';
import LivePage from '../features/liveConsultation/LivePage';
import ReviewPage from '../features/consultationReview/ReviewPage';
import Dashboard from '../features/dashboard/Dashboard';
import Layout from './Layout';



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/live-consultation" element={<LivePage />} />
        <Route path="/consultation-review" element={<ReviewPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
