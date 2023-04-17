import axios from "../../http";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../../constant/cartConstant";

// ADD TO CART //
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/products/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    console.log('cartItems', getState().cart.cartItems);
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

// REMOVE FROM CART //
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

// SAVE SHIPPING ADDRESS //
export const saveShippingAddress = ({...data}) => (dispatch) => {
    // console.log('data::', data);
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: {
            address: data.address,
            city: data.city,
            postalcode: data.postalcode,
            country: data.country,
        }
    });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}


// SAVE PAYMENT METHODS //
export const savePaymentMethods = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload:data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

