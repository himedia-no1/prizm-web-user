import AuthHeader from '@/components/auth/AuthHeader';

export default function AuthLayout({ children }) {
  return (
    <div className="auth-container">
      <AuthHeader />
      {children}
    </div>
  );
}
