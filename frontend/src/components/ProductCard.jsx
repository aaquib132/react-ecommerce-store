import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../store/ShopContext";

const USD_TO_INR = 92;

export default function ProductCard({ product, viewMode = "grid" }) {
  const { toggleCart, toggleWishlist, cartItems, wishlistItems } = useShop();

  const inCart = cartItems.some((item) => item._id === product._id);
  const inWishlist = wishlistItems.some((item) => item._id === product._id);
  return (
    <div
      className={`group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition overflow-hidden ${
        viewMode === "list" ? "flex items-center p-4 gap-6" : "flex flex-col"
      }`}
    >
      {/* IMAGE */}
      <Link to={`/products/${product._id}`} state={{ product }}>
        <div
          className={`relative overflow-hidden bg-slate-100 cursor-pointer ${
            viewMode === "grid" ? "aspect-4/3" : "w-48 h-36 rounded-xl shrink-0"
          }`}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Discount */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm border border-slate-100">
            <span className="text-[10px] font-bold text-indigo-600 tracking-tight">
              {product.discountPercentage}% OFF
            </span>
          </div>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-5 grow space-y-3">
        <Link
          to={`/products/${product._id}`}
          state={{ product }}
          className="font-bold text-slate-800 text-lg hover:text-indigo-600 hover:underline transition"
        >
          {product.title}
        </Link>

        {/* PRICE */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-slate-900">
            ₹ {(product.price * USD_TO_INR).toLocaleString("en-IN")}
          </span>
        </div>

        {/* RATING */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.round(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>

          <span className="text-xs text-slate-400 font-medium">
            ({product.reviews?.length} reviews)
          </span>
        </div>

        {/* BUTTONS */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => toggleCart(product)}
            className={`grow flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition cursor-pointer active:scale-95
            ${
              inCart
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {inCart ? "Added" : "Add to Cart"}
          </button>

          <button
            onClick={() => toggleWishlist(product)}
            className="p-3 rounded-xl border border-slate-200 hover:bg-red-50 hover:border-red-100 transition cursor-pointer active:scale-95"
          >
            <Heart
              className={`w-5 h-5 ${
                inWishlist ? "fill-red-500 text-red-500" : "text-slate-400"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
