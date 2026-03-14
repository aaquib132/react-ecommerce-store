
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useWishlist from "../hooks/useWishlist";
import useFetch from "../useFetch";
import WishlistSkeleton from "../components/WishlistSkeleton";

export default function Wishlist() {

  const { wishlistItems } = useWishlist();
  const { data: allProducts = [], loading } = useFetch("http://localhost:3000/products");



  const wishlistProducts = allProducts.filter((p) =>
    wishlistItems.includes(p._id)
  );

  if (loading) {
    return <WishlistSkeleton />;
  }

  return (
    <div className="min-h-screen mt-24 bg-slate-50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-2xl font-bold text-slate-800 mb-8">
          Your Wishlist ({wishlistProducts.length})
        </h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">

            <Heart className="mx-auto mb-4 text-slate-300" size={48} />

            <h2 className="text-lg font-semibold text-slate-700">
              Your wishlist is empty
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Save items you love to your wishlist.
            </p>

            <Link
              to="/products"
              className="inline-block mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Browse Products
            </Link>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}