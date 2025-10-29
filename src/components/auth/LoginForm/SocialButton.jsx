import './LoginForm.module.css';

export const SocialButton = ({ icon, provider, onClick }) => {
  return (
    <button onClick={onClick} className="social-button">
      {icon}
      <span>{provider}로 계속하기</span>
    </button>
  );
};
