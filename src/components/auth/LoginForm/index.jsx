import { SocialButton } from './SocialButton';
import { GitHub, Google, Microsoft } from '@/components/common/icons';
import './LoginForm.module.css';

export const LoginForm = ({ onLogin }) => {
  return (
    <div className="login-buttons">
      <SocialButton provider="GitHub" icon={<GitHub size={22} />} onClick={onLogin} />
      <SocialButton provider="Google" icon={<Google size={22} />} onClick={onLogin} />
      <SocialButton provider="Microsoft" icon={<Microsoft size={22} />} onClick={onLogin} />
    </div>
  );
};
