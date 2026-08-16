import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import api from "../services/api";
import heroImage from "../assets/banner_backg.png";

function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/properties?limit=6");

        setProperties(response.data.data || []);
      } catch (error) {
        console.error("Failed to load properties:", error);

        setError(
          "Unable to load properties right now. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div className="bg-white">
      {/* ================= HERO ================= */}
      <section
        className="relative overflow-hidden bg-gray-900 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {" "}
        {/* Dark overlay */} <div className="absolute inset-0 bg-gray-950/65" />{" "}
        {/* Content */}{" "}
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          {" "}
          <span className="mb-5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
            {" "}
            Find a place you'll love{" "}
          </span>{" "}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {" "}
            Find Your Perfect Property{" "}
          </h1>{" "}
          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-200 sm:text-lg">
            {" "}
            Explore properties, compare your options, save your favorites, and
            connect with property owners easily.{" "}
          </p>{" "}
          <div className="mt-10 w-full">
            {" "}
            <SearchBar />{" "}
          </div>{" "}
        </div>{" "}
      </section>

      {/* ================= FEATURED PROPERTIES ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Explore
            </p>

            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Properties
            </h2>

            <p className="mt-3 max-w-2xl text-gray-500">
              Discover some of the latest properties available on Real Estate
              Hub.
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Properties */}
        {!loading && !error && properties.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {/* No properties */}
        {!loading && !error && properties.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              No properties available
            </h3>

            <p className="mt-2 text-gray-500">
              Add some properties from the backend to see them here.
            </p>
          </div>
        )}
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Why Real Estate Hub?
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to find your next property
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Explore */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                🔎
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Explore Easily
              </h3>

              <p className="mt-3 leading-6 text-gray-500">
                Browse property listings and quickly find properties that match
                your needs.
              </p>
            </div>

            {/* Compare */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                ⚖️
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Compare Properties
              </h3>

              <p className="mt-3 leading-6 text-gray-500">
                Compare multiple properties side by side and make better
                decisions.
              </p>
            </div>

            {/* Manage */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
                ❤️
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Save & Manage
              </h3>

              <p className="mt-3 leading-6 text-gray-500">
                Save your favorite properties and send inquiries whenever you're
                ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden bg-gray-900 mb-10">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Find Your Next Property Today
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Join thousands of satisfied users who have found their dream home or
            ideal investment through EstateHub.
          </p>

          <button
            onClick={() => {
              window.location.href = "/properties";
            }}
            className="mt-8 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-gray-100"
          >
            Explore Properties
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
