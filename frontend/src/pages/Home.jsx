import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";
import Heart from "lucide-react/dist/esm/icons/heart";
import Star from "lucide-react/dist/esm/icons/star";
import { useState, useMemo } from "react";
import useFetch from "../useFetch";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import HomeSkeleton from "../components/HomeSkeleton";

const USD_TO_INR = 92;

const CATEGORIES = [
    {
      id: 1,
      name: "Men",
      key: "men",
      image:
        "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      name: "Women",
      key: "women",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      name: "Beauty",
      key: "beauty",
      image:
        "https://images.unsplash.com/photo-1772429378994-15c1e8568085?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 4,
      name: "Electronics",
      key: "electronics",
      image:
        "https://images.unsplash.com/photo-1589859962346-0d4ff91a315a?q=80&w=1032&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Home",
      key: "home",
      image:
        "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?q=80&w=580&auto=format&fit=crop",
    },
  ];

export default function Home() {
  const { toggleCart } = useCart();
  const { toggleWishlist, wishlistItems } = useWishlist();

  const [openVideo, setOpenVideo] = useState(false);
  const { data, loading } = useFetch(`${import.meta.env.VITE_API_URL}/products`)





  /* ----------------------------- */
  /* Trending Products */
  /* ----------------------------- */

  const trendingProducts = useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => b.rating - a.rating).slice(0, 4);
  }, [data]);

  if (loading) {
  return <HomeSkeleton />;
}


  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <main className="pt-24 pb-20">
        {/* CATEGORY GRID */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.key}`}
                className="group relative overflow-hidden rounded-2xl h-40 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <span className="font-bold text-sm uppercase tracking-widest">
                      {cat.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* HERO BANNER */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="relative group rounded-[2.5rem] overflow-hidden bg-indigo-900 aspect-video md:aspect-21/9 flex items-center">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
              alt="Fashion Collection"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 will-change-transform"
            />

            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

            <div className="relative z-10 px-8 md:px-20 max-w-2xl">
              <span className="text-indigo-400 font-bold tracking-[0.3em] uppercase mb-4 block">
                Limited Edition
              </span>

              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
                Craft Your <br />
                <span className="text-indigo-400">Signature</span> Style
              </h1>

              <p className="text-neutral-300 text-lg mb-10 max-w-md">
                Experience the intersection of luxury and comfort with our new
                Spring 2026 collection.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-indigo-600 hover:text-white transition flex items-center justify-center"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>

                <button
                  onClick={() => setOpenVideo(true)}
                  className="border-2 border-white/30 text-white backdrop-blur-md px-8 py-4 rounded-full font-bold hover:bg-white/10 transition"
                >
                  Watch Film
                </button>
              </div>
            </div>
          </div>
        </div>

        {openVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
            <div className="relative w-[90%] md:w-225 aspect-video bg-black rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenVideo(false)}
                className="absolute top-4 right-4 text-white text-xl z-10"
                aria-label="Close Video"
              >
                ✕
              </button>

              <iframe
                loading="lazy"
                className="w-full h-full"
                src="https://www.youtube.com/embed/aqz-KE-bpKQ"
                title="Promo Video"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* TRENDING PRODUCTS */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black mb-2">Trending Now</h2>

              <p className="text-neutral-500">
                The most sought-after pieces this week.
              </p>
            </div>

            <Link
              to="/products"
              className="hidden sm:flex items-center font-bold text-indigo-600 hover:text-indigo-700"
            >
              View All
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          {/* PRODUCT GRID */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <div key={product._id} className="group">
                <Link to={`/products/${product._id}`}>
                  <div className="relative aspect-4/5 bg-neutral-100 rounded-3xl overflow-hidden mb-4 shadow-sm">
                    <img
                      src={`${product.thumbnail}?auto=format&fit=crop&w=600&q=80`}
                      alt={product.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />

                    <div
                      className="absolute bottom-4 left-4 px-4 py-1 text-xs font-semibold rounded-md
                   bg-linear-to-r from-[#ffffff] via-[#e2e2e2] to-[#ffffff]
                 text-[#444] border border-[#d0d0d0] shadow"
                    >
                      {product.category}
                    </div>

                    {/* Hover Actions */}

                    <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition">
                      <button
                        aria-label="Add to wishlist"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product);
                        }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-indigo-600 hover:text-white transition"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            wishlistItems.includes(product._id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                      </button>

                      <button
                        aria-label="Add to wishlist"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleCart(product);
                        }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-indigo-600 hover:text-white transition"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Link>

                {/* Product Info */}

                <div>
                  <Link to={`/products/${product._id}`}>
                    <h4 className="font-bold text-lg mb-1 group-hover:text-indigo-600 line-clamp-1">
                      {product.title}
                    </h4>
                  </Link>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black">
                      ₹ {(product.price * USD_TO_INR).toLocaleString("en-IN")}
                    </span>

                    <div className="flex items-center text-amber-500 space-x-1">
                      <Star className="w-4 h-4 fill-current" />

                      <span className="text-sm font-bold text-neutral-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
