import axios from "../../http";
import {
    USER_LOGIN_FAILED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAILED,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_PROFILE_DETAILS_REQUEST,
    USER_PROFILE_DETAILS_SUCCESS,
    USER_PROFILE_DETAILS_FAILED,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAILED,
} from "../../constant/userConstant"

// logout action //
export const logout = () => dispatch => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

// login action //
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAILED,
            payload: error.message
        })
    }
}

// register action //
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('', { name, email, password }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAILED,
            payload: error.message
        })
    }
}

// profile details action //
export const getUserProfileDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_DETAILS_REQUEST
        });
        const { userLogin: { userInfo } } = getState()
        const config = { //token compare karny k liye hm yahan header likhain gy
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` // yahan hm token get kr rhy hain, get kr rahy hain generate nae
            }
        }
        const { data } = await axios.get(`/${id}`, config)
        dispatch({
            type: USER_PROFILE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_PROFILE_DETAILS_FAILED,
            payload: error.message
        })
    }
}

// profile update action
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put('/profile', user, config) //yahan hm user ku pass krwa rhy hain ku k hmary pas already aik user hai.
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAILED,
            payload: error.message
        })
    }
}