import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "font-semibold text-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-900"
        >
          Real Estate Hub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">

          <NavLink
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/properties"
            className={navLinkClass}
          >
            Properties
          </NavLink>

          {isAuthenticated && user?.role === "customer" && (
            <>
              <NavLink
                to="/favorites"
                className={navLinkClass}
              >
                Favorites
              </NavLink>

              <NavLink
                to="/compare"
                className={navLinkClass}
              >
                Compare
              </NavLink>

              <NavLink
                to="/inquiries"
                className={navLinkClass}
              >
                Inquiries
              </NavLink>
            </>
          )}

          {isAuthenticated && user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={navLinkClass}
            >
              Dashboard
            </NavLink>
          )}

          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className={navLinkClass}
              >
                Login
              </NavLink>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Hi, {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Logout
              </button>
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