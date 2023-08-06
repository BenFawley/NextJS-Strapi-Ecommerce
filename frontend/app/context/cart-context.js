import { createContext, useReducer } from "react";

const initialState = {
  items: [],
  totalQuantity: 0,
  isVisible: false,
};

// https://codesandbox.io/s/fb3f0?file=/src/components/Cart.js

const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    const newItem = action.item;
    return {
      ...state,
      items: state.items.find((item) => item.id === newItem.id)
        ? state.items.map((existingItem) =>
            existingItem.id === newItem.id
              ? {
                  ...existingItem,
                  quantity: existingItem.quantity + newItem.quantity,
                }
              : existingItem
          )
        : [...state.items, newItem],
      totalQuantity: state.totalQuantity + newItem.quantity,
      isVisible: true,
    };
  }
  if (action.type === "TOGGLE_CART") {
    return {
      ...state,
      isVisible: !state.isVisible,
    };
  } else {
    return state;
  }
};

// create context
const CartContext = createContext({
  //add available context functions here
  onShowCart: () => {},
  onAddToCart: (item) => {},
});

//context provider
export const CartContextProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const handleShowCart = () => {
    dispatchCartAction({
      type: "TOGGLE_CART",
    });
  };

  const handleAddToCart = (item) => {
    dispatchCartAction({
      type: "ADD_TO_CART",
      item: item,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        onShowCart: handleShowCart,
        onAddToCart: handleAddToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
