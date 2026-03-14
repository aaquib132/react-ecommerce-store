export default function WishlistSkeleton() {
  return (
    <div className="min-h-screen mt-28 bg-slate-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-6 w-48 bg-slate-200 rounded mb-8 animate-pulse"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

          {[1,2,3,4,5,6,7,8].map((i)=>(
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm p-4 space-y-4 animate-pulse"
            >

              <div className="h-48 bg-slate-200 rounded-xl"></div>

              <div className="h-4 bg-slate-200 rounded w-3/4"></div>

              <div className="h-4 bg-slate-200 rounded w-1/2"></div>

              <div className="h-10 bg-slate-200 rounded"></div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}