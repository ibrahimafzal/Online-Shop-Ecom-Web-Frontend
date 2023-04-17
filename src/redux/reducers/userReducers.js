import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILED,
    USER_PROFILE_DETAILS_REQUEST,
    USER_PROFILE_DETAILS_SUCCESS,
    USER_PROFILE_DETAILS_FAILED,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAILED,
} from '../../constant/userConstant';



export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAILED:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state;
    }

}


//register Reducer
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_REGISTER_FAILED:
            return { loading: false, error: action.payload }

        default:
            return state;
    }

}

//GET DETAILS OF USER PROFILE REDUCER
export const userProfileDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_PROFILE_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_PROFILE_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_PROFILE_DETAILS_FAILED:
            return { loading: false, error: action.payload }

        default:
            return state;   //this is new state which reducer returns
    }

}

// Actually reducer function takes 2 arguments, one is the current state and 2nd is action and return a new state //


//UPDATE USER PROFILE REDUCER
export const userUpdateProfileReducer = (state = {}, action) => {
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading:true};
        
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading:false, success:true, userInfo:action.payload};
        
        case USER_UPDATE_PROFILE_FAILED:
            return {loading:false, error:action.payload};
        
        default :
        return state;
    }
}