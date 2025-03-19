import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client'

// Global styles
import { ToastContainer } from 'react-toastify';
import './index.css';

// Components
import AuthProvider from './components/AuthProvider';
import Homepage from './components/Homepage';
import Header from './components/Header';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import NotFound from './components/NotFound';


// Fontawesome setup
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fab, fas, far);

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Content />
      </AuthProvider>
    </Router>
  );
}

function Content() {
  const location = useLocation()
  const showHeaderOn = ["/home", "/login", "/register", "/profile"];
  const shouldShowHeader = showHeaderOn.includes(location.pathname);
  const definedPaths = ["/home", "/login", "/register", "/profile"];
  const isDefinedPath = definedPaths.includes(location.pathname);
  // const showFooterOn = ["/home", "/booksessions", "/mysessions", "/publishsessions"];
  // const shouldShowFooter = showFooterOn.includes(location.pathname);

  return (
    <div>
      {shouldShowHeader && <Header />}
      {
        isDefinedPath ? (
          <div className='wrapper' >
            <Routes>
              <Route path='/home' element={<Homepage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
            </Routes >
          </div >
        ) :
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            < Route path="*" element={< NotFound />} />
          </Routes >
      }
    </div>
  )
}

export default App

createRoot(document.getElementById('root')).render(
  <App />
)
