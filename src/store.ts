import { createStore, combineReducers } from 'redux';
import { cartReducer } from './reducers/cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer, // Add your other reducers here if needed
});

const store = createStore(rootReducer);

export default store;
