import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useFetch from "../useFetch";
import { useShop } from "../store/ShopContext";
import { formatPrice } from "../utils/priceUtils";

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [search, setSearch] = useState("");

  const { cartItems, wishlistItems } = useShop();

  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useFetch(`${import.meta.env.VITE_API_URL}/products`);

  const searchRef = useRef(null);

  const checkoutRoutes = ["/shipping", "/payment", "/confirmation"];

  const isCheckoutPage = checkoutRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const suggestions = useMemo(() => {

    if (!data || !search.trim()) return [];

    const query = search.toLowerCase();

    return data
      .filter(product =>
        product.title.toLowerCase().includes(query)
      )
      .slice(0, 5);

  }, [data, search]);

  const handleSearch = (e) => {

    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/products?search=${search}`);

    setShowSuggestions(false);
    setSearch("");

  };

  return (
    <>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center">

            {/* LOGO */}

            <div
              onClick={() => {
                setIsMenuOpen(false);
                window.location.replace("/");
              }}
              className="flex items-center space-x-2 cursor-pointer"
            >

              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                M
              </div>

              <span
                className={`text-xl font-black ${
                  scrolled ? "text-indigo-600" : "text-neutral-900"
                }`}
              >
                MyShoppingSite
              </span>

            </div>

            {/* SEARCH */}

            {!isCheckoutPage && (

              <form
                ref={searchRef}
                onSubmit={handleSearch}
                className="hidden md:flex flex-1 max-w-md mx-8 relative"
              >

                <div className="relative w-full">

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearch(value);
                      setShowSuggestions(value.length > 0);
                    }}
                    placeholder="Search for items, brands..."
                    className="w-full bg-neutral-100 rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />

                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />

                  {/* SEARCH SUGGESTIONS FIX */}

                  {showSuggestions && suggestions.length > 0 && (

                    <div className="absolute top-full mt-2 w-full bg-white shadow-xl rounded-xl border border-neutral-200 overflow-hidden z-50">

                      {suggestions.map(product => (

                        <div
                          key={product._id}
                          onClick={() => {
                            navigate(`/products/${product._id}`);
                            setShowSuggestions(false);
                            setSearch("");
                          }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-100 cursor-pointer"
                        >

                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-10 h-10 object-cover rounded-md"
                          />

                          <div className="flex-1">

                            <p className="text-sm font-medium line-clamp-1">
                              {product.title}
                            </p>

                            <p className="text-xs text-neutral-500">
                              ₹ {formatPrice(product.price)}
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

                </div>

              </form>

            )}

            {/* RIGHT ICONS */}

            {!isCheckoutPage && (

              <div className="flex items-center space-x-5">

                <Link
                  to="/profile"
                  className="hidden sm:flex items-center text-sm font-semibold hover:text-indigo-600"
                >
                  <User className="w-5 h-5 mr-1" />
                  Profile
                </Link>

                <Link to="/wishlist" className="relative">

                  <Heart className="w-6 h-6 hover:text-red-500 transition" />

                  {wishlistItems?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {wishlistItems.length}
                    </span>
                  )}

                </Link>

                <Link to="/cart" className="relative">

                  <ShoppingCart className="w-6 h-6 hover:text-indigo-600 transition" />

                  {cartItems?.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cartItems.length}
                    </span>
                  )}

                </Link>

                <button
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu />
                </button>

              </div>

            )}

          </div>

        </div>

      </nav>

      {/* MOBILE MENU */}

      {!isCheckoutPage && isMenuOpen && (

        <div className="fixed inset-0 z-120 md:hidden">

          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[320px] max-w-[90%] bg-white shadow-2xl flex flex-col">

            <div className="flex items-center justify-between px-6 py-5">

              <h2 className="text-xl font-bold text-indigo-600">
                Menu
              </h2>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X size={22}/>
              </button>

            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-10 space-y-8">

              <div>

                <p className="text-xs text-gray-400 font-semibold tracking-wider mb-3">
                  SHOP
                </p>

                <div className="space-y-1">

                  {["Men","Women","Electronics","Home"].map(cat => (

                    <Link
                      key={cat}
                      to={`/products?category=${cat.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-100 transition"
                    >
                      {cat}
                      <span className="text-gray-400">›</span>
                    </Link>

                  ))}

                </div>

              </div>

              <div>

                <p className="text-xs text-gray-400 font-semibold tracking-wider mb-3">
                  ACCOUNT
                </p>

                <div className="space-y-1">

                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition"
                  >
                    <User size={18}/>
                    Profile
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Heart size={18}/>
                    Wishlist
                  </Link>

                  <Link
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition"
                  >
                    <ShoppingCart size={18}/>
                    Cart
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}