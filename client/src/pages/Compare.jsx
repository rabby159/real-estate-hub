import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Compare() {
  const { user } = useAuth();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create a unique compare key for each user
  const getCompareKey = () => {
    if (!user) {
      return null;
    }

    const userId = user._id || user.id || user.email;

    return `compareProperties_${userId}`;
  };

  const fetchCompareProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const compareKey = getCompareKey();

      if (!compareKey) {
        setProperties([]);
        return;
      }

      const storedCompare =
        JSON.parse(
          localStorage.getItem(compareKey)
        ) || [];

      if (storedCompare.length < 2) {
        setProperties([]);
        return;
      }

      const ids = storedCompare.join(",");

      const response = await api.get(
        `/properties/compare?ids=${ids}`
      );

      setProperties(response.data.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch compare properties:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load comparison."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompareProperties();
  }, [user]);

  const removeFromCompare = (propertyId) => {
    const compareKey = getCompareKey();

    if (!compareKey) {
      return;
    }

    const storedCompare =
      JSON.parse(
        localStorage.getItem(compareKey)
      ) || [];

    const updatedCompare = storedCompare.filter(
      (id) => id !== propertyId
    );

    localStorage.setItem(
      compareKey,
      JSON.stringify(updatedCompare)
    );

    fetchCompareProperties();
  };

  const clearCompare = () => {
    const compareKey = getCompareKey();

    if (!compareKey) {
      return;
    }

    localStorage.removeItem(compareKey);

    setProperties([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 w-64 rounded bg-gray-200" />
            <div className="mt-8 h-96 rounded-2xl bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-10 sm:px-6 lg:px-8">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Property Comparison
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Compare Properties
            </h1>

            <p className="mt-2 text-gray-500">
              Compare up to 3 properties side by side.
            </p>
          </div>

          {properties.length > 0 && (
            <button
              onClick={clearCompare}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Clear All
            </button>
          )}

        </div>
      </section>


      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Error */}

        {error && (
          <div className="rounded-xl bg-red-50 p-5 text-center text-red-600">
            {error}
          </div>
        )}


        {/* Less than 2 properties */}

        {!error && properties.length < 2 && (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

            <div className="text-6xl">
              ⚖️
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              Add More Properties
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Select at least 2 properties to compare them.
              You can compare up to 3 properties.
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

        {!error && properties.length >= 2 && (
          <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">

            <table className="min-w-full border-collapse">

              <thead>
                <tr>

                  <th className="w-48 border-b border-r border-gray-200 bg-gray-50 p-5 text-left text-sm font-semibold text-gray-600">
                    Property
                  </th>

                  {properties.map((property) => (
                    <th
                      key={property._id}
                      className="min-w-[280px] border-b border-gray-200 p-5 text-left align-top"
                    >

                      {property.images?.[0] ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="h-40 w-full rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-40 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                          No Image
                        </div>
                      )}

                      <h2 className="mt-4 text-lg font-bold text-gray-900">
                        {property.title}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {property.location?.area},{" "}
                        {property.location?.city}
                      </p>

                      <button
                        onClick={() =>
                          removeFromCompare(property._id)
                        }
                        className="mt-3 text-sm font-semibold text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>

                    </th>
                  ))}

                </tr>
              </thead>


              <tbody>

                {/* Price */}

                <tr>
                  <td className="border-b border-r border-gray-200 bg-gray-50 p-5 font-semibold text-gray-700">
                    Price
                  </td>

                  {properties.map((property) => (
                    <td
                      key={property._id}
                      className="border-b border-gray-200 p-5 text-xl font-bold text-blue-600"
                    >
                      ৳
                      {Number(
                        property.price || 0
                      ).toLocaleString()}
                    </td>
                  ))}
                </tr>


                {/* Property Type */}

                <tr>
                  <td className="border-b border-r border-gray-200 bg-gray-50 p-5 font-semibold text-gray-700">
                    Property Type
                  </td>

                  {properties.map((property) => (
                    <td
                      key={property._id}
                      className="border-b border-gray-200 p-5 text-gray-700"
                    >
                      {property.propertyType || "—"}
                    </td>
                  ))}
                </tr>


                {/* Purpose */}

                <tr>
                  <td className="border-b border-r border-gray-200 bg-gray-50 p-5 font-semibold text-gray-700">
                    Purpose
                  </td>

                  {properties.map((property) => (
                    <td
                      key={property._id}
                      className="border-b border-gray-200 p-5 text-gray-700"
                    >
                      {property.purpose || "—"}
                    </td>
                  ))}
                </tr>


                {/* Bedrooms */}

                <tr>
                  <td className="border-b border-r border-gray-200 bg-gray-50 p-5 font-semibold text-gray-700">
                    Bedrooms
                  </td>

                  {properties.map((property) => (
                    <td
                      key={property._id}
                      className="border-b border-gray-200 p-5 text-gray-700"
                    >
                      {property.bedrooms ?? "—"}
                    </td>
                  ))}
                </tr>


                {/* Bathrooms */}

                <tr>
                  <td className="border-b border-r border-gray-200 bg-gray-50 p-5 font-semibold text-gray-700">
                    Bathrooms
                  </td>

                  {properties.map((property) => (
                    <td
                      key={property._id}
                      className="border-b border-gray-200 p-5 text-gray-700"
                    >
                      {property.bathrooms ?? "—"}
                    </td>
                  ))}
                </tr>


                {/* Area */}

                <tr>
                  <td className="border-r border-gray-200 bg-gray-50 p-5 font-semibold text-gray-700">
                    Area
                  </td>

                  {properties.map((property) => (
                    <td
                      key={property._id}
                      className="p-5 text-gray-700"
                    >
                      {property.area
                        ? `${property.area} sqft`
                        : "—"}
                    </td>
                  ))}
                </tr>

              </tbody>

            </table>

          </div>
        )}

      </main>
    </div>
  );
}

export default Compare;