import { useState } from "react";
import { Minus, Plus, Heart, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../store/ShopContext";

import { formatPrice, formatINR } from "../utils/priceUtils";

export default function Cart() {
  const { cartItems, toggleCart, toggleWishlist } = useShop();
  const [qtyMap, setQtyMap] = useState({});
  const navigate = useNavigate();

  const cartProducts = cartItems;



  /* QUANTITY FUNCTIONS */

  const getQty = (id) => qtyMap[id] || 1;

  const changeQty = (id, value) => {
    setQtyMap((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + value),
    }));
  };

  /* PRICE CALCULATIONS */

  const subtotal = cartProducts.reduce(
    (sum, p) => sum + p.price * 92 * getQty(p._id),
    0,
  );

  const discount = Math.round(subtotal * 0.2);
  const delivery = subtotal > 2000 ? 0 : 199;
  const total = subtotal - discount + delivery;

  /* EMPTY CART */

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-700">
          Your Cart is Empty
        </h2>

        <Link
          to="/products"
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] pt-5 mt-20 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-center mb-10">
          MY CART ({cartProducts.length})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* CART ITEMS */}

          <div className="lg:col-span-2 space-y-6">
            {cartProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                {/* PRODUCT IMAGE */}

                <Link to={`/products/${product._id}`} state={{ product }} className="w-full sm:w-auto shrink-0">
                  <div className="bg-gray-100 p-4 sm:p-6 rounded-lg flex items-center justify-center w-full sm:w-32 md:w-40 aspect-square">
                    <img
                      src={product.thumbnail}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </Link>

                {/* PRODUCT INFO */}

                <div className="flex-1">
                  <Link
                    to={`/products/${product._id}`}
                    state={{ product }}
                    className="text-lg font-medium hover:text-indigo-600"
                  >
                    {product.title}
                  </Link>

                  {/* PRICE */}

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-2xl font-bold">
                      ₹ {formatPrice(product.price)}
                    </span>

                    <span className="line-through text-gray-400">
                      ₹ {formatINR(product.price * 1.4 * 92)}
                    </span>
                  </div>

                  <p className="text-green-600 text-sm font-medium mt-1">
                    {product.discountPercentage}% off
                  </p>

                  {/* QUANTITY */}

                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-sm">Quantity :</span>

                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => changeQty(product._id, -1)}
                        className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="px-4">{getQty(product._id)}</span>

                      <button
                        onClick={() => changeQty(product._id, 1)}
                        className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* ITEM SUBTOTAL */}

                  <p className="mt-2 text-sm text-gray-500">
                    Subtotal: ₹ {formatINR(product.price * 92 * getQty(product._id))}
                  </p>

                  {/* ACTION BUTTONS */}

                  <div className="mt-5 flex items-center gap-3">
                    {/* REMOVE */}

                    <button
                      onClick={() => toggleCart(product)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg
                      border border-red-200 text-red-600 bg-red-50
                      hover:bg-red-600 hover:text-white hover:border-red-600
                      transition-all cursor-pointer duration-200 active:scale-95"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>

                    {/* WISHLIST */}

                    <button
                      onClick={() => toggleWishlist(product)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg
                      border border-indigo-200 text-indigo-600 bg-indigo-50
                      hover:bg-indigo-600 hover:text-white hover:border-indigo-600
                      transition-all cursor-pointer duration-200 active:scale-95"
                    >
                      <Heart size={15} />
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PRICE SUMMARY */}

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm lg:sticky h-fit top-24">
            <h2 className="font-semibold mb-4">PRICE DETAILS</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Price ({cartProducts.length} items)</span>
                <span>₹{formatINR(subtotal)}</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹{formatINR(discount)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>
                  {delivery === 0
                    ? "FREE"
                    : `₹${formatINR(delivery)}`}
                </span>
              </div>
            </div>

            {subtotal < 2000 && (
              <div className="mt-4 text-sm text-orange-600">
                Add ₹{formatINR(2000 - subtotal)} more to get
                FREE delivery
              </div>
            )}

            <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
              <span>TOTAL AMOUNT</span>
              <span>₹{formatINR(total)}</span>
            </div>

            <p className="text-sm text-green-600 mt-3">
              You will save ₹{formatINR(discount)} on this order
            </p>

            <button
              onClick={() =>
                navigate("/shipping", {
                  state: {
                    checkoutItems: cartProducts.map((p) => ({
                      ...p,
                      quantity: p.quantity || 1,
                    })),
                  },
                })
              }
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold cursor-pointer transition"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
