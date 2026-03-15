export default function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="pt-24 pb-20">

        {/* CATEGORY SCROLL (Mobile) / GRID (Desktop) */}
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-40 w-[60vw] md:w-auto rounded-2xl skeleton shrink-0"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* HERO BANNER */}
        <div className="max-w-7xl mx-auto px-4 mb-20">
          <div className="aspect-3/4 sm:aspect-video md:aspect-21/9 rounded-[2.5rem] skeleton" />
        </div>

        {/* TRENDING HEADER */}
        <div className="max-w-7xl mx-auto px-4 mb-8 sm:mb-10 flex justify-between items-end">
          <div>
            <div className="h-6 w-36 sm:w-48 rounded skeleton mb-2" />
            <div className="h-4 w-48 sm:w-64 rounded skeleton" />
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
                <div className="h-4 w-20 rounded skeleton" />
                <div className="h-4 w-10 rounded skeleton" />
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}