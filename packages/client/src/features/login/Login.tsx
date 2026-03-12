import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Heading from '../../components/Heading';
import Text from '../../components/Text';
import FieldLabelWithLink from '../../components/FieldLabelWithLink';
import Label from '../../components/Label';
import Divider from '../../components/Divider';
import TextWithLink from '../../components/TextWithLink';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const canSubmit = email.trim() !== '' && password.trim() !== '';
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      {/* left illustration / marketing panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-800 items-center justify-center px-16">
        <div className="text-white max-w-sm space-y-4">
          <Heading level={1} className="text-blue-200">
            Empowering Healthcare with Intelligence
          </Heading>
          <Text variant="lead" className="text-blue-200">
            AI Scribe streamlines your documentation workflow, allowing you to
            focus on what matters most: your patients.
          </Text>
        </div>
      </div>

      {/* right side form */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="flex justify-center">
            <Logo />
          </div>

          <div className="text-center space-y-1">
            <Heading level={2} className="text-gray-900">
              Welcome back
            </Heading>
            <Text className="text-gray-500">
              Log in to manage your medical documentation
            </Text>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <TextInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="doctor@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="space-y-1">
              <FieldLabelWithLink
                htmlFor="password"
                label="Password"
                linkText="Forgot Password?"
              />
              <TextInput
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>

            <Button type="submit" disabled={!canSubmit}>
              Log In
            </Button>
          </form>

          <Divider text="Or continue with" className="my-6" />

          <Button variant="outline">
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>

          <TextWithLink
            text="New to AI Scribe?"
            linkText="Create an account"
            href="#"
          />
        </div>
      </div>
    </div>
  );
}
