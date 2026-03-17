import { Link } from "react-router-dom";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";
import Heart from "lucide-react/dist/esm/icons/heart";
import Star from "lucide-react/dist/esm/icons/star";
import X from "lucide-react/dist/esm/icons/x";

import SearchBar from "../components/MobileSearchBar";

import { useState, useMemo } from "react";

import useFetch from "../useFetch";
import { useShop } from "../store/ShopContext";
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

  const { toggleCart, toggleWishlist, wishlistItems } = useShop();

  const { data, loading } = useFetch(`${import.meta.env.VITE_API_URL}/products`);

  const [openVideo, setOpenVideo] = useState(false);

  const trendingProducts = useMemo(() => {

    if (!data) return [];

    return [...data].sort((a, b) => b.rating - a.rating).slice(0, 4);

  }, [data]);

  if (loading) return <HomeSkeleton />;

  return (

    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">

      <main className="pt-24 pb-20">

        {/* MOBILE SEARCH BAR */}

        <SearchBar />

        {/* CATEGORY GRID */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">

          <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-4 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">

            {CATEGORIES.map((cat) => (

              <Link
                key={cat.id}
                to={`/products?category=${cat.key}`}
                className="group relative overflow-hidden rounded-2xl h-40 shrink-0 w-[60vw] md:w-auto snap-center shadow-sm hover:shadow-xl transition-all duration-500"
              >

                <img
                  src={cat.image}
                  alt={cat.name}
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

          <div className="relative group rounded-[2.5rem] overflow-hidden bg-indigo-900 aspect-3/4 sm:aspect-video md:aspect-21/9 flex items-center">

            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
              alt="Fashion Collection"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

            <div className="relative z-10 px-6 sm:px-8 md:px-20 max-w-2xl mt-12 sm:mt-0">

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

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                <Link
                  to="/products"
                  className="bg-white text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-indigo-600 hover:text-white transition flex items-center justify-center"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>

                <button
                  onClick={() => setOpenVideo(true)}
                  className="border-2 border-white/30 text-white backdrop-blur-md px-6 py-3 sm:px-8 sm:py-4 rounded-full cursor-pointer font-bold hover:bg-white/10 transition"
                >
                  Watch Film
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* TRENDING PRODUCTS */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-end mb-8">

            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-1">
                Trending Now
              </h2>
              <p className="text-neutral-500 text-sm">
                The most sought-after pieces this week.
              </p>
            </div>

            <Link
              to="/products"
              className="flex items-center font-bold text-indigo-600"
            >
              View All
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {trendingProducts.map((product) => (

              <div key={product._id} className="group">

                <Link to={`/products/${product._id}`}>

                  <div className="relative aspect-4/5 bg-neutral-100 rounded-3xl overflow-hidden mb-4 shadow-sm">

                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition">

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product);
                        }}
                        className="w-10 h-10 bg-white rounded-full flex items-center cursor-pointer justify-center shadow"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            wishlistItems?.some(
                              (item) => item._id === product._id
                            )
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleCart(product);
                        }}
                        className="w-10 h-10 bg-white rounded-full flex items-center cursor-pointer justify-center shadow"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>

                    </div>

                  </div>

                </Link>

                <h4 className="font-bold text-lg mb-1 line-clamp-1">
                  {product.title}
                </h4>

                <div className="flex items-center justify-between">

                  <span className="text-xl font-black">
                    ₹ {(product.price * USD_TO_INR).toLocaleString("en-IN")}
                  </span>

                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold ml-1">
                      {product.rating}
                    </span>
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

      {/* VIDEO MODAL */}

      {openVideo && (

        <div className="fixed inset-0 z-50 bg-black/80  flex items-center justify-center p-4">

          <div className="relative w-full max-w-5xl mt-8 aspect-video">

            <button
              onClick={() => setOpenVideo(false)}
              className="absolute -top-8 right-0 cursor-pointer text-white"
            >
              <X className="w-8 h-8"/>
            </button>

            <iframe
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/EzvH3yKeNRo"
              title="Fashion Film"
              allowFullScreen
            />

          </div>

        </div>

      )}

    </div>
  );
}