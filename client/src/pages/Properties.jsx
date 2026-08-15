import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../services/api";
import PropertyCard from "../components/PropertyCard";
import FilterSidebar from "../components/FilterSidebar";
import SearchBar from "../components/SearchBar";

function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [properties, setProperties] = useState([]);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    area: searchParams.get("area") || "",
    propertyType: searchParams.get("propertyType") || "",
    purpose: searchParams.get("purpose") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("bedrooms") || "",
  });

  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sort") || "newest";
  const currentPage = Number(searchParams.get("page")) || 1;

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (currentSearch) {
        params.set("search", currentSearch);
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        }
      });

      params.set("page", currentPage);
      params.set("limit", 12);
      params.set("sort", currentSort);

      const response = await api.get(
        `/properties?${params.toString()}`
      );

      setProperties(response.data.data || []);

      setPagination(
        response.data.pagination || {
          total: 0,
          page: 1,
          limit: 12,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );
    } catch (error) {
      console.error("Failed to fetch properties:", error);

      setError(
        "Unable to load properties. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchParams.toString()]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set("page", "1");

    setSearchParams(params);
  };

  const resetFilters = () => {
    const params = new URLSearchParams();

    if (currentSearch) {
      params.set("search", currentSearch);
    }

    params.set("page", "1");

    setFilters({
      city: "",
      area: "",
      propertyType: "",
      purpose: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
    });

    setSearchParams(params);
  };

  const handleSortChange = (event) => {
    const params = new URLSearchParams(searchParams);

    params.set("sort", event.target.value);
    params.set("page", "1");

    setSearchParams(params);
  };

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page);

    setSearchParams(params);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}
      <section className="bg-white border-b border-gray-200">

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Explore Properties
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Find Your Next Property
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Browse available properties and use filters to find the one
            that matches your requirements.
          </p>

          <div className="mt-8 max-w-3xl">
            <SearchBar />
          </div>

        </div>

      </section>


      {/* ================= CONTENT ================= */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* FILTER SIDEBAR */}
          <div>
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onApply={applyFilters}
              onReset={resetFilters}
            />
          </div>


          {/* RESULTS */}
          <div>

            {/* Result toolbar */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Properties
                </h2>

                {!loading && (
                  <p className="mt-1 text-sm text-gray-500">
                    {pagination.total} properties found
                  </p>
                )}
              </div>


              {/* Sort */}
              <div className="flex items-center gap-3">

                <label
                  htmlFor="sort"
                  className="text-sm text-gray-500"
                >
                  Sort by
                </label>

                <select
                  id="sort"
                  value={currentSort}
                  onChange={handleSortChange}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                >
                  <option value="newest">
                    Newest
                  </option>

                  <option value="oldest">
                    Oldest
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>
                </select>

              </div>

            </div>


            {/* Loading */}
            {loading && (
              <div className="grid gap-6 sm:grid-cols-2">

                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-[450px] animate-pulse rounded-2xl bg-gray-200"
                  />
                ))}

              </div>
            )}


            {/* Error */}
            {!loading && error && (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">

                <h3 className="font-semibold text-red-700">
                  Something went wrong
                </h3>

                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>

                <button
                  onClick={fetchProperties}
                  className="mt-5 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Try Again
                </button>

              </div>
            )}


            {/* Properties */}
            {!loading && !error && properties.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">

                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  />
                ))}

              </div>
            )}


            {/* Empty */}
            {!loading && !error && properties.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

                <div className="text-5xl">
                  🏠
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  No properties found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-gray-500">
                  We couldn't find any properties matching your current
                  search and filters.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Clear Filters
                </button>

              </div>
            )}


            {/* ================= PAGINATION ================= */}
            {!loading &&
              !error &&
              properties.length > 0 &&
              pagination.totalPages > 1 && (

                <div className="mt-10 flex items-center justify-center gap-2">

                  {/* Previous */}
                  <button
                    disabled={!pagination.hasPreviousPage}
                    onClick={() =>
                      goToPage(pagination.page - 1)
                    }
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>


                  {/* Page numbers */}
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, index) => index + 1
                  ).map((page) => (

                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`h-10 w-10 rounded-lg text-sm font-semibold ${
                        page === pagination.page
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>

                  ))}


                  {/* Next */}
                  <button
                    disabled={!pagination.hasNextPage}
                    onClick={() =>
                      goToPage(pagination.page + 1)
                    }
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>

                </div>

              )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Properties;