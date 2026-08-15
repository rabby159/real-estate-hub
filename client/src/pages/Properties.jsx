import { useEffect, useState } from "react";
import api from "../services/api";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get("/properties");

        setProperties(response.data.data);
      } catch (error) {
        console.error(error);

        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Properties
      </h1>

      <p className="mb-6">
        Total properties: {properties.length}
      </p>

      <div className="space-y-4">
        {properties.map((property) => (
          <div
            key={property._id}
            className="rounded-lg border p-5"
          >
            <h2 className="text-xl font-semibold">
              {property.title}
            </h2>

            <p className="mt-2">
              Price: ৳{property.price}
            </p>

            <p>
              Location: {property.location?.city}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;