export default function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="pt-24 pb-20">

        {/* CATEGORY GRID */}
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl skeleton"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* HERO */}
        <div className="max-w-7xl mx-auto px-4 mb-20">
          <div className="h-105 rounded-[2.5rem] skeleton" />
        </div>

        {/* TRENDING HEADER */}
        <div className="max-w-7xl mx-auto px-4 mb-8 flex justify-between">
          <div>
            <div className="h-6 w-40 mb-2 rounded skeleton" />
            <div className="h-4 w-56 rounded skeleton" />
          </div>

          <div className="h-4 w-20 rounded skeleton" />
        </div>

        {/* PRODUCT GRID */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="aspect-4/5 rounded-3xl skeleton mb-4" />

              <div className="h-4 w-3/4 rounded skeleton mb-2" />

              <div className="flex justify-between">
                <div className="h-4 w-16 rounded skeleton" />
                <div className="h-4 w-10 rounded skeleton" />
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}