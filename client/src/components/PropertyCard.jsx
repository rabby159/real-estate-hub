import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  const location = property.location || {};

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

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
      </div>

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
          {location.area && `${location.area}, `}
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
              ৳{Number(property.price || 0).toLocaleString()}
            </p>
          </div>

          <Link
            to={`/properties/${property._id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Details
          </Link>

        </div>

      </div>
    </div>
  );
}

export default PropertyCard;