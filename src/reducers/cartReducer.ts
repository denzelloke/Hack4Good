import { CartState, CartItem, Product } from '../types'; // Import the types

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPoints: 0,
};

export const cartReducer = (state = initialState, action: any): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newProduct: Product = action.payload;

      // Check if the product already exists in the cart (by productId)
      const existingProductIndex = state.items.findIndex(
        (item) => item.productId === newProduct.id
      );

      let updatedItems = [...state.items];
      let updatedTotalQuantity = state.totalQuantity;
      let updatedTotalPoints = state.totalPoints;

      if (existingProductIndex >= 0) {
        // If the product exists, update its quantity
        updatedItems[existingProductIndex].quantity += 1;
      } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        updatedItems.push({
          productId: newProduct.id,
          quantity: 1,
        });
      }

      // Update total quantity and total points
      updatedTotalQuantity = updatedItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      updatedTotalPoints = updatedItems.reduce(
        (total, item) => total + newProduct.points * item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalQuantity: updatedTotalQuantity,
        totalPoints: updatedTotalPoints,
      };

    default:
      return state;
  }
};

