import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function Header() {
    // Navigation
    const location = useLocation();
    const navigate = useNavigate()

    const { isAuthenticated, logout } = useAuth();
    const [activeButton, setActiveButton] = useState(null);
    const [dropdown, setDropdown] = useState(false);
    const [accessibiliy, showAccessibility] = useState(false);


    useEffect(() => {
        if (location.pathname === "/login") {
            setActiveButton("login");
        } else if (location.pathname === "/register") {
            setActiveButton("register");
        } else {
            setActiveButton(null);
        }
    }, [location.pathname]);

    const getNavClass = ({ isActive }) =>
        isActive
            ? "relative cursor-pointer after:block after:h-[2px] after:w-full after:bg-[#156B56] after:transition-all after:duration-300 text-[#156B56]"
            : "relative cursor-pointer after:block after:h-[2px] after:w-0 after:bg-[#156B56] after:transition-all after:duration-300 hover:after:w-full";

    const isActiveDropdownItem = (path) =>
        location.pathname === path ? "bg-[#006700] text-white" : "";


    const handleProfileClick = () => {
        showAccessibility(false)
        setDropdown(prev => !prev)
    }

    const handleAccessibilityClick = () => {
        setDropdown(false)
        showAccessibility(prev => !prev)
    }

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        setDropdown(false)
        navigate('/home');
    };

    return (
        <header className="py-5 relative">
            <nav className="wrapper flex items-center justify-between relative">

                <div className="flex items-center gap-10">
                    <li>
                        <h1>
                            <NavLink to="/home">
                                <img src="/src/assets/static/logo.png" alt="Logo" className="w-16 cursor-pointer" />
                            </NavLink>
                        </h1>
                    </li>
                    <li>
                        <button className="cursor-pointer">
                            <FontAwesomeIcon icon={["fas", "sun"]} className="text-yellow-500 text-xl" />
                        </button>
                    </li>
                </div>


                <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-12">
                    <li>
                        <NavLink className={getNavClass} to="/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink className={getNavClass} to="/products">Products</NavLink>
                    </li>
                    <li>
                        <NavLink className={getNavClass} to="/bookings">Bookings</NavLink>
                    </li>
                    <li>
                        <NavLink className={getNavClass} to="/sustainability">Sustainability</NavLink>
                    </li>
                </div>


                <div className="flex items-center gap-10">
                    {!isAuthenticated ? (
                        <>
                            <li>
                                <NavLink
                                    to="/login"
                                    className={`block p-3 rounded-full transition cursor-pointer ${activeButton === "login" ?
                                        "bg-[#68DEA5] transition-colors duration-500" :
                                        "hover:bg-[#68DEA5]"
                                        }`}
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/register"
                                    className={`block border p-3 rounded-full transition cursor-pointer ${activeButton === "register" ?
                                        "bg-[#156B56] text-white transition-colors duration-500" :
                                        "hover:bg-[#156B56] hover:text-white"
                                        }`}
                                >
                                    Get Started
                                </NavLink>
                            </li>
                        </>
                    ) : <>

                        <div className='relative'>
                            <FontAwesomeIcon icon={["fas", "fa-user"]} className="text-4xl cursor-pointer" onClick={handleProfileClick} />
                            {dropdown && (
                                <div className="dropdown-container">
                                    <div className={`dropdown-item ${isActiveDropdownItem("/profile")}`} onClick={() => navigate('/profile')}>Profile</div>
                                    <div className={`dropdown-item`} onClick={handleAccessibilityClick}>Accessibility</div>
                                    <div className={`dropdown-item`} onClick={handleLogout}>Logout</div>
                                </div>
                            )}
                            {accessibiliy && (
                                <div className="dropdown-container">
                                    <div className="dropdown-item ">Accessible item 1</div>
                                    <div className="dropdown-item">Accessible item 2</div>
                                </div>
                            )}
                        </div>
                    </>}
                </div>
            </nav>
        </header>
    );
}

export default Header;
