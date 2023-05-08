import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    USER_SUCCESS,
    USER_FAIL,

    REFRESH_SUCCESS,
    REFRESH_FAIL,

    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
} from "@/actions/types"

const initialState={
    user:null,
    isAuthenticated:null,
    loading:false,
}

function authReducer(state=initialState,action){
    const {type,payload}=action

    switch(type){
        case REGISTER_SUCCESS:
            return{
                ...state,
            }
        case REGISTER_FAIL:
            return{
                ...state,
            }

        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated:true,
            }
        case LOGIN_FAIL:
            return{
                ...state,
                isAuthenticated:false,
            }

        case USER_SUCCESS:
            return{
                ...state,
                user:payload.user,
            }
        case USER_FAIL:
            return{
                ...state,
                user:null,
            }

        case REFRESH_SUCCESS:
            return{
                ...state,
            }
        case REFRESH_FAIL:
            return{
                ...state,
                isAuthenticated:false,
                user:null,
            }

        case AUTHENTICATED_SUCCESS:
            return{
                ...state,
                isAuthenticated:true,
            }
        case AUTHENTICATED_FAIL:
            return{
                ...state,
                isAuthenticated:false,
                user:null,
            }

        case LOGOUT_SUCCESS:
            return{
                ...state,
                isAuthenticated:false,
                user:null,
            }
        case LOGOUT_FAIL:
            return{
                ...state,
            }

        case SET_AUTH_LOADING:
            return{
                ...state,
                loading:true,
            }
        case REMOVE_AUTH_LOADING:
            return{
                ...state,
                loading:false,
            }
        default:
            return state
    }
}

export default authReducer