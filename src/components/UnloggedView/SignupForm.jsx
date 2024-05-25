/* eslint-disable react/prop-types */
import googleIcon from '../../assets/icons/google_icon.svg';

export default function ForgotPasswordForm({ setMode }) {
  return (
    <form className="flex flex-col space-y-4 text-white w-[80%] items-center">
      <h2 className="text-3xl font-bold mb-2 text-left w-[100%]">Sign Up</h2>
      <p className="text-left w-[100%] ">Please enter your details to sign up.</p>
      <input type="text" placeholder="Username" className=" placeholder:text-white p-2 border rounded-md w-[100%] bg-transparent focus:outline-none" />
      <input type="email" placeholder="Email" className=" placeholder:text-white p-2 border rounded-md w-[100%] bg-transparent focus:outline-none" />
      <input type="password" placeholder="Password" className="placeholder:text-white p-2 border rounded-md w-[100%] bg-transparent focus:outline-none" />
      <input type="password" placeholder="Confirm Password" className="placeholder:text-white p-2 border rounded-md w-[100%] bg-transparent focus:outline-none" />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md w-[100%]">
        Sign Up
      </button>
      <div className="flex items-center my-4 w-[100%]">
        <hr style={{ borderColor: '#4D4D4D' }} className="flex-grow border-t" />
        <span className="px-2 text-[#4D4D4D]">Or</span>
        <hr style={{ borderColor: '#4D4D4D' }} className="flex-grow border-t" />
      </div>
      <button className="p-2 text-white rounded-md w-[15%]">
        <img className="w-[100%]" src={googleIcon} alt="" />
      </button>
      <p className="text-center">
        Already Registered?{' '}
        <a onClick={() => setMode('login')} style={{ cursor: 'pointer' }} className="text-blue-500">
          Login
        </a>
      </p>
    </form>
  );
}
