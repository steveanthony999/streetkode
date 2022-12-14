import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import modalReducer from '../features/modals/modalSlice';
import productReducer from '../features/products/productSlice';
import shopReducer from '../features/shop/shopSlice';
import categoryReducer from '../features/categories/categorySlice';
import variantsReducer from '../features/variants/variantsSlice';
import productDescriptionReducer from '../features/productDescription/productDescriptionSlice';
import cartReducer from '../features/cart/cartSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';
import customerInputReducer from '../features/customerInputs/customerInputSlice';
import shippingReducer from '../features/shipping/shippingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalReducer,
    products: productReducer,
    shop: shopReducer,
    categories: categoryReducer,
    variants: variantsReducer,
    productDescription: productDescriptionReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    customerInput: customerInputReducer,
    shipping: shippingReducer,
  },
});
