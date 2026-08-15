import { useEffect, useState } from "react";
import api from "../services/api";

function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/properties?limit=50");

      setProperties(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch properties:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load properties."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/properties/${propertyId}`);

      setProperties((previous) =>
        previous.filter(
          (property) => property._id !== propertyId
        )
      );
    } catch (error) {
      console.error("Failed to delete property:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete property."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Administration
          </p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Property Management
              </h1>

              <p className="mt-2 text-gray-500">
                Manage all property listings.
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              + Add Property
            </button>

          </div>

        </div>
      </section>


      {/* Content */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Loading */}

        {loading && (
          <div className="space-y-4">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-xl bg-gray-200"
              />
            ))}

          </div>
        )}


        {/* Error */}

        {!loading && error && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

            <div className="text-5xl">
              ⚠️
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              Unable to load properties
            </h2>

            <p className="mt-2 text-gray-500">
              {error}
            </p>

            <button
              onClick={fetchProperties}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try Again
            </button>

          </div>
        )}


        {/* Empty */}

        {!loading &&
          !error &&
          properties.length === 0 && (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

              <div className="text-6xl">
                🏠
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                No Properties Found
              </h2>

              <p className="mt-2 text-gray-500">
                There are currently no property listings.
              </p>

            </div>
          )}


        {/* Properties Table */}

        {!loading &&
          !error &&
          properties.length > 0 && (

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="min-w-full">

                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">

                      <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                        Property
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                        Type
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                        Purpose
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                        Price
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                        Location
                      </th>

                      <th className="px-5 py-4 text-right text-sm font-semibold text-gray-600">
                        Actions
                      </th>

                    </tr>
                  </thead>


                  <tbody>

                    {properties.map((property) => {

                      const location =
                        property.location || {};

                      return (
                        <tr
                          key={property._id}
                          className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                        >

                          {/* Property */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-4">

                              <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">

                                {property.images?.[0] ? (
                                  <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-2xl">
                                    🏠
                                  </div>
                                )}

                              </div>

                              <div>

                                <p className="max-w-xs truncate font-semibold text-gray-900">
                                  {property.title}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                  ID: {property._id}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* Type */}

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {property.propertyType || "—"}
                          </td>


                          {/* Purpose */}

                          <td className="px-5 py-4">

                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                              {property.purpose || "—"}
                            </span>

                          </td>


                          {/* Price */}

                          <td className="px-5 py-4 text-sm font-semibold text-blue-600">
                            ৳
                            {Number(
                              property.price || 0
                            ).toLocaleString()}
                          </td>


                          {/* Location */}

                          <td className="px-5 py-4 text-sm text-gray-600">

                            {location.area && (
                              <span>
                                {location.area},{" "}
                              </span>
                            )}

                            {location.city || "—"}

                          </td>


                          {/* Actions */}

                          <td className="px-5 py-4">

                            <div className="flex justify-end gap-2">

                              <button
                                type="button"
                                className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    property._id
                                  )
                                }
                                className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    })}

                  </tbody>

                </table>

              </div>

            </div>
          )}

      </main>

    </div>
  );
}

export default AdminProperties;