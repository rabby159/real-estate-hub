import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function PropertyDetails() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState("");

  const [inquiryForm, setInquiryForm] = useState({
  name: "",
  email: "",
  phone: "",
  message: "",
});

  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquiryError, setInquiryError] = useState("");

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/properties/${id}`);

        setProperty(response.data.data);
      } catch (error) {
        console.error("Failed to fetch property:", error);

        setError(
          "Unable to load this property. It may have been removed or does not exist."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  useEffect(() => {
  const checkFavorite = async () => {
    if (!user || user.role !== "customer") {
      return;
    }

    try {
      const response = await api.get("/favorites");

      const favorites = response.data.data || [];

      const alreadyFavorite = favorites.some(
        (favorite) =>
          favorite.property?._id === id
      );

      setIsFavorite(alreadyFavorite);
    } catch (error) {
      console.error(
        "Failed to check favorite:",
        error
      );
    }
  };

  checkFavorite();
  }, [user, id]);

  useEffect(() => {
  if (user) {
    setInquiryForm((previous) => ({
      ...previous,
      name: user.name || "",
      email: user.email || "",
    }));
  }
}, [user]);

  const handleFavorite = async () => {
  // User is not logged in
  if (!user) {
    setFavoriteMessage(
      "Please login as a customer to use favorites."
    );
    return;
  }

  // Only customer can use favorites
  if (user.role !== "customer") {
    setFavoriteMessage(
      "Only customer accounts can use favorites."
    );
    return;
  }

  try {
    setFavoriteLoading(true);
    setFavoriteMessage("");

    if (isFavorite) {
      // Remove favorite
      await api.delete(`/favorites/${id}`);

      setIsFavorite(false);

      setFavoriteMessage(
        "Property removed from favorites."
      );
    } else {
      // Add favorite
      await api.post(`/favorites/${id}`);

      setIsFavorite(true);

      setFavoriteMessage(
        "Property added to favorites."
      );
    }
  } catch (error) {
    console.error(
      "Favorite action failed:",
      error
    );

    setFavoriteMessage(
      error.response?.data?.message ||
        "Unable to update favorites."
    );
  } finally {
    setFavoriteLoading(false);
  }
};

const handleInquiryChange = (event) => {
  const { name, value } = event.target;

  setInquiryForm((previous) => ({
    ...previous,
    [name]: value,
  }));
};

const handleInquirySubmit = async (event) => {
  event.preventDefault();

  if (!user) {
    setInquiryError(
      "Please login as a customer to send an inquiry."
    );
    return;
  }

  if (user.role !== "customer") {
    setInquiryError(
      "Only customer accounts can send inquiries."
    );
    return;
  }

  try {
    setInquiryLoading(true);
    setInquiryMessage("");
    setInquiryError("");

    const response = await api.post("/inquiries", {
      property: id,
      name: inquiryForm.name,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      message: inquiryForm.message,
    });

    setInquiryMessage(
      response.data.message ||
        "Inquiry submitted successfully."
    );

    setInquiryForm((previous) => ({
      ...previous,
      phone: "",
      message: "",
    }));
  } catch (error) {
    console.error(
      "Inquiry submission failed:",
      error
    );

    setInquiryError(
      error.response?.data?.message ||
        "Failed to submit inquiry."
    );
  } finally {
    setInquiryLoading(false);
  }
};

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="animate-pulse">

            <div className="h-8 w-64 rounded bg-gray-200" />

            <div className="mt-6 h-[450px] rounded-2xl bg-gray-200" />

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="h-48 rounded-2xl bg-gray-200 lg:col-span-2" />
              <div className="h-48 rounded-2xl bg-gray-200" />
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =========================
  // Error
  // =========================

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-20">

        <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-sm">

          <div className="text-5xl">🏠</div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Property Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            {error || "This property could not be found."}
          </p>

          <Link
            to="/properties"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Properties
          </Link>

        </div>

      </div>
    );
  }

  const location = property.location || {};

  const images =
    property.images && property.images.length > 0
      ? property.images
      : [];

  const hasImages = images.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =========================
          Breadcrumb
      ========================= */}

      <div className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-2 text-sm text-gray-500">

            <Link
              to="/"
              className="hover:text-blue-600"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              to="/properties"
              className="hover:text-blue-600"
            >
              Properties
            </Link>

            <span>/</span>

            <span className="line-clamp-1 text-gray-900">
              {property.title}
            </span>

          </div>

        </div>

      </div>


      {/* =========================
          Main
      ========================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =========================
            Image Gallery
        ========================= */}

        <section>

          <div className="grid gap-3 lg:grid-cols-4">

            {/* Main Image */}

            <div className="relative h-[350px] overflow-hidden rounded-2xl bg-gray-200 sm:h-[450px] lg:col-span-3">

              {hasImages ? (
                <img
                  src={images[selectedImage]}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-5xl">🏠</div>
                    <p className="mt-3">
                      No image available
                    </p>
                  </div>
                </div>
              )}

              {/* Purpose badge */}

              {property.purpose && (
                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow">
                  For {property.purpose}
                </span>
              )}

            </div>


            {/* Thumbnail Images */}

            <div className="grid grid-cols-4 gap-3 lg:grid-cols-1">

              {hasImages ? (
                images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`h-24 overflow-hidden rounded-xl border-2 sm:h-28 ${
                      selectedImage === index
                        ? "border-blue-600"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))
              ) : (
                <div className="hidden lg:block" />
              )}

            </div>

          </div>

        </section>


        {/* =========================
            Property Header
        ========================= */}

        <section className="mt-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                {property.propertyType || "Property"}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                {property.title}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-gray-500">
                <span>📍</span>

                <span>
                  {location.address && `${location.address}, `}
                  {location.area && `${location.area}, `}
                  {location.city}
                </span>
              </p>

            </div>


            {/* Price */}

            <div className="rounded-2xl bg-white p-5 shadow-sm">

              <p className="text-sm text-gray-500">
                Price
              </p>

              <p className="mt-1 text-3xl font-bold text-blue-600">
                ৳{Number(property.price || 0).toLocaleString()}
              </p>

            </div>

          </div>

        </section>


        {/* =========================
            Details + Sidebar
        ========================= */}

        <section className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* =========================
              Left Content
          ========================= */}

          <div className="space-y-8 lg:col-span-2">

            {/* Property Features */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Property Details
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-2xl">🛏</p>
                  <p className="mt-3 text-sm text-gray-500">
                    Bedrooms
                  </p>
                  <p className="font-semibold text-gray-900">
                    {property.bedrooms ?? "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-2xl">🛁</p>
                  <p className="mt-3 text-sm text-gray-500">
                    Bathrooms
                  </p>
                  <p className="font-semibold text-gray-900">
                    {property.bathrooms ?? "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-2xl">📐</p>
                  <p className="mt-3 text-sm text-gray-500">
                    Area
                  </p>
                  <p className="font-semibold text-gray-900">
                    {property.area
                      ? `${property.area} sqft`
                      : "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-2xl">🏷️</p>
                  <p className="mt-3 text-sm text-gray-500">
                    Purpose
                  </p>
                  <p className="font-semibold text-gray-900">
                    {property.purpose || "—"}
                  </p>
                </div>

              </div>

            </div>


            {/* Description */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Description
              </h2>

              <p className="mt-5 whitespace-pre-line leading-7 text-gray-600">
                {property.description ||
                  "No description available for this property."}
              </p>

            </div>


            {/* Location */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Location
              </h2>

              <div className="mt-5 space-y-3 text-gray-600">

                {location.city && (
                  <p>
                    <span className="font-medium text-gray-900">
                      City:
                    </span>{" "}
                    {location.city}
                  </p>
                )}

                {location.area && (
                  <p>
                    <span className="font-medium text-gray-900">
                      Area:
                    </span>{" "}
                    {location.area}
                  </p>
                )}

                {location.address && (
                  <p>
                    <span className="font-medium text-gray-900">
                      Address:
                    </span>{" "}
                    {location.address}
                  </p>
                )}

              </div>

            </div>

          </div>


          {/* =========================
              Right Sidebar
          ========================= */}

          <aside>

            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Interested in this property?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Save this property, compare it with others, or send an
                inquiry to learn more.
              </p>


              {/* Favorite */}

              <button
                  type="button"
                  onClick={handleFavorite}
                  disabled={favoriteLoading}
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition ${
                    isFavorite
                      ? "border-red-300 bg-red-50 text-red-600 hover:bg-red-100"
                      : "border-gray-300 text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <span className="text-xl">
                    {isFavorite ? "♥" : "♡"}
                  </span>

                  <span>
                    {favoriteLoading
                      ? "Updating..."
                      : isFavorite
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                  </span>
                </button>

                {favoriteMessage && (
                  <p className="mt-3 text-center text-sm text-gray-500">
                    {favoriteMessage}
                  </p>
                )}


              {/* Compare */}

              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
              >
                ⚖️
                <span>Add to Compare</span>
              </button>


              {/* Inquiry */}

             <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

  <div>
    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
      Contact Property
    </p>

    <h2 className="mt-1 text-xl font-bold text-gray-900">
      Interested in this property?
    </h2>

    <p className="mt-2 text-sm text-gray-500">
      Send an inquiry and the property team can contact you.
    </p>
  </div>

  {!user ? (
    <div className="mt-5 rounded-xl bg-gray-50 p-4 text-center">

      <p className="text-sm text-gray-600">
        Please login to send an inquiry.
      </p>

      <Link
        to="/login"
        className="mt-3 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Login
      </Link>

    </div>
  ) : user.role !== "customer" ? (
    <div className="mt-5 rounded-xl bg-gray-50 p-4 text-center">

      <p className="text-sm text-gray-600">
        Only customers can send property inquiries.
      </p>

    </div>
  ) : (
    <form
      onSubmit={handleInquirySubmit}
      className="mt-5 space-y-4"
    >

      {/* Name */}

      <div>
        <label
          htmlFor="inquiry-name"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Name
        </label>

        <input
          id="inquiry-name"
          type="text"
          name="name"
          value={inquiryForm.name}
          onChange={handleInquiryChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Your name"
        />
      </div>


      {/* Email */}

      <div>
        <label
          htmlFor="inquiry-email"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          id="inquiry-email"
          type="email"
          name="email"
          value={inquiryForm.email}
          onChange={handleInquiryChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="you@example.com"
        />
      </div>


      {/* Phone */}

      <div>
        <label
          htmlFor="inquiry-phone"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Phone
        </label>

        <input
          id="inquiry-phone"
          type="tel"
          name="phone"
          value={inquiryForm.phone}
          onChange={handleInquiryChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="01XXXXXXXXX"
        />
      </div>


      {/* Message */}

      <div>
        <label
          htmlFor="inquiry-message"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Message
        </label>

        <textarea
          id="inquiry-message"
          name="message"
          value={inquiryForm.message}
          onChange={handleInquiryChange}
          required
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="I'm interested in this property. Please provide more information..."
        />
      </div>


      {/* Success */}

      {inquiryMessage && (
        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          {inquiryMessage}
        </div>
      )}


      {/* Error */}

      {inquiryError && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {inquiryError}
        </div>
      )}


      {/* Submit */}

      <button
        type="submit"
        disabled={inquiryLoading}
        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {inquiryLoading
          ? "Submitting..."
          : "Send Inquiry"}
      </button>

    </form>
  )}

</div>

            </div>

          </aside>

        </section>

      </main>

    </div>
  );
}

export default PropertyDetails;