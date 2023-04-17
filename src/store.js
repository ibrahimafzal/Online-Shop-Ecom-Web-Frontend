
import { combineReducers, applyMiddleware, legacy_createStore as createStore } from 'redux'
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from "./redux/reducers/productReducer"
import { cartReducer } from "./redux/reducers/cartReducers"
import { userLoginReducer, userProfileDetailsReducer, userRegisterReducer, userUpdateProfileReducer } from "./redux/reducers/userReducers";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './redux/reducers/orderReducer'

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

//get shipping Address From Storage
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

// // here we combine all the reducers/actions
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfileDetails: userProfileDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer
});

// here we create a global state that can be accessed from anywhere in the app.
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    }
};

// // thunk is a middleware which combine the redux and react together
const middleware = [thunk];


// //create store
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

