import { useState, useEffect } from "react";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()

    // Credentials
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Provider methods
    const { register, isAuthenticated } = useAuth();

    const handleSubmitRegister = async (e) => {
        e.preventDefault()

        await register({
            fname,
            lname,
            email,
            countryCode,
            phoneNumber,
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
        <form className="center-page" onSubmit={handleSubmitRegister}>
            <div className="flex flex-col justify-center items-center text-2xl space-y-4">

                <div className="flex flex-col items-center space-y-2">
                    <img
                        src="/src/assets/static/logo.png"
                        alt="Logo"
                        className="w-16 cursor-pointer"
                    />
                    <h1 className="font-bold font-title-secondary">Welcome! Register here</h1>
                </div>

                <div className="w-3/5 flex justify-between">
                    <input
                        className="border border-black text-sm p-2 bg-white rounded-3xl w-[48%]"
                        type="text"
                        placeholder="First name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                    />
                    <input
                        className="border border-black text-sm p-2 bg-white rounded-3xl w-[48%]"
                        type="text"
                        placeholder="Last name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        required
                    />
                </div>

                <input
                    className="border border-black text-sm p-2 bg-white rounded-3xl w-3/5"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="flex w-3/5 border border-black text-sm p-2 bg-white rounded-3xl">
                    <select
                        className={`bg-transparent focus:outline-none w-[30%] text-center mr-2 ${countryCode ? "text-black" : "text-gray-400"
                            }`}
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        required
                        aria-label="Country code"
                    >
                        <option value="">+ Code</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+81">🇯🇵 +81</option>
                        <option value="+86">🇨🇳 +86</option>
                        <option value="+971">🇦🇪 +971</option>
                    </select>
                    <input
                        className="bg-transparent focus:outline-none w-full"
                        type="tel"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="w-3/5 space-y-2">
                    <input
                        className="border border-black text-sm p-2 bg-white rounded-3xl w-full"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex items-center space-x-2">
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
                <p className="w-3/5 text-black text-sm mb-6 mt-1">By continuing, you are agreeing to our <span className="link cursor-pointer">Terms Of Service</span> and <span className="link cursor-pointer">Privacy Policy</span></p>

                <button className="border-none p-4 text-white bg-[#156B56] btn-hover-effect rounded-full w-3/7 h-15 flex items-center justify-center text-md cursor-pointer">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default Register;
