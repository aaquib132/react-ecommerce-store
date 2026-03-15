import { useState, useEffect, useRef, useMemo } from "react";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../useFetch";
import { useShop } from "../store/ShopContext";

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [search, setSearch] = useState("");

  const { cartItems, wishlistItems } = useShop();

  const navigate = useNavigate();
  const { data } = useFetch(`${import.meta.env.VITE_API_URL}/products`)

  const searchRef = useRef(null);

  /* Close search dropdown */

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

  /* Navbar scroll effect */

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  /* Search Suggestions */

  const suggestions = useMemo(() => {

    if (!data || !search.trim()) return [];

    const query = search.toLowerCase();

    return data
      .filter((product) =>
        product.title.toLowerCase().includes(query)
      )
      .slice(0, 5);

  }, [data, search]);

  /* Search Submit */

  const handleSearch = (e) => {

    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/products?search=${search}`);

    setShowSuggestions(false);
    setSearch("");
  };

  return (
    <>
      {/* NAVBAR */}

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center">

            {/* LOGO */}

            <button
              onClick={() => {
                setIsMenuOpen(false);
                window.location.href = "/";
              }}
              className="flex items-center space-x-2 z-50 relative cursor-pointer"
            >

              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl shrink-0">
                M
              </div>

              <span
                className={`text-xl sm:text-2xl font-black tracking-tight ${
                  scrolled ? "text-indigo-600" : "text-neutral-900"
                }`}
              >
                MyShoppingSite
              </span>

            </button>

            {/* SEARCH */}

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
                  className="w-full bg-neutral-100 rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />

                {showSuggestions && suggestions.length > 0 && (

                  <div className="absolute top-full mt-2 w-full bg-white shadow-xl rounded-xl border border-neutral-200 overflow-hidden z-50">

                    {suggestions.map((product) => (

                      <div
                        key={product._id}
                        onClick={() => {
                          navigate(`/products/${product._id}`);
                          setShowSuggestions(false);
                          setSearch("");
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-100 cursor-pointer transition"
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
                            ₹ {(product.price * 92).toLocaleString("en-IN")}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </form>

            {/* RIGHT ICONS */}

            <div className="flex items-center space-x-5">

              <Link
                to="/profile"
                className="hidden sm:flex items-center text-sm font-semibold hover:text-indigo-600 transition"
              >
                <User className="w-5 h-5 mr-1" />
                Profile
              </Link>

              {/* WISHLIST */}

              <Link to="/wishlist" className="relative group">

                <Heart className="w-6 h-6 group-hover:text-red-500 transition" />

                {wishlistItems?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}

              </Link>

              {/* CART */}

              <Link to="/cart" className="relative group">

                <ShoppingCart className="w-6 h-6 group-hover:text-indigo-600 transition" />

                {cartItems?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}

              </Link>

              {/* MOBILE MENU */}

              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>

            </div>

          </div>

        </div>

      </nav>

      {/* MOBILE MENU */}

      {isMenuOpen && (

        <div className="fixed inset-0 bg-white z-40 pt-24 px-6 flex flex-col space-y-4 md:hidden animate-in fade-in slide-in-from-top duration-300">

          {["Men", "Women", "Electronics", "Home"].map((cat) => (

            <Link
              key={cat}
              to={`/products?category=${cat.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-bold border-b border-neutral-100 pb-3 text-slate-800"
            >
              {cat}
            </Link>

          ))}

          <Link
            to="/profile"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-bold border-b border-neutral-100 pb-3 mt-2 text-slate-800"
          >
            Profile
          </Link>

        </div>

      )}

    </>
  );
}