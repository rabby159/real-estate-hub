import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/favorites");

      setFavorites(response.data.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch favorites:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load your favorites."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeFavorite = async (propertyId) => {
    try {
      await api.delete(
        `/favorites/${propertyId}`
      );

      setFavorites((previous) =>
        previous.filter(
          (favorite) =>
            favorite.property?._id !== propertyId
        )
      );
    } catch (error) {
      console.error(
        "Failed to remove favorite:",
        error
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
            Saved Properties
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            My Favorites
          </h1>

          <p className="mt-3 text-gray-500">
            Properties you've saved for later.
          </p>

        </div>

      </section>


      {/* Content */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Loading */}

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[420px] animate-pulse rounded-2xl bg-gray-200"
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
              Unable to load favorites
            </h2>

            <p className="mt-2 text-gray-500">
              {error}
            </p>

            <button
              onClick={fetchFavorites}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try Again
            </button>

          </div>
        )}


        {/* Empty */}

        {!loading &&
          !error &&
          favorites.length === 0 && (

            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

              <div className="text-6xl">
                ♡
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                No Favorites Yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                Save properties you're interested in and
                they'll appear here.
              </p>

              <Link
                to="/properties"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Explore Properties
              </Link>

            </div>
          )}


        {/* Favorites */}

        {!loading &&
          !error &&
          favorites.length > 0 && (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {favorites.map((favorite) => {

                const property = favorite.property;

                if (!property) {
                  return null;
                }

                const location =
                  property.location || {};

                const image =
                  property.images?.[0];

                return (
                  <div
                    key={favorite._id}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                  >

                    {/* Image */}

                    <Link
                      to={`/properties/${property._id}`}
                    >
                      <div className="relative h-56 bg-gray-200">

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

                        <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-semibold text-red-600 shadow">
                          ♥
                        </span>

                      </div>
                    </Link>


                    {/* Content */}

                    <div className="p-5">

                      <p className="text-sm font-medium text-blue-600">
                        {property.propertyType}
                      </p>

                      <Link
                        to={`/properties/${property._id}`}
                      >
                        <h2 className="mt-1 line-clamp-1 text-lg font-bold text-gray-900 hover:text-blue-600">
                          {property.title}
                        </h2>
                      </Link>

                      <p className="mt-2 line-clamp-1 text-sm text-gray-500">
                        📍{" "}
                        {location.area &&
                          `${location.area}, `}
                        {location.city}
                      </p>

                      <p className="mt-4 text-xl font-bold text-blue-600">
                        ৳
                        {Number(
                          property.price || 0
                        ).toLocaleString()}
                      </p>


                      <div className="mt-5 flex gap-2">

                        <Link
                          to={`/properties/${property._id}`}
                          className="flex-1 rounded-lg bg-blue-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          View Details
                        </Link>

                        <button
                          onClick={() =>
                            removeFavorite(
                              property._id
                            )
                          }
                          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                        >
                          Remove
                        </button>

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

export default Favorites;