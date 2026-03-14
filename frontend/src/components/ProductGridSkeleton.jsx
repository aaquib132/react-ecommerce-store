export default function ProductGridSkeleton({ viewMode = "grid" }) {
  return (
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
          className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-4 ${
            viewMode === "list" ? "flex gap-6 items-center" : ""
          }`}
        >
          {/* IMAGE */}
          <div
            className={`bg-slate-200 rounded-lg animate-pulse ${
              viewMode === "grid" ? "h-48 w-full mb-4" : "w-40 h-28"
            }`}
          />

          {/* TEXT */}
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-24 mt-2 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}