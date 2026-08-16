import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminAddProperty() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "Apartment",
    purpose: "Sale",
    bedrooms: "",
    bathrooms: "",
    area: "",
    city: "",
    areaLocation: "",
    address: "",
    images: "",
    status: "available",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const propertyData = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        propertyType: form.propertyType,
        purpose: form.purpose,
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        area: Number(form.area),

        location: {
          city: form.city,
          area: form.areaLocation,
          address: form.address,
        },

        images: form.images
          .split(",")
          .map((image) => image.trim())
          .filter(Boolean),

        status: form.status,
        featured: form.featured,
      };

      await api.post("/properties", propertyData);

      navigate("/admin/properties");
    } catch (error) {
      console.error(
        "Failed to create property:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to create property."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Add Property
          </h1>

          <p className="mt-2 text-gray-500">
            Create a new property listing.
          </p>

        </div>
      </section>


      {/* Form */}

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}


          {/* Basic Information */}

          <h2 className="text-xl font-bold text-gray-900">
            Basic Information
          </h2>

          <div className="mt-5 space-y-5">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Property Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Modern Apartment in Dhaka"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>


            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe the property..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>


            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="5000000"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>


              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Property Type
                </label>

                <select
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="Apartment">
                    Apartment
                  </option>

                  <option value="House">
                    House
                  </option>

                  <option value="Villa">
                    Villa
                  </option>

                  <option value="Land">
                    Land
                  </option>

                  <option value="Commercial">
                    Commercial
                  </option>
                </select>
              </div>

            </div>


            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Purpose
              </label>

              <select
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="Sale">
  Sale
</option>

<option value="Rent">
  Rent
</option>
              </select>
            </div>

          </div>


          {/* Property Details */}

          <h2 className="mt-10 text-xl font-bold text-gray-900">
            Property Details
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Bedrooms
              </label>

              <input
                type="number"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                min="0"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>


            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Bathrooms
              </label>

              <input
                type="number"
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                min="0"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>


            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Area (sqft)
              </label>

              <input
                type="number"
                name="area"
                value={form.area}
                onChange={handleChange}
                min="0"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

          </div>


          {/* Location */}

          <h2 className="mt-10 text-xl font-bold text-gray-900">
            Location
          </h2>

          <div className="mt-5 space-y-5">

            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  placeholder="Dhaka"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>


              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Area
                </label>

                <input
                  type="text"
                  name="areaLocation"
                  value={form.areaLocation}
                  onChange={handleChange}
                  required
                  placeholder="Uttara"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>


            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Address
              </label>

              <input
  type="text"
  name="address"
  value={form.address}
  onChange={handleChange}
  required
  placeholder="House 12, Road 5"
  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
/>
            </div>

          </div>


          {/* Images */}

          <h2 className="mt-10 text-xl font-bold text-gray-900">
            Images
          </h2>

          <div className="mt-5">

            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Image URLs
            </label>

            <input
              type="text"
              name="images"
              value={form.images}
              onChange={handleChange}
              placeholder="https://image1.jpg, https://image2.jpg"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <p className="mt-2 text-xs text-gray-500">
              Add multiple image URLs separated by commas.
            </p>

          </div>


          {/* Status */}

          <h2 className="mt-10 text-xl font-bold text-gray-900">
            Listing Settings
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
  name="propertyType"
  value={form.propertyType}
  onChange={handleChange}
  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
>
  <option value="Apartment">
    Apartment
  </option>

  <option value="House">
    House
  </option>

  <option value="Villa">
    Villa
  </option>

  <option value="Land">
    Land
  </option>

  <option value="Commercial">
    Commercial
  </option>
</select>
            </div>


            <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3">

              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium text-gray-700">
                Featured Property
              </span>

            </label>

          </div>


          {/* Buttons */}

          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() =>
                navigate("/admin/properties")
              }
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating..."
                : "Create Property"}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default AdminAddProperty;