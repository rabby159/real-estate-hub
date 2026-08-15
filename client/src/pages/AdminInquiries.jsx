import { useEffect, useState } from "react";
import api from "../services/api";

function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/inquiries");

      setInquiries(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load inquiries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (inquiryId, status) => {
    try {
      await api.put(
        `/inquiries/${inquiryId}/status`,
        { status }
      );

      setInquiries((previous) =>
        previous.map((inquiry) =>
          inquiry._id === inquiryId
            ? { ...inquiry, status }
            : inquiry
        )
      );
    } catch (error) {
      console.error(
        "Failed to update inquiry status:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update inquiry status."
      );
    }
  };

  const deleteInquiry = async (inquiryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/inquiries/${inquiryId}`);

      setInquiries((previous) =>
        previous.filter(
          (inquiry) => inquiry._id !== inquiryId
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete inquiry:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete inquiry."
      );
    }
  };

  const getStatusClass = (status) => {
    if (status === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "contacted") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "closed") {
      return "bg-green-100 text-green-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Customer Inquiries
          </h1>

          <p className="mt-3 text-gray-500">
            Review and manage property inquiries from customers.
          </p>

        </div>
      </section>


      {/* Content */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Loading */}

        {loading && (
          <div className="space-y-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 animate-pulse rounded-2xl bg-gray-200"
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
              Unable to load inquiries
            </h2>

            <p className="mt-2 text-gray-500">
              {error}
            </p>

            <button
              onClick={fetchInquiries}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try Again
            </button>

          </div>
        )}


        {/* Empty */}

        {!loading &&
          !error &&
          inquiries.length === 0 && (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

              <div className="text-6xl">
                📭
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                No Inquiries
              </h2>

              <p className="mt-2 text-gray-500">
                There are currently no customer inquiries.
              </p>

            </div>
          )}


        {/* Inquiry List */}

        {!loading &&
          !error &&
          inquiries.length > 0 && (

            <div className="space-y-5">

              {inquiries.map((inquiry) => {

                const property =
                  inquiry.property || {};

                const customer =
                  inquiry.user || {};

                return (
                  <div
                    key={inquiry._id}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >

                    {/* Top */}

                    <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 lg:flex-row lg:items-start lg:justify-between">

                      <div>

                        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                          Property Inquiry
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-gray-900">
                          {property.title ||
                            "Property unavailable"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          {property.propertyType || "Property"}
                        </p>

                      </div>


                      {/* Status */}

                      <div className="flex items-center gap-3">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClass(
                            inquiry.status
                          )}`}
                        >
                          {inquiry.status}
                        </span>

                        <select
                          value={inquiry.status}
                          onChange={(event) =>
                            updateStatus(
                              inquiry._id,
                              event.target.value
                            )
                          }
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="contacted">
                            Contacted
                          </option>

                          <option value="closed">
                            Closed
                          </option>
                        </select>

                      </div>

                    </div>


                    {/* Details */}

                    <div className="mt-5 grid gap-6 md:grid-cols-2">

                      {/* Customer */}

                      <div>

                        <h3 className="text-sm font-semibold text-gray-900">
                          Customer Information
                        </h3>

                        <div className="mt-3 space-y-2 text-sm text-gray-600">

                          <p>
                            <span className="font-medium text-gray-900">
                              Name:
                            </span>{" "}
                            {inquiry.name ||
                              customer.name ||
                              "—"}
                          </p>

                          <p>
                            <span className="font-medium text-gray-900">
                              Email:
                            </span>{" "}
                            {inquiry.email ||
                              customer.email ||
                              "—"}
                          </p>

                          <p>
                            <span className="font-medium text-gray-900">
                              Phone:
                            </span>{" "}
                            {inquiry.phone || "—"}
                          </p>

                        </div>

                      </div>


                      {/* Property */}

                      <div>

                        <h3 className="text-sm font-semibold text-gray-900">
                          Property Information
                        </h3>

                        <div className="mt-3 space-y-2 text-sm text-gray-600">

                          <p>
                            <span className="font-medium text-gray-900">
                              Price:
                            </span>{" "}
                            ৳
                            {Number(
                              property.price || 0
                            ).toLocaleString()}
                          </p>

                          <p>
                            <span className="font-medium text-gray-900">
                              Location:
                            </span>{" "}
                            {property.location?.area
                              ? `${property.location.area}, `
                              : ""}
                            {property.location?.city ||
                              "—"}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* Message */}

                    <div className="mt-5 rounded-xl bg-gray-50 p-4">

                      <h3 className="text-sm font-semibold text-gray-900">
                        Customer Message
                      </h3>

                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                        {inquiry.message}
                      </p>

                    </div>


                    {/* Actions */}

                    <div className="mt-5 flex justify-end">

                      <button
                        onClick={() =>
                          deleteInquiry(
                            inquiry._id
                          )
                        }
                        className="rounded-lg border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Delete Inquiry
                      </button>

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

export default AdminInquiries;