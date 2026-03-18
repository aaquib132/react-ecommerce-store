/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useMemo, useRef } from "react";
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
import { formatPrice, formatINR } from "../utils/priceUtils";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const productFromState = location.state?.product;

  const { cartItems, toggleCart, wishlistItems, toggleWishlist } = useShop();

  const { data } = useFetch(
    productFromState ? null : `${import.meta.env.VITE_API_URL}/products/${id}`
  );

  const { data: allProducts } = useFetch(
    `${import.meta.env.VITE_API_URL}/products`
  );

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");
  const [currentIndex, setCurrentIndex] = useState(0);

  const product = productFromState || data;

  const images = useMemo(() => {
    if (!product) return [];
    if (product.images?.length > 0) return product.images;
    return product.thumbnail ? [product.thumbnail] : [];
  }, [product]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const startX = useRef(0);

  const handleSwipe = (endX) => {
    const diff = startX.current - endX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
  };

  const relatedProducts = useMemo(() => {
    if (!allProducts || !product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p._id !== product._id)
      .slice(0, 4);
  }, [allProducts, product]);

  if (!product) return <ProductDetailSkeleton />;

  const isClothing =
    product.category?.includes("mens") ||
    product.category?.includes("womens");

  return (
    <div className="bg-[#F5F5F5] mt-20 min-h-screen pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm">

          <div className="grid md:grid-cols-2 gap-12">

            {/* IMAGE SECTION */}
            <div className="space-y-6">

              <div
                className="relative bg-gray-100 p-6 sm:p-10 rounded-xl overflow-hidden"
                onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
                onTouchEnd={(e) => handleSwipe(e.changedTouches[0].clientX)}
                onMouseDown={(e) => (startX.current = e.clientX)}
                onMouseUp={(e) => handleSwipe(e.clientX)}
              >
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {images.map((img) => (
                    <div
                      key={img}
                      className="min-w-full flex justify-center items-center"
                    >
                      <img
                        src={img}
                        alt={product.title}
                        className="h-64 sm:h-80 md:h-105 object-contain"
                      />
                    </div>
                  ))}
                </div>

                {/* ARROWS */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
                >
                  ‹
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
                >
                  ›
                </button>

                {/* DOTS */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2.5 w-2.5 rounded-full cursor-pointer ${
                        currentIndex === i ? "bg-indigo-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* WISHLIST */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 bg-white p-2 cursor-pointer rounded-full shadow"
                >
                  <Heart
                    size={18}
                    className={
                      wishlistItems?.some((item) => item._id === product._id)
                        ? "text-red-500 fill-red-500"
                        : ""
                    }
                  />
                </button>
              </div>

              {/* THUMBNAILS (FIXED) */}
              <div className="flex gap-4 justify-center flex-wrap">
                {images.map((img, index) => (
                  <img
                    key={img}
                    src={img}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-20 w-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                      currentIndex === index
                        ? "border-indigo-600 scale-105"
                        : "border-transparent hover:scale-105"
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
                        checkoutItems: [{ ...product, quantity: qty }],
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
                  className={`py-3 rounded-lg font-semibold transition flex items-center cursor-pointer justify-center gap-2 ${
                    cartItems?.some((item) => item._id === product._id)
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-900 text-white hover:bg-black"
                  }`}
                >
                  {cartItems?.some((item) => item._id === product._id)
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
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6">
                <span className="text-2xl sm:text-3xl font-bold">
                  ₹ {formatPrice(product.price)}
                </span>

                <span className="line-through text-gray-400 text-sm sm:text-base">
                  ₹ {formatINR(product.price * 1.4 * 92)}
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

              {/* SIZE SELECTOR (MOBILE FRIENDLY) */}
              {isClothing && (
                <div className="mt-8">
                  <span className="font-medium">Select Size</span>

                  <div className="flex flex-wrap gap-3 mt-4">
                    {["S", "M", "L", "XL"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`min-w-15 px-4 py-2 text-sm sm:text-base rounded-lg cursor-pointer border transition ${
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
          {/* REVIEWS SECTION */}
          <div className="mt-20">
  <h2 className="text-xl font-semibold mb-6">
    Customer Reviews
  </h2>

  <div className="space-y-5">

    {product.reviews?.length > 0 ? (
      product.reviews.map((review, index) => (

        <div
          key={index}
          className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition duration-300"
        >

          <div className="flex items-start gap-4">

            {/* AVATAR */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-sm font-semibold shadow">
              {review.reviewerName?.charAt(0) || "U"}
            </div>

            <div className="flex-1">

              {/* TOP ROW */}
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {review.reviewerName || "User"}
                  </p>

                  <div className="flex text-yellow-500 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.round(review.rating)
                            ? "fill-yellow-500"
                            : "opacity-30"
                        }
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* COMMENT */}
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {review.comment || "No comment provided."}
              </p>

            </div>

          </div>

        </div>

      ))
    ) : (
      <div className="text-center text-gray-500 py-12">
        No reviews yet.
      </div>
    )}

  </div>
</div>
        </div>
      </div>
    </div>
  );
}
