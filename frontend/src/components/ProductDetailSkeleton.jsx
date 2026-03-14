export default function ProductDetailSkeleton() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen pt-28 pb-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <div className="grid md:grid-cols-2 gap-12">

            {/* IMAGE SKELETON */}
            <div className="space-y-6">
              <div className="bg-slate-200 h-105 rounded-xl"></div>

              <div className="flex gap-4 justify-center">
                {[1,2,3,4].map((i) => (
                  <div
                    key={i}
                    className="h-20 w-20 bg-slate-200 rounded-lg"
                  ></div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-slate-200 rounded-lg"></div>
                <div className="h-12 bg-slate-200 rounded-lg"></div>
              </div>
            </div>

            {/* PRODUCT INFO SKELETON */}
            <div className="space-y-6">

              <div className="h-6 bg-slate-200 rounded w-3/4"></div>

              <div className="h-4 bg-slate-200 rounded w-1/3"></div>

              <div className="h-10 bg-slate-200 rounded w-1/4"></div>

              <div className="h-8 bg-slate-200 rounded w-1/2"></div>

              <div className="h-12 bg-slate-200 rounded w-40"></div>

              <div className="grid grid-cols-4 gap-6 pt-8">
                {[1,2,3,4].map((i)=>(
                  <div key={i} className="h-16 bg-slate-200 rounded"></div>
                ))}
              </div>

              <div className="space-y-3 pt-8">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>

            </div>
          </div>

          {/* RELATED PRODUCTS SKELETON */}

          <div className="mt-20">
            <div className="h-6 w-60 bg-slate-200 rounded mb-8"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map((i)=>(
                <div key={i} className="bg-slate-200 h-64 rounded-xl"></div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}