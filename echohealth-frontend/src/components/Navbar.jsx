import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Logo from '../assets/logoechohealth.png';

export default function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <header className="absolute inset-x-0 top-0 flex items-center justify-between px-8 py-4 z-30">
      {/* Left: larger logo + name */}
      <div className="flex items-center space-x-3">
        {/* h-16 makes it noticeably bigger */}
        <img src={Logo} alt="EchoHealth Logo" className="h-16 w-auto" />
        <span className="text-white text-xl font-semibold"></span>
      </div>

      {/* Right: nav links */}
      <nav className="flex items-center space-x-6">
        {!isAuthenticated && (
          <>
            <button
              onClick={() => loginWithRedirect()}
              className="text-white hover:underline"
            >
              Sign in
            </button>
            <button
              onClick={() => loginWithRedirect()}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-medium py-2 px-5 rounded-full shadow-lg hover:opacity-90 transition"
            >
              Create an account for FREE
            </button>
            <button className="flex items-center text-white hover:underline">
              English
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </>
        )}
        {isAuthenticated && (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="bg-red-500 text-white font-medium py-2 px-5 rounded-full shadow-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
