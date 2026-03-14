export default function ProductListingSkeleton({ viewMode = "grid" }) {
  return (
    <div className="min-h-screen mt-15 bg-slate-50 animate-pulse">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* FILTER SIDEBAR */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              
              {/* Title */}
              <div className="h-6 w-24 bg-slate-200 rounded"></div>

              {/* Price */}
              <div className="space-y-3">
                <div className="h-4 w-20 bg-slate-200 rounded"></div>
                <div className="h-2 w-full bg-slate-200 rounded"></div>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-3 w-32 bg-slate-200 rounded"></div>
                ))}
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <div className="h-4 w-20 bg-slate-200 rounded"></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-3 w-28 bg-slate-200 rounded"></div>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCT AREA */}
          <div className="grow space-y-6">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-5 w-40 bg-slate-200 rounded"></div>
                <div className="h-3 w-24 bg-slate-200 rounded"></div>
              </div>

              <div className="flex gap-2">
                <div className="h-8 w-16 bg-slate-200 rounded"></div>
                <div className="h-8 w-16 bg-slate-200 rounded"></div>
              </div>
            </div>

            {/* PRODUCT GRID */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-6"
              }
            >
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4"
                >
                  <div className="h-48 bg-slate-200 rounded mb-4"></div>

                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                    <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                    <div className="h-6 w-24 bg-slate-200 rounded mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}