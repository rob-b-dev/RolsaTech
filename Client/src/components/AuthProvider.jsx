import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';

// Helpers
import { isLoggedIn } from "../helpers/jwt";
import { showToast } from "../helpers/showToast";

// Services
import authService from "../services/authentication";

// Context file
import { AuthContext } from '../hooks/AuthContext';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true) // Set loading state for verify to allow time for other components

    // /verify called on every route click to check the authenticated state of the user
    useEffect(() => {
        const checkAuthenticated = async () => {
            try {
                const response = await authService.verifyToken();
                handleAuth(response.jwt)
            } catch (error) {
                console.error(error.response?.data)
            } finally {
                setLoading(false)
            }
        }
        checkAuthenticated()
    }
    )

    const login = async (data) => {
        try {
            const response = await authService.login(data)
            handleAuth(response.jwt)
            showToast('Login successful', 'success')
        } catch (error) {
            // If error object contains errors property, display the error message from the format express-validator sent the error
            if (error.errors) {
                showToast(error.errors?.msg, 'error')
            }
            // Display error.response?.data to user
            showToast(error, 'error')
        }
    }

    const register = async (data) => {
        try {
            const response = await authService.register(data)
            handleAuth(response.jwt)
            showToast('Registration successful', 'success')
        } catch (error) {
            console.log(error)
            if (error.errors) {
                showToast(error.errors?.msg, 'error')
            }
            showToast(error, 'error')

        }
    }

    const logout = async () => {
        try {
            const response = await authService.logout()
            handleAuth(response.jwt)
            showToast('Successfully logged out', 'success')
        } catch (error) {
            console.error('logout failed', error.response?.data)
        }
    }

    const handleAuth = (jwt) => {
        setIsAuthenticated(isLoggedIn(jwt))
    }

    return (
        <AuthContext.Provider.Provider value={{ isAuthenticated, login, register, logout }}>
            {/* Represents the components using this provider function */}
            {loading ? null : (
                <>
                    {children}
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        style={{ bottom: '60px' }}
                    />
                </>
            )}
        </AuthContext.Provider.Provider>
    )

}


export default AuthProvider