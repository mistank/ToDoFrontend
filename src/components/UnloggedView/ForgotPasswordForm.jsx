/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

export default function SignUpForm({ setMode }) {
  return (
    <form className="flex flex-col space-y-4 text-white w-[80%] items-center relative">
      <h2 className="text-3xl font-bold mb-2 text-left w-[100%]">Forgot Password</h2>
      <p className="text-left w-[100%] ">Please enter your email to reset your password.</p>
      <input type="email" placeholder="Email" className=" placeholder:text-white p-2 border rounded-md w-[100%] bg-transparent focus:outline-none" />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md w-[100%]">
        Reset Password
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
