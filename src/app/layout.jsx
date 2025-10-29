import './globals.css';

export const metadata = {
  title: 'PRIZM - AI 기반 개발자 협업 메신저',
  description: 'AI-powered developer collaboration messenger',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
