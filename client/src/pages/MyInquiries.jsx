import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

function MyInquiries() {
  const [inquiries, setInquiries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/inquiries/my");

      setInquiries(response.data.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch inquiries:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load your inquiries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case "contacted":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "closed":
        return "bg-green-50 text-green-700 border-green-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-BD",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Customer Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            My Inquiries
          </h1>

          <p className="mt-3 text-gray-500">
            View and track your property inquiries.
          </p>

        </div>

      </section>


      {/* Content */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">


        {/* Loading */}

        {loading && (
          <div className="grid gap-6 md:grid-cols-2">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[320px] animate-pulse rounded-2xl bg-gray-200"
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
              Unable to load inquiries
            </h2>

            <p className="mt-2 text-gray-500">
              {error}
            </p>

            <button
              onClick={fetchInquiries}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>

          </div>
        )}


        {/* Empty */}

        {!loading &&
          !error &&
          inquiries.length === 0 && (

            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

              <div className="text-6xl">
                💬
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                No Inquiries Yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                You haven't sent any property inquiries yet.
                Explore properties and contact sellers when
                you find something you're interested in.
              </p>

              <Link
                to="/properties"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Properties
              </Link>

            </div>
          )}


        {/* Inquiry List */}

        {!loading &&
          !error &&
          inquiries.length > 0 && (

            <div className="space-y-6">

              {inquiries.map((inquiry) => {

                const property = inquiry.property;

                if (!property) {
                  return null;
                }

                const location =
                  property.location || {};

                const image =
                  property.images?.[0];

                return (
                  <div
                    key={inquiry._id}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                  >

                    <div className="grid md:grid-cols-[280px_1fr]">


                      {/* Property Image */}

                      <Link
                        to={`/properties/${property._id}`}
                        className="block"
                      >

                        <div className="h-64 bg-gray-200 md:h-full">

                          {image ? (
                            <img
                              src={image}
                              alt={property.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-gray-400">
                              <span className="text-5xl">
                                🏠
                              </span>
                            </div>
                          )}

                        </div>

                      </Link>


                      {/* Inquiry Information */}

                      <div className="p-6">

                        <div className="flex flex-col justify-between gap-4 sm:flex-row">

                          <div>

                            <p className="text-sm font-medium text-blue-600">
                              {property.propertyType}
                            </p>

                            <Link
                              to={`/properties/${property._id}`}
                            >
                              <h2 className="mt-1 text-xl font-bold text-gray-900 hover:text-blue-600">
                                {property.title}
                              </h2>
                            </Link>

                            <p className="mt-2 text-sm text-gray-500">
                              📍{" "}
                              {location.area &&
                                `${location.area}, `}
                              {location.city}
                            </p>

                          </div>


                          {/* Status */}

                          <div>

                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${getStatusStyle(
                                inquiry.status
                              )}`}
                            >
                              {formatStatus(
                                inquiry.status
                              )}
                            </span>

                          </div>

                        </div>


                        {/* Property Price */}

                        <p className="mt-4 text-xl font-bold text-blue-600">
                          ৳
                          {Number(
                            property.price || 0
                          ).toLocaleString()}
                        </p>


                        {/* Inquiry Details */}

                        <div className="mt-5 rounded-xl bg-gray-50 p-4">

                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Your Inquiry
                          </p>

                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                            {inquiry.message}
                          </p>

                        </div>


                        {/* Meta */}

                        <div className="mt-5 flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">

                          <div>
                            Submitted on{" "}
                            <span className="font-medium text-gray-700">
                              {formatDate(
                                inquiry.createdAt
                              )}
                            </span>
                          </div>

                          <Link
                            to={`/properties/${property._id}`}
                            className="font-semibold text-blue-600 hover:text-blue-700"
                          >
                            View Property →
                          </Link>

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

      </main>

    </div>
  );
}

export default MyInquiries;