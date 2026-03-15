export default function ProductListingSkeleton({ viewMode }) {
  return (
    <div className="min-h-screen mt-15 bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* MOBILE SEARCH + FILTER SKELETON */}
        <div className="lg:hidden flex gap-3 mb-6">
          <div className="flex-1 h-12 rounded-full skeleton" />
          <div className="w-12 h-12 rounded-full skeleton" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* SIDEBAR SKELETON (desktop only) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">

              <div className="h-6 w-24 skeleton rounded" />

              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 w-full skeleton rounded" />
              ))}

            </div>
          </aside>

          {/* PRODUCTS AREA */}
          <div className="grow space-y-6">

            {/* HEADER SKELETON */}
            <div className="flex justify-between items-center">
              <div>
                <div className="h-5 w-40 skeleton rounded mb-2" />
                <div className="h-3 w-24 skeleton rounded" />
              </div>

              <div className="flex gap-2">
                <div className="w-8 h-8 skeleton rounded" />
                <div className="w-8 h-8 skeleton rounded" />
                <div className="w-14 h-8 skeleton rounded" />
              </div>
            </div>

            {/* PRODUCT GRID SKELETON */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-6"
              }
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 space-y-3">

                  <div className="aspect-square rounded-lg skeleton" />

                  <div className="h-4 w-3/4 skeleton rounded" />

                  <div className="h-4 w-1/2 skeleton rounded" />

                </div>
              ))}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
