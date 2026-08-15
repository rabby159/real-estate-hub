function FilterSidebar({ filters, setFilters, onApply, onReset }) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Filters
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Find properties that match your needs
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Reset
        </button>
      </div>

      <div className="space-y-5">

        {/* City */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            City
          </label>

          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleChange}
            placeholder="e.g. Dhaka"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Area */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Area
          </label>

          <input
            type="text"
            name="area"
            value={filters.area}
            onChange={handleChange}
            placeholder="e.g. Bashundhara"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Property Type
          </label>

          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Land">Land</option>
            <option value="Commercial">Commercial</option>
        </select>
        </div>

        {/* Purpose */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Purpose
          </label>

          <select
            name="purpose"
            value={filters.purpose}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Any Purpose</option>
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Price Range
          </label>

          <div className="grid grid-cols-2 gap-2">

            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Bedrooms
          </label>

          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Any</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        {/* Apply */}
        <button
          type="button"
          onClick={onApply}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Apply Filters
        </button>

      </div>
    </aside>
  );
}

export default FilterSidebar;