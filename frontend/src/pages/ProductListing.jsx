import { useState, useMemo, useRef, useEffect } from "react";
import { RotateCcw, LayoutGrid, List, ChevronDown, Filter } from "lucide-react";
import useFetch from "../useFetch";
import categoryMap from "../utils/categoryMap";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import ProductListingSkeleton from "../components/ProductListingSkeleton";
import SearchBar from "../components/MobileSearchBar";

import { formatINR } from "../utils/priceUtils";

export default function ProductListing() {
  const MIN = 10;
  const MAX = 1000000;

  const [viewMode, setViewMode] = useState("grid");
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortRef = useRef(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromURL ? [categoryFromURL] : [],
  );

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_URL}/products`,
  );

  /* CLOSE SORT DROPDOWN */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* FILTER + SORT */

  const filteredProducts = useMemo(() => {
    if (!data) return [];

    let products = data.filter((product) => {
      const price = product.price * 92;

      const priceMatch = price >= MIN && price <= maxPrice;

      const productCategory = categoryMap[product.category];

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(productCategory);

      const ratingMatch =
        ratingFilter === null || product.rating >= ratingFilter;

      const searchMatch =
        !searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase());

      return priceMatch && categoryMatch && ratingMatch && searchMatch;
    });

    if (sortOrder === "low") {
      products = [...products].sort(
        (a, b) => a.price * 92 - b.price * 92,
      );
    }

    if (sortOrder === "high") {
      products = [...products].sort(
        (a, b) => b.price * 92 - a.price * 92,
      );
    }

    if (sortOrder === "rating") {
      products = [...products].sort((a, b) => b.rating - a.rating);
    }

    if (sortOrder === "discount") {
      products = [...products].sort(
        (a, b) => b.discountPercentage - a.discountPercentage,
      );
    }

    return products;
  }, [
    data,
    maxPrice,
    selectedCategories,
    ratingFilter,
    sortOrder,
    searchQuery,
  ]);

  const handleResetFilters = () => {
    setResetLoading(true);

    setMaxPrice(MAX);
    setRatingFilter(null);
    setSortOrder(null);
    setSelectedCategories([]);

    navigate("/products");

    setTimeout(() => {
      setResetLoading(false);
    }, 600); // small delay for UX smoothness
  };

  if (loading || resetLoading) {
    return <ProductListingSkeleton viewMode={viewMode} />;
  }
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen mt-20 bg-slate-50 font-sans text-slate-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* MOBILE SEARCH + FILTER */}

        <div className="lg:hidden flex items-stretch gap-3">
          {/* SEARCH */}
          <div className="flex-1">
            <SearchBar />
          </div>

          {/* FILTER BUTTON */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="h-12 w-12 shrink-0 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-sm text-slate-700 hover:bg-slate-50 transition"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* FILTER SIDEBAR */}

          <aside
            className={`lg:w-64 shrink-0 ${isFilterOpen ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-8 lg:sticky top-24 lg:max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Filters</h2>

                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-md cursor-pointer hover:bg-indigo-100"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              {/* PRICE RANGE */}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Price Range</h3>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md font-medium">
                    ₹ {MIN}
                  </span>

                  <span className="text-slate-400">—</span>

                  <span className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md font-medium">
                    ₹ {formatINR(maxPrice)}
                  </span>
                </div>

                <div className="relative h-6">
                  <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-200 rounded-full -translate-y-1/2"></div>

                  <div
                    className="absolute top-1/2 left-0 h-1.5 bg-indigo-600 rounded-full -translate-y-1/2"
                    style={{ width: `${(maxPrice / MAX) * 100}%` }}
                  />

                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="absolute top-1/2 w-full -translate-y-1/2 appearance-none bg-transparent cursor-pointer"
                  />
                </div>
              </div>

              {/* CATEGORY */}

              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Category</h3>

                {[
                  { id: "men", label: "Men Wear" },
                  { id: "women", label: "Women Wear" },
                  { id: "beauty", label: "Beauty" },
                  { id: "electronics", label: "Electronics" },
                  { id: "home", label: "Home" },
                ].map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([
                            ...selectedCategories,
                            cat.id,
                          ]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((c) => c !== cat.id),
                          );
                        }
                      }}
                      className="w-4 h-4"
                    />

                    <span className="text-sm text-slate-600">{cat.label}</span>
                  </label>
                ))}
              </div>

              {/* RATING FILTER */}

              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Rating</h3>

                {[4, 3, 2, 1].map((r) => (
                  <label
                    key={r}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingFilter === r}
                      onChange={() => setRatingFilter(r)}
                      className="w-4 h-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />

                    <span className="text-sm text-slate-600 group-hover:text-slate-900">
                      {r} Stars & up
                    </span>
                  </label>
                ))}
              </div>

              {/* Sorting by Price */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Sort By</h3>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="sort_sidebar"
                    value="low"
                    checked={sortOrder === "low"}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-900">
                    Price: Low to High
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="sort_sidebar"
                    value="high"
                    checked={sortOrder === "high"}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-900">
                    Price: High to Low
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}

          <div className="grow space-y-6">
            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* LEFT */}
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {searchQuery
                    ? `Search results for "${searchQuery}"`
                    : "All Products"}
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Showing{" "}
                  <span className="font-medium">{filteredProducts.length}</span>{" "}
                  products
                </p>
              </div>

              {/* CONTROLS */}
              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                {/* VIEW MODE */}
                <div className="flex bg-white border border-slate-200 rounded-lg shadow-sm p-0.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center justify-center cursor-pointer w-8 h-8 rounded-md transition
        ${
          viewMode === "grid"
            ? "bg-indigo-600 text-white"
            : "text-slate-400 hover:bg-slate-100"
        }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center justify-center w-8 h-8 rounded-md transition
        ${
          viewMode === "list"
            ? "bg-indigo-600 text-white"
            : "text-slate-400 hover:bg-slate-100"
        }`}
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* SORT */}
                <div ref={sortRef} className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs cursor-pointer font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm"
                  >
                    Sort
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition ${
                        sortOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {sortOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-40">
                      {[
                        { label: "Price: Low → High", value: "low" },
                        { label: "Price: High → Low", value: "high" },
                        { label: "Best Rating", value: "rating" },
                        { label: "Best Discount", value: "discount" },
                      ].map((item) => (
                        <button
                          key={item.value}
                          onClick={() => {
                            setSortOrder(item.value);
                            setSortOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 transition"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PRODUCT GRID */}

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-6"
              }
            >
              {resetLoading ? (
                <ProductGridSkeleton viewMode={viewMode} />
              ) : (
                filteredProducts?.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))
              )}
            </div>
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                {/* Icon */}
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <RotateCcw className="w-8 h-8 text-slate-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-800">
                  No products found
                </h3>

                {/* Message */}
                <p className="text-sm text-slate-500 mt-2 max-w-md">
                  We couldn't find any products matching your search or filters.
                  Try adjusting your filters or explore all products.
                </p>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  {/* Browse All */}
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-indigo-600 cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                  >
                    {searchQuery ? "Clear Search" : "Browse All Products"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
