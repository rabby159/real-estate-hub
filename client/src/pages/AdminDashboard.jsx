import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-gray-500">
            Manage properties, inquiries, and customers.
          </p>
        </div>
      </section>

      {/* Dashboard Cards */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-5">
          {/* Properties */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Properties</p>

            <p className="mt-3 text-3xl font-bold text-gray-900">—</p>

            <p className="mt-2 text-sm text-gray-500">Total properties</p>
          </div>

          {/* Customers */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Customers</p>

            <p className="mt-3 text-3xl font-bold text-gray-900">—</p>

            <p className="mt-2 text-sm text-gray-500">Registered customers</p>
          </div>

          {/* Inquiries */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Inquiries</p>

            <p className="mt-3 text-3xl font-bold text-gray-900">—</p>

            <p className="mt-2 text-sm text-gray-500">Total inquiries</p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Pending</p>

            <p className="mt-3 text-3xl font-bold text-gray-900">—</p>

            <p className="mt-2 text-sm text-gray-500">Pending inquiries</p>
          </div>
        </div>

        {/* Management */}
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Property Management
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Add, update, and remove property listings.
          </p>

          <Link
            to="/admin/properties"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Manage Properties
          </Link>
        </div>
        <div className=" rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Inquiry Management
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Review customer inquiries and update their status.
          </p>

          <Link
            to="/admin/inquiries"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Manage Inquiries
          </Link>
        </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
