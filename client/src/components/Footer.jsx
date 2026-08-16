import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-gray-100">
      {/* Footer Main */}
      <div className=" px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <img
              className="h-20 w-auto object-contain"
              src={logo}
              alt="EstateHub"
            />

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600">
              The leading real estate platform for the Bangladesh market,
              providing transparency and trust in property management.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Company
            </h3>

            <div className="mt-5 space-y-4">
              <a
                href="#"
                className="block text-sm text-gray-600 transition hover:text-blue-600"
              >
                About Us
              </a>

              <a
                href="#"
                className="block text-sm text-gray-600 transition hover:text-blue-600"
              >
                Careers
              </a>

              <a
                href="#"
                className="block text-sm text-gray-600 transition hover:text-blue-600"
              >
                Press
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Quick Links
            </h3>

            <div className="mt-5 space-y-4">
              <a
                href="/properties"
                className="block text-sm text-gray-600 transition hover:text-blue-600"
              >
                Properties
              </a>

              <a
                href="#"
                className="block text-sm text-gray-600 transition hover:text-blue-600"
              >
                Agents
              </a>

              <a
                href="#"
                className="block text-sm text-gray-600 transition hover:text-blue-600"
              >
                News
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Legal
            </h3>

            <div className="mt-5 space-y-4">
              <a
                href="#"
                className="block text-sm text-gray-600 transition hover:text-blue-600"
              >
                Terms of Service
              </a>

              <a
                href="#"
                className="block text-sm text-gray-600 transition hover:text-blue-600"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="block text-sm text-gray-600 transition hover:text-blue-600"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-gray-600">
            © 2026 RealStateHub. Built for trust.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
