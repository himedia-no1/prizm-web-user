'use client';

import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { Sparkles } from '@/components/common/icons';
import './login.css';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // TODO: Implement actual login logic
    router.push('/workspace');
  };

  return (
    <div className="login-card">
      <div className="login-header">
        <Sparkles size={48} className="login-icon" />
        <h1 className="login-title">PRIZM</h1>
        <p className="login-subtitle">AI 기반 개발자 협업 메신저</p>
      </div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
