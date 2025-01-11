import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="main-bg mt-5">
            <div className="form-container">
                <h2 className="text-center text-light mb-4">
                    {isLogin ? 'Login' : 'Register'}
                </h2>
                <form>
                    {!isLogin && (
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label text-light">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name"
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-light">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-light">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <p className="text-center text-light mt-3">
                    {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
                    <button className="btn btn-link text-decoration-none text-light p-0" onClick={toggleForm}>
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;