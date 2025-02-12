import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../Firebase/firebasae.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';



const Login = () => {
    const { signInWithEmail, googleProvider } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [showPassword, setShowPassWord] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                Swal.fire({
                    title: 'Welcome back!',
                    text: `Hello, ${user.displayName || user.email}`,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                navigate('/'); // Navigate to the home page
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage); // Set error message
                Swal.fire({
                    title: 'Error',
                    text: 'Google Sign-In failed. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setEmail(email);
        signInWithEmail(email, password)
            .then((result) => {
                const user = result.user;
                Swal.fire({
                    title: 'Login Successful!',
                    text: `Welcome back, ${user.email}`,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                navigate('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Please check your email and password.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <Helmet><title>Login | BlogWebsite </title></Helmet>
            <div className="w-full max-w-md p-6  shadow-lg rounded-lg">
                <h1 className="text-2xl lg:text-4xl font-bold text-center mb-6">Login Now!</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-sm lg:text-base">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text text-sm lg:text-base">Password</span>
                        </label>
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassWord(!showPassword)}
                            className="absolute right-3 top-14  text-lg"
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        <Link state={{ email }} className="label-text-alt text-sm text-right mt-2 block">
                            Forgot password?
                        </Link>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-gradient-to-r from-purple-600 to-purple-800 w-full">Login</button>
                    </div>
                </form>
                <p className="mt-4 text-sm text-center">
                    New here?{' '}
                    <Link to="/register" className="text-purple-600 font-medium">
                        Register now
                    </Link>
                </p>
                <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-neutral mt-4 w-full"
                >
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;