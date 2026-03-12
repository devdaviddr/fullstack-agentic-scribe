import { useNavigate } from 'react-router-dom';
import LiveConsultationView from './LiveConsultationView';

export default function LivePage() {
  const navigate = useNavigate();
  return <LiveConsultationView onBack={() => navigate('/dashboard')} />;
}
