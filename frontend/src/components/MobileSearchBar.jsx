import { useState, useMemo, useRef, useEffect } from "react";
import Search from "lucide-react/dist/esm/icons/search";
import { useNavigate } from "react-router-dom";
import useFetch from "../useFetch";

const USD_TO_INR = 92;

export default function SearchBar() {

  const navigate = useNavigate();

  const { data } = useFetch(`${import.meta.env.VITE_API_URL}/products`);

  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);

  /* Close suggestion dropdown */

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

  /* Suggestions */

  const suggestions = useMemo(() => {

    if (!data || !search.trim()) return [];

    const query = search.toLowerCase();

    return data
      .filter((product) =>
        product.title.toLowerCase().includes(query)
      )
      .slice(0, 5);

  }, [data, search]);

  /* Search submit */

  const handleSearch = (e) => {

    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/products?search=${search}`);

    setSearch("");
    setShowSuggestions(false);

  };

  return (

    <div className="md:hidden w-full px-4 mb-8" ref={searchRef}>

      <form onSubmit={handleSearch} className="relative">

        <input
          type="text"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            setShowSuggestions(value.length > 0);
          }}
          placeholder="Search products..."
          className="w-full bg-white border border-neutral-200 rounded-full py-3 pl-10 pr-4 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
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
                    ₹ {(product.price * USD_TO_INR).toLocaleString("en-IN")}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </form>

    </div>

  );

}