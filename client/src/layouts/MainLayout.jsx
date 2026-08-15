import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          © 2026 Real Estate Hub. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default MainLayout;