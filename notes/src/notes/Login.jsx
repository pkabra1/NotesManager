import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login, register } = useAuth();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            let success;
            if (isRegistering) {
                success = await register(email, password);
                if (success) {
                    setIsRegistering(false);
                    setError('Registration successful! Please login.');
                    setEmail('');
                    setPassword('');
                } else {
                    setError('Registration failed. Email might already be in use.');
                }
            } else {
                success = await login(email, password);
                if (success) {
                    navigate(from, { replace: true });
                } else {
                    setError('Invalid email or password.');
                }
            }
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '100px' }}>
            <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">
                    {isRegistering ? 'Sign Up' : 'Login'}
                </h2>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="input-group">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-control"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="btn btn-outline-secondary"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary w-100"
                    >
                        {isLoading ? 'Processing...' : isRegistering ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <button
                        type="button"
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setEmail('');
                            setPassword('');
                            setError('');
                        }}
                        className="btn btn-link"
                        disabled={isLoading}
                    >
                        {isRegistering
                            ? 'Already have an account? Login'
                            : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
