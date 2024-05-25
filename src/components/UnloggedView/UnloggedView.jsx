import { useState } from 'react';
import LoginForm from './LoginForm.jsx';
import ForgotPasswordForm from './ForgotPasswordForm.jsx';
import SignUpForm from './SignupForm.jsx';

export default function UnloggedView() {
  const [mode, setMode] = useState('login');

  let form;
  switch (mode) {
    case 'login':
      form = <LoginForm setMode={setMode} />;
      break;
    case 'signup':
      form = <SignUpForm setMode={setMode} />;
      break;
    case 'forgot-pass':
      form = <ForgotPasswordForm setMode={setMode} />;
      break;
    default:
      form = <LoginForm setMode={setMode} />;
  }

  return (
    <main className="flex items-center justify-center h-[100vh] bg-[#131517]">
      <div style={{ boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.3)' }} className="relative w-[30%] h-[80vh] flex items-center justify-center">
        <div className="z-0 absolute top-0 left-0" style={{ animation: 'slowfloat 5s ease-in-out infinite' }}>
          <div className="transform translate-x-[-50%] translate-y-[-30%] w-48 h-48 bg-[#5051F9] rounded-full"></div>
        </div>
        <div className="z-0 absolute bottom-0 right-0" style={{ animation: 'slowfloat 5s ease-in-out infinite', animationDelay: '2s' }}>
          <div className="transform translate-x-[50%] translate-y-[30%] w-48 h-48 bg-[#5051F9] rounded-full"></div>
        </div>
        <div className="w-[100%] h-[80vh] bg-transparent border border-white border-solid rounded-3xl backdrop-filter backdrop-blur-md bg-opacity-10 flex items-center justify-center">{form}</div>
      </div>
    </main>
  );
}
