import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const COMPARE_KEY = "compareProperties";

function PropertyCard({ property }) {
  const navigate = useNavigate();

  const location = property.location || {};

  const [isCompared, setIsCompared] = useState(() => {
    try {
      const stored = localStorage.getItem(COMPARE_KEY);

      if (!stored) {
        return false;
      }

      const ids = JSON.parse(stored);

      return Array.isArray(ids) && ids.includes(property._id);
    } catch {
      return false;
    }
  });

  const [compareCount, setCompareCount] = useState(() => {
    try {
      const stored = localStorage.getItem(COMPARE_KEY);

      if (!stored) {
        return 0;
      }

      const ids = JSON.parse(stored);

      return Array.isArray(ids) ? ids.length : 0;
    } catch {
      return 0;
    }
  });

  const [message, setMessage] = useState("");

  const handleCompare = () => {
    try {
      const stored = localStorage.getItem(COMPARE_KEY);

      let ids = stored ? JSON.parse(stored) : [];

      if (!Array.isArray(ids)) {
        ids = [];
      }

      // Remove from compare
      if (ids.includes(property._id)) {
        ids = ids.filter(
          (id) => id !== property._id
        );

        localStorage.setItem(
          COMPARE_KEY,
          JSON.stringify(ids)
        );

        setIsCompared(false);
        setCompareCount(ids.length);
        setMessage("Removed from comparison");

        setTimeout(() => {
          setMessage("");
        }, 2000);

        return;
      }

      // Maximum 3
      if (ids.length >= 3) {
        setMessage(
          "You can compare maximum 3 properties."
        );

        setTimeout(() => {
          setMessage("");
        }, 2500);

        return;
      }

      // Add property
      ids.push(property._id);

      localStorage.setItem(
        COMPARE_KEY,
        JSON.stringify(ids)
      );

      setIsCompared(true);
      setCompareCount(ids.length);
      setMessage("Added to comparison");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error(
        "Compare error:",
        error
      );

      setMessage(
        "Unable to add property to comparison."
      );
    }
  };

  const goToCompare = () => {
    navigate("/compare");
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">

        {property.images?.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
            No Image Available
          </div>
        )}

        {/* Purpose */}
        {property.purpose && (
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-800 shadow">
            {property.purpose}
          </span>
        )}

        {/* Compare Button */}
        <button
          type="button"
          onClick={handleCompare}
          className={`absolute right-4 top-4 rounded-full px-4 py-2 text-xs font-semibold shadow transition ${
            isCompared
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          {isCompared
            ? "✓ Added"
            : "Add to Compare"}
        </button>

      </div>

      {/* Success message */}
      {message && (
        <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {message}
        </div>
      )}

      {/* Content */}
      <div className="p-5">

        <div className="mb-2">

          <p className="text-sm text-gray-500">
            {property.propertyType || "Property"}
          </p>

          <h3 className="mt-1 line-clamp-1 text-lg font-bold text-gray-900">
            {property.title}
          </h3>

        </div>

        {/* Location */}
        <p className="mb-4 line-clamp-1 text-sm text-gray-500">
          {location.area &&
            `${location.area}, `}
          {location.city}
        </p>

        {/* Property details */}
        <div className="mb-5 flex flex-wrap gap-4 border-y border-gray-100 py-3 text-sm text-gray-600">

          {property.bedrooms !== undefined && (
            <span>
              🛏 {property.bedrooms} Beds
            </span>
          )}

          {property.bathrooms !== undefined && (
            <span>
              🛁 {property.bathrooms} Baths
            </span>
          )}

          {property.area !== undefined && (
            <span>
              📐 {property.area} sqft
            </span>
          )}

        </div>

        {/* Price + Details */}
        <div className="flex items-center justify-between">

          <div>
            <p className="text-xl font-bold text-blue-600">
              ৳
              {Number(
                property.price || 0
              ).toLocaleString()}
            </p>
          </div>

          <Link
            to={`/properties/${property._id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Details
          </Link>

        </div>

        {/* Compare Now */}
        {compareCount >= 2 && (
          <button
            type="button"
            onClick={goToCompare}
            className="mt-4 w-full rounded-lg border border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Compare {compareCount} Properties
          </button>
        )}

      </div>
    </div>
  );
}

export default PropertyCard;