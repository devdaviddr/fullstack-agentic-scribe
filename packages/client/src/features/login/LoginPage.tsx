import { useNavigate } from 'react-router-dom';
import LoginView from './LoginView';

export default function LoginPage() {
  const navigate = useNavigate();
  return <LoginView onLogin={() => navigate('/dashboard')} />;
}
