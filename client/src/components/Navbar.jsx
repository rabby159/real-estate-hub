import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user, isAuthenticated, logout } = useAuth();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "font-semibold text-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/">
          <img
            className="h-20 w-20 rounded-l-sm object-contain lg:h-15 lg:w-30"
            src={logo}
            alt="EstateHub"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/properties" className={navLinkClass}>
            Properties
          </NavLink>
          <NavLink
  to="/about"
  className={navLinkClass}
>
  About Us
</NavLink>

          {/* Customer Navigation */}
          {isAuthenticated && user?.role === "customer" && (
            <>
              <NavLink to="/favorites" className={navLinkClass}>
                Favorites
              </NavLink>

              <NavLink to="/compare" className={navLinkClass}>
                Compare
              </NavLink>

              <NavLink to="/my-inquiries" className={navLinkClass}>
                Inquiries
              </NavLink>
            </>
          )}

          {/* Admin Navigation */}
          {isAuthenticated && user?.role === "admin" && (
            <NavLink to="/admin" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}

          {/* Authentication */}
          {!isAuthenticated ? (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          ) : (
            /* User Profile */
            <div ref={dropdownRef} className="relative flex items-center gap-3">
              {/* Greeting */}
              <span className="text-sm text-gray-600">Hi, {user?.name}</span>

              {/* User Avatar */}
              <button
                type="button"
                onClick={() => setShowProfileMenu((previous) => !previous)}
                className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-gray-300 bg-gray-100 text-sm font-bold text-gray-700 transition hover:border-blue-500 hover:ring-2 hover:ring-blue-100"
                aria-label="Open user menu"
              >
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user?.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  userInitial
                )}
              </button>

              {/* Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                  {/* User Information */}
                  <div className="border-b border-gray-100 px-4 py-4">
                    <p className="font-semibold text-gray-900">{user?.name}</p>

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  {/* Logout */}
                  <div className="p-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile button placeholder */}
        <button
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm md:hidden"
          type="button"
        >
          Menu
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
