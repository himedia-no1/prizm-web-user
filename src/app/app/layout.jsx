import '../globals.css';
import AppWrapper from '../AppWrapper';

export const metadata = {
  title: 'PRIZM - AI 기반 개발자 협업 메신저',
  description: 'AI-powered developer collaboration messenger',
};

export default function AppLayout({ children }) {
  return <AppWrapper>{children}</AppWrapper>;
}
