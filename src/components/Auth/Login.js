import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, Loader2 } from "lucide-react";
import { login } from "../../api/auth";
import AuthImagePattern from "../../assets/patterns/AuthImagePattern";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formTouched, setFormTouched] = useState(false); // Tracks if form is submitted
  const [showError, setShowError] = useState(false); // For wrong username/password error

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormTouched(true);
    setShowError(false);
    setLoading(true);

    if (!username || !password) {
      setLoading(false);
      return;
    }

    try {
      const response = await login(username, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        window.location.reload();
      } else {
        
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='min-h-screen flex'>
      <div
        className='w-full lg:w-1/2 flex items-center justify-center'
        style={{ backgroundColor: "#0E1113" }}
      >
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
              Sign in to your account
            </h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleLogin}>
            <input type='hidden' name='remember' value='true' />
            <div className='rounded-md shadow-sm space-y-4'>
              <div className='relative'>
                <label htmlFor='username' className='sr-only'>
                  Username
                </label>
                <input
                  id='username'
                  name='username'
                  type='text'
                  autoComplete='username'
                  required
                  className='appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-300 focus:outline-none focus:z-10 sm:text-sm'
                  placeholder='Username'
                  style={{ paddingLeft: "2.5rem", backgroundColor: "#181C1F" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20'>
                  <User className='h-5 w-5 text-gray-400' />
                </div>
              </div>
              <div className='relative'>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? "text" : "password"}
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-300 focus:outline-none focus:z-10 sm:text-sm'
                  placeholder='Password'
                  style={{ paddingLeft: "2.5rem", backgroundColor: "#181C1F" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20'>
                  <Lock className='h-5 w-5 text-gray-400' />
                </div>
                <div
                  className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer z-20'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5 text-gray-400' />
                  ) : (
                    <Eye className='h-5 w-5 text-gray-400' />
                  )}
                </div>
              </div>
            </div>
            <div>
              <button
                type='submit'
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-transform ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className='flex items-center'>
                    <Loader2 className='h-5 w-5 animate-spin mr-2' />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
            <div className='text-center'>
              <p className='text-gray-400 inline'>Don't have an account? </p>
              <a
                href='/signup'
                className='text-indigo-600 hover:text-indigo-500'
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className='hidden lg:flex lg:w-1/2'>
        <AuthImagePattern
          title='Welcome Back!'
          subtitle='Please sign in to continue.'
        />
      </div>
    </div>
  );
};

export default Login;
