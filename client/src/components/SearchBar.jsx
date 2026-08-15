import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = search.trim();

    if (!value) {
      navigate("/properties");
      return;
    }

    navigate(`/properties?search=${encodeURIComponent(value)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-xl sm:flex-row"
    >
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by location, area or property name..."
        className="min-w-0 flex-1 rounded-xl border border-gray-200 px-5 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;