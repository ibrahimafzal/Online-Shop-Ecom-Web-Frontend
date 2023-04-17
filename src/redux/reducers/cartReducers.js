import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../../constant/cartConstant";


const initialState = {
    cartItems: []
}
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item] // jahan cartItems: likha ha yahan hm kch b name rakh skty hain, upar b same isi tra e hai
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload } //jahan shippingAdress: likha hai yahan hm kch b name rakh skty hain

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state, paymentMethod: action.payload
            }

        default:
            return state;
    }
}
