import { useState, useEffect } from "react";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate()

    // Credentials
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Provider methods
    const { isAuthenticated, login } = useAuth();

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        await login({
            email,
            password
        })
    }

    // If authenticated on load then redirect to homepage
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);


    return (
        <form className="center-page" onSubmit={handleSubmitLogin}>
            <div className="flex flex-col justify-center items-center text-2xl space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <img
                        src="/src/assets/static/logo.png"
                        alt="Logo"
                        className="w-16 cursor-pointer"
                    />
                    <h1 className="font-bold font-title-secondary">Welcome back!</h1>
                </div>
                <input
                    className="border border-black text-sm p-2 bg-white rounded-3xl w-3/5"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="w-3/5  space-y-3">
                    <input
                        className="border border-black text-sm p-2 bg-white rounded-3xl w-full"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="flex space-x-2">
                        <input
                            className="border border-black p-2 bg-white rounded-3xl"
                            type="checkbox"
                            id="showPassword"
                            onClick={() => setShowPassword((prev) => !prev)}
                        />
                        <label className="text-sm text-black whitespace-nowrap" htmlFor="showPassword">
                            Show Password
                        </label>
                    </div>
                </div>
                <button className="border-none p-4 text-white bg-[#156B56] btn-hover-effect rounded-full w-3/7 h-15 flex items-center justify-center text-md cursor-pointer">Submit</button>
            </div>
        </form>
    );
}

export default Login;
