/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import googleIcon from '../../assets/icons/google_icon.svg';
import useGoogleLoginHook from '../hooks/useGoogleLogin.jsx';

export default function LoginForm({ setMode }) {
  const initiateGoogleLogin = useGoogleLoginHook();
  return (
    <form className="flex flex-col space-y-4 text-white w-[80%] items-center">
      <h2 className="text-3xl font-bold mb-2 text-left w-[100%]">Login</h2>
      <p className="text-left w-[100%] ">Please enter your credentials to login.</p>
      <input type="text" placeholder="Username" autoComplete="name" className=" placeholder:text-white p-2 border rounded-md w-[100%] bg-transparent focus:outline-none" />
      <input type="password" placeholder="Password" autoComplete="email" className="placeholder:text-white p-2 border rounded-md w-[100%] bg-transparent focus:outline-none" />
      <div className="flex items-center w-[100%]">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me" className="ml-2">
          Remember me
        </label>
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md w-[100%]">
        Login
      </button>
      <a onClick={() => setMode('forgot-pass')} style={{ cursor: 'pointer' }} className="text-center text-blue-500">
        Forgot password?
      </a>
      <div className="flex items-center my-4 w-[100%]">
        <hr style={{ borderColor: '#4D4D4D' }} className="flex-grow border-t" />
        <span className="px-2 text-[#4D4D4D]">Or</span>
        <hr style={{ borderColor: '#4D4D4D' }} className="flex-grow border-t" />
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          initiateGoogleLogin();
        }}
        className="p-2 text-white rounded-md w-[15%]"
      >
        <img className="w-[100%]" src={googleIcon} alt="" />
      </button>
      <p className="text-center">
        Don't have an account?{' '}
        <a onClick={() => setMode('signup')} style={{ cursor: 'pointer' }} className="text-blue-500">
          Sign up
        </a>
      </p>
    </form>
  );
}
