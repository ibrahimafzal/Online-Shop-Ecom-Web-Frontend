import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILED,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILED
} from "../../constant/productConstant"

const initialState = {
    products: [],
    loading: false
}

export const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                products: []
            };

        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            };

        case PRODUCT_LIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};



const INITIAL_STATE = {
    product:{
        reviews:[]
    }
}
export const productDetailsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                product: { reviews: [] },
                loading: true
                
            };

        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            };

        case PRODUCT_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};