import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

const COMPARE_KEY = "compareProperties";

function Compare() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getCompareIds = () => {
    try {
      const stored = localStorage.getItem(COMPARE_KEY);

      if (!stored) {
        return [];
      }

      const ids = JSON.parse(stored);

      return Array.isArray(ids) ? ids : [];
    } catch (error) {
      console.error("Failed to read compare list:", error);
      return [];
    }
  };

  const fetchComparedProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const ids = getCompareIds();

      // Compare requires 2–3 properties
      if (ids.length < 2) {
        setProperties([]);
        return;
      }

      const response = await api.get(
        `/properties/compare?ids=${ids.join(",")}`
      );

      setProperties(response.data.data || []);
    } catch (error) {
      console.error("Failed to compare properties:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load comparison."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparedProperties();
  }, []);

  const removeProperty = (propertyId) => {
    const ids = getCompareIds();

    const updatedIds = ids.filter(
      (id) => id !== propertyId
    );

    localStorage.setItem(
      COMPARE_KEY,
      JSON.stringify(updatedIds)
    );

    setProperties((previous) =>
      previous.filter(
        (property) => property._id !== propertyId
      )
    );
  };

  const clearComparison = () => {
    localStorage.removeItem(COMPARE_KEY);
    setProperties([]);
  };

  const locationText = (property) => {
    const location = property.location || {};

    return [
      location.area,
      location.city,
    ]
      .filter(Boolean)
      .join(", ");
  };

  const rows = [
    {
      label: "Property Type",
      value: (property) =>
        property.propertyType || "N/A",
    },
    {
      label: "Purpose",
      value: (property) =>
        property.purpose || "N/A",
    },
    {
      label: "Price",
      value: (property) =>
        `৳${Number(
          property.price || 0
        ).toLocaleString()}`,
    },
    {
      label: "Location",
      value: (property) =>
        locationText(property) || "N/A",
    },
    {
      label: "Bedrooms",
      value: (property) =>
        property.bedrooms !== undefined
          ? property.bedrooms
          : "N/A",
    },
    {
      label: "Bathrooms",
      value: (property) =>
        property.bathrooms !== undefined
          ? property.bathrooms
          : "N/A",
    },
    {
      label: "Area",
      value: (property) =>
        property.area !== undefined
          ? `${property.area} sqft`
          : "N/A",
    },
    {
      label: "Status",
      value: (property) =>
        property.status || "N/A",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Property Comparison
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Compare Properties
              </h1>

              <p className="mt-2 text-gray-500">
                Compare up to 3 properties side by side.
              </p>
            </div>

            {properties.length > 0 && (
              <button
                onClick={clearComparison}
                className="rounded-lg border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Clear Comparison
              </button>
            )}

          </div>

        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="mt-4 text-gray-500">
              Loading comparison...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

            <div className="text-5xl">
              ⚠️
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              Unable to compare properties
            </h2>

            <p className="mt-2 text-gray-500">
              {error}
            </p>

            <button
              onClick={fetchComparedProperties}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try Again
            </button>

          </div>
        )}

        {/* Not enough properties */}
        {!loading &&
          !error &&
          properties.length < 2 && (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

              <div className="text-6xl">
                ⚖️
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                Not Enough Properties
              </h2>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                Select at least 2 properties to compare them
                side by side.
              </p>

              <Link
                to="/properties"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Explore Properties
              </Link>

            </div>
          )}

        {/* Comparison */}
        {!loading &&
          !error &&
          properties.length >= 2 && (

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              {/* Property Headers */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `180px repeat(${properties.length}, minmax(0, 1fr))`,
                }}
              >

                {/* Empty label column */}
                <div className="border-b border-r border-gray-200 bg-gray-50 p-4" />

                {properties.map((property) => (
                  <div
                    key={property._id}
                    className="border-b border-gray-200 p-4"
                  >

                    {/* Image */}
                    <div className="relative h-44 overflow-hidden rounded-xl bg-gray-100">

                      {property.images?.length > 0 ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}

                      <button
                        onClick={() =>
                          removeProperty(property._id)
                        }
                        className="absolute right-3 top-3 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-red-600 shadow hover:bg-red-50"
                      >
                        Remove
                      </button>

                    </div>

                    {/* Title */}
                    <Link
                      to={`/properties/${property._id}`}
                      className="mt-4 block"
                    >
                      <h2 className="line-clamp-2 text-lg font-bold text-gray-900 hover:text-blue-600">
                        {property.title}
                      </h2>
                    </Link>

                  </div>
                ))}

                {/* Comparison rows */}
                {rows.map((row) => (
                  <>
                    <div
                      key={`${row.label}-label`}
                      className="border-b border-r border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-700"
                    >
                      {row.label}
                    </div>

                    {properties.map((property) => (
                      <div
                        key={`${row.label}-${property._id}`}
                        className="border-b border-gray-200 p-4 text-sm text-gray-600"
                      >
                        {row.value(property)}
                      </div>
                    ))}
                  </>
                ))}

                {/* Actions */}
                <div className="border-r border-gray-200 bg-gray-50 p-4" />

                {properties.map((property) => (
                  <div
                    key={`action-${property._id}`}
                    className="p-4"
                  >
                    <Link
                      to={`/properties/${property._id}`}
                      className="block rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>
                ))}

              </div>

            </div>
          )}

      </main>
    </div>
  );
}

export default Compare;