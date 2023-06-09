import axios from '../../http'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILED,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILED,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAILED
} from '../../constant/orderConstant'


export const createOrder = (order) => async (dispatch, getState) => {
    console.log("order::", order);
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                "Contnet-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        };
        const { data } = await axios.post('/orders', order, config)
        // console.log("data", { data });
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAILED,
            payload: error.message
        })
    }
}



export const getOrderDetails = (id) => async (dispatch, getState) => {
    console.log("getOrderDetails(id)::", id);
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };
        const { data } = await axios.get(`/orders/${id}`, config)
        console.log('data::', {data});
        // console.log("data", { data });
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAILED,
            payload: error.message
        })
    }
}

export const payOrderAction = (orderId, paymentResult) => async (dispatch, getState) => {
    console.log("payOrderAction(id)::", orderId);
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        };
        const { data } = await axios.put(`/orders/${orderId}/pay`,paymentResult, config)
        console.log('data::', {data});
        // console.log("data", { data });
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAILED,
            payload: error.message
        })
    }
}