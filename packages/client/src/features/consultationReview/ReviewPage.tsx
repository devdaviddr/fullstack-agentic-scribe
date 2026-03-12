import { useNavigate } from 'react-router-dom';
import ConsultationReviewView from './ConsultationReviewView';

export default function ReviewPage() {
  const navigate = useNavigate();
  return <ConsultationReviewView onBack={() => navigate('/dashboard')} />;
}
