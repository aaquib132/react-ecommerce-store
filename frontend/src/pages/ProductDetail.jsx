/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useMemo } from "react";
import {
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
  ShoppingCart,
} from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";
import { useShop } from "../store/ShopContext";

const USD_TO_INR = 92;

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const productFromState = location.state?.product;

  const { cartItems, toggleCart, wishlistItems, toggleWishlist } = useShop();

  const { data } = useFetch(
    productFromState ? null : `http://localhost:3000/products/${id}`,
  );

  const { data: allProducts } = useFetch("http://localhost:3000/products");

  // Hooks must always run before any return
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(null);
  const [size, setSize] = useState("M");

  const product = productFromState || data;

  const images = useMemo(() => {
    if (!product) return [];

    if (product.images && product.images.length > 0) {
      return product.images;
    }

    return product.thumbnail ? [product.thumbnail] : [];
  }, [product]);

  useEffect(() => {
    if (images.length > 0) {
      setImg(images[0]);
    }
  }, [images]);

  const relatedProducts = useMemo(() => {
    if (!allProducts || !product) return [];

    return allProducts
      .filter((p) => p.category === product.category && p._id !== product._id)
      .slice(0, 4);
  }, [allProducts, product]);

  if (!product) {
    return <ProductDetailSkeleton />;
  }

  const isClothing =
    product.category?.includes("mens") || product.category?.includes("womens");

  return (
    <div className="bg-[#F5F5F5] mt-20 min-h-screen pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <div className="grid md:grid-cols-2 gap-12">
            {/* IMAGE SECTION */}
            <div className="space-y-6">
              <div className="relative bg-gray-100 p-10 rounded-xl flex justify-center items-center group">
                <img
                  src={img || product.thumbnail}
                  alt={product.title}
                  className="h-105 object-contain transition-transform duration-300 group-hover:scale-105"
                />

                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <Heart
                    size={18}
                    className={
                      wishlistItems?.some(item => item._id === product._id)
                        ? "text-red-500 fill-red-500"
                        : ""
                    }
                  />
                </button>
              </div>

              {/* THUMBNAILS */}
              <div className="flex gap-4 justify-center">
                {images?.map((i) => (
                  <img
                    key={i}
                    src={i}
                    onClick={() => setImg(i)}
                    className={`h-20 w-20 object-cover rounded-lg cursor-pointer border-2 ${
                      img === i ? "border-indigo-600" : "border-transparent"
                    }`}
                  />
                ))}
              </div>

              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() =>
                    navigate("/shipping", {
                      state: {
                        checkoutItems: [
                          {
                            ...product,
                            quantity: qty,
                          },
                        ],
                      },
                    })
                  }
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold cursor-pointer transition hover:scale-[1.02]"
                >
                  <ShoppingCart size={18} />
                  Buy Now
                </button>

                <button
                  onClick={() => toggleCart(product)}
                  className={`py-3 rounded-lg font-semibold cursor-pointer transition ${
                    cartItems?.some(item => item._id === product._id)
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-900 text-white hover:bg-black"
                  }`}
                >
                  {cartItems?.some(item => item._id === product._id)
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div>
              <h1 className="text-2xl font-semibold leading-relaxed">
                {product.title}
              </h1>

              {/* RATING */}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-gray-600">{product.rating}</span>

                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.round(product.rating) ? "fill-yellow-500" : ""
                      }
                    />
                  ))}
                </div>

                <span className="text-sm text-gray-500">
                  ({product.reviews?.length} reviews)
                </span>
              </div>

              {/* PRICE */}
              <div className="flex items-center gap-4 mt-6">
                <span className="text-3xl font-bold">
                  ₹ {(product.price * USD_TO_INR).toLocaleString("en-IN")}
                </span>

                <span className="line-through text-gray-400">
                  ₹ {(product.price * 1.4 * USD_TO_INR).toLocaleString("en-IN")}
                </span>

                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                  {product.discountPercentage}% OFF
                </span>
              </div>

              {/* QUANTITY */}
              <div className="flex items-center gap-6 mt-8">
                <span className="font-medium">Quantity</span>

                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="px-5">{qty}</span>

                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <p className="text-green-600 font-semibold text-sm mt-2">
                In Stock • Ready to ship
              </p>

              {/* SIZE SELECTOR ONLY FOR CLOTHING */}
              {isClothing && (
                <div className="mt-8">
                  <span className="font-medium">Select Size</span>

                  <div className="flex gap-3 mt-4">
                    {["S", "M", "L", "XL"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`px-5 py-2 rounded-lg border transition ${
                          size === s
                            ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                            : "hover:border-gray-400"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SERVICES */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 border-t pt-8 text-center text-sm">
                <div className="flex flex-col items-center gap-2 text-gray-600">
                  <RotateCcw size={22} />
                  <p>10 Days Return</p>
                </div>

                <div className="flex flex-col items-center gap-2 text-gray-600">
                  <CreditCard size={22} />
                  <p>Pay on Delivery</p>
                </div>

                <div className="flex flex-col items-center gap-2 text-gray-600">
                  <Truck size={22} />
                  <p>Free Delivery</p>
                </div>

                <div className="flex flex-col items-center gap-2 text-gray-600">
                  <ShieldCheck size={22} />
                  <p>Secure Payment</p>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-10 border-t pt-8">
                <h3 className="font-semibold text-lg mb-4">
                  Product Description
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          <div className="mt-20">
            <h2 className="text-xl font-semibold mb-8">
              More items you may like in {product.category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>

          {/* CUSTOMER REVIEWS */}
          <div className="mt-20 border-t pt-12">
            <h2 className="text-xl font-semibold mb-8">Customer Reviews</h2>

            {product.reviews?.length === 0 || !product.reviews ? (
              <p className="text-slate-500">No reviews yet.</p>
            ) : (
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 p-6 rounded-xl border border-slate-100"
                  >
                    {/* Review Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-full font-semibold">
                          {review.reviewerName.charAt(0)}
                        </div>

                        <div>
                          <p className="font-medium text-slate-800">
                            {review.reviewerName}
                          </p>

                          {/* Rating */}
                          <div className="flex gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < review.rating
                                    ? "fill-yellow-500 text-yellow-500"
                                    : "text-slate-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Date */}
                      <span className="text-xs text-slate-400">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Comment */}
                    <p className="text-slate-600 mt-4 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
