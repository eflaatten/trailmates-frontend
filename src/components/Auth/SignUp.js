import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, Mail, Check, X, Loader2 } from "lucide-react";
import { signup } from "../../api/auth";
import AuthImagePattern from "../../assets/patterns/AuthImagePattern";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formTouched, setFormTouched] = useState(false); 
  const [error, setError] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordRequirements({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setFormTouched(true);
    setError("");
    setLoading(true);

    if (!username || !email || !password) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    if (
      !passwordRequirements.length ||
      !passwordRequirements.uppercase ||
      !passwordRequirements.number ||
      !passwordRequirements.specialChar
    ) {
      setError("Password does not meet the requirements.");
      setLoading(false);
      return;
    }

    try {
      const response = await signup(username, email, password);
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      } else {
        setError("An error occurred during signup.");
      }
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className='min-h-screen flex'>
      <div
        className='w-full lg:w-1/2 flex items-center justify-center p-8'
        style={{ backgroundColor: "#0E1113" }}
      >
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
              Create your account
            </h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSignup}>
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
                <label htmlFor='email' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-300 focus:outline-none focus:z-10 sm:text-sm'
                  placeholder='Email address'
                  style={{ paddingLeft: "2.5rem", backgroundColor: "#181C1F" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20'>
                  <Mail className='h-5 w-5 text-gray-400' />
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
                  onChange={handlePasswordChange}
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
              {password && (
                <div className='text-gray-400 text-sm mt-2'>
                  <p
                    className={`flex items-center ${
                      passwordRequirements.length
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {passwordRequirements.length ? (
                      <Check className='h-4 w-4 mr-1' />
                    ) : (
                      <X className='h-4 w-4 mr-1' />
                    )}
                    At least 6 characters
                  </p>
                  <p
                    className={`flex items-center ${
                      passwordRequirements.uppercase
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {passwordRequirements.uppercase ? (
                      <Check className='h-4 w-4 mr-1' />
                    ) : (
                      <X className='h-4 w-4 mr-1' />
                    )}
                    At least one uppercase letter
                  </p>
                  <p
                    className={`flex items-center ${
                      passwordRequirements.number
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {passwordRequirements.number ? (
                      <Check className='h-4 w-4 mr-1' />
                    ) : (
                      <X className='h-4 w-4 mr-1' />
                    )}
                    At least one number
                  </p>
                  <p
                    className={`flex items-center ${
                      passwordRequirements.specialChar
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {passwordRequirements.specialChar ? (
                      <Check className='h-4 w-4 mr-1' />
                    ) : (
                      <X className='h-4 w-4 mr-1' />
                    )}
                    At least one special character
                  </p>
                </div>
              )}
            </div>
            <div>
              <button
                type='submit'
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-transform`}
              >
                {loading ? (
                  <div className='flex items-center'>
                    <Loader2 className='h-5 w-5 animate-spin mr-2' />
                    Signing up...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
            <div className='text-center'>
              <p className='text-gray-400 inline'>Already have an account? </p>
              <a
                href='/login'
                className='text-indigo-600 hover:text-indigo-500'
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className='hidden lg:flex lg:w-1/2'>
        <AuthImagePattern
          title='Welcome!'
          subtitle='Please create an account to continue.'
        />
      </div>
    </div>
  );
};

export default SignUp;
