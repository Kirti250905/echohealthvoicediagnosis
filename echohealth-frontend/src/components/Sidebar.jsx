import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FaHome, FaStethoscope, FaComments, FaChartBar, FaSignOutAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function Sidebar() {
  const { logout } = useAuth0();

  const links = [
    { to: '/', label: 'Dashboard', icon: <FaHome /> },
    { to: '/diagnosis', label: 'Diagnosis', icon: <FaStethoscope /> },
    { to: '/echobuddy', label: 'EchoBuddy', icon: <FaComments /> },
    { to: '/exercises', label: 'Exercises', icon: <FaChartBar /> },
    { to: '/seekhelp', label: 'Seek Help', icon: <FaMapMarkerAlt /> },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r px-4 py-6 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="text-2xl font-extrabold text-blue-500 mb-10 flex justify-between items-center">
          <span className="text-[#00B2FF]">Echo<span className="text-[#00FFC6]">Health</span></span>
          <span className="text-gray-500 text-lg font-bold cursor-pointer">×</span>
        </div>

        {/* Nav Links */}
        <nav className="space-y-2">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className="flex items-center gap-2 text-gray-700 hover:text-red-600 text-sm font-medium px-4 py-2 transition-all"
      >
        <FaSignOutAlt className="text-lg" />
        Sign Out
      </button>
    </div>
  );
}
