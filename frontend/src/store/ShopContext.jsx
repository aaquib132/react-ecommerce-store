import { createContext, useContext, useReducer, useEffect } from "react";

const ShopContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
};

function shopReducer(state, action) {

  switch (action.type) {

    case "TOGGLE_CART": {

      const exists = state.cart.find(
        (item) => item._id === action.payload._id
      );

      return {
        ...state,
        cart: exists
          ? state.cart.filter((item) => item._id !== action.payload._id)
          : [...state.cart, action.payload],
      };
    }

    case "TOGGLE_WISHLIST": {

      const exists = state.wishlist.find(
        (item) => item._id === action.payload._id
      );

      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((item) => item._id !== action.payload._id)
          : [...state.wishlist, action.payload],
      };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
}

export function ShopProvider({ children }) {

  const [state, dispatch] = useReducer(shopReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  const toggleCart = (product) => {
    dispatch({ type: "TOGGLE_CART", payload: product });
  };

  const toggleWishlist = (product) => {
    dispatch({ type: "TOGGLE_WISHLIST", payload: product });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems: state.cart,
        wishlistItems: state.wishlist,
        toggleCart,
        toggleWishlist,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);