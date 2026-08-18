function AboutUs() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            About Real Estate Hub
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Making Property Search Simple
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Real Estate Hub is a web-based platform designed to make it easier
            for people to discover, compare, save, and inquire about properties.
          </p>

        </div>
      </section>


      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Who We Are
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              A smarter way to find your next property
            </h2>

            <p className="mt-6 leading-7 text-gray-600">
              Real Estate Hub provides a convenient platform where users can
              explore available properties and find options that match their
              requirements.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Instead of searching through different sources, users can browse
              property listings, use search and filters, compare properties,
              save favorites, and send inquiries from one platform.
            </p>
          </div>


          {/* Highlights */}
          <div className="grid gap-5 sm:grid-cols-2">

            <div className="rounded-2xl bg-gray-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                🔎
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Easy Discovery
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Find properties using search, filters, sorting, and pagination.
              </p>
            </div>


            <div className="rounded-2xl bg-gray-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                ⚖️
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Easy Comparison
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Compare different properties and make better decisions.
              </p>
            </div>


            <div className="rounded-2xl bg-gray-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                ❤️
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Save Favorites
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Save properties you are interested in and access them later.
              </p>
            </div>


            <div className="rounded-2xl bg-gray-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                📩
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Direct Inquiries
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Send inquiries about properties directly through the platform.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* Mission */}
      <section className="bg-gray-50">

        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Our Mission
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Helping people make better property decisions
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our goal is to provide a simple, organized, and user-friendly
            property platform where users can discover properties, evaluate
            their options, and connect through inquiries with less effort.
          </p>

        </div>

      </section>


      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            How It Works
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Find a property in three simple steps
          </h2>

        </div>


        <div className="mt-12 grid gap-8 md:grid-cols-3">

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              1
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              Explore
            </h3>

            <p className="mt-3 leading-6 text-gray-500">
              Browse available properties and use filters to find suitable
              options.
            </p>
          </div>


          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              2
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              Compare
            </h3>

            <p className="mt-3 leading-6 text-gray-500">
              Compare properties and save the ones that match your needs.
            </p>
          </div>


          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              3
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              Inquire
            </h3>

            <p className="mt-3 leading-6 text-gray-500">
              Send an inquiry when you are ready to learn more about a
              property.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default AboutUs;
