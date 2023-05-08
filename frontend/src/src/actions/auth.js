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
    REMOVE_AUTH_LOADING
} from "./types"
import cookie from 'cookie'

export const register=(name,email,password)=>async(dispatch)=>{
    dispatch({
        type:SET_AUTH_LOADING,
    })

    const body=JSON.stringify({
        name,
        email,
        password
    })

    try{
        console.log(process.env.NEXT_PUBLIC_API_URL)

        console.log(body)
        const res = await fetch('/api/account/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: body,
        })
        // .then(res =>{
        //     console.log(res)
        // }).catch(error => {
        //     // ネットワークエラーでも !response.ok でもここで処理できる
        //     console.log('エラーが発生しました', error);
        //   });

        if(res.status===200){
            dispatch({
                type:REGISTER_SUCCESS,
            })
        }else{
            dispatch({
                type:REGISTER_FAIL,
            })
        }
    }catch(err){
        console.log('err')
        dispatch({
            type:REGISTER_FAIL,
        })
    }

    dispatch({
        type:REMOVE_AUTH_LOADING,
    })
}

export const login=(email,password)=>async(dispatch)=>{
    dispatch({
        type:SET_AUTH_LOADING,
    })
    
    const body=JSON.stringify({
        email,
        password,
    })

    try{
        console.log(body)
        const res=await fetch('/api/account/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:body,
        })

        if(res.status===200){
            dispatch({
                type:LOGIN_SUCCESS,
            })
            // console.log(res.headers)
            // const cookies=cookie.parse(res.headers.cookie)
            // console.log(cookies)

            dispatch(user())
        }else{
            dispatch({
                type:LOGIN_FAIL,
            })
        }
    }catch(err){
        dispatch({
            type:LOGIN_FAIL,
        })
    }

    dispatch({
        type:REMOVE_AUTH_LOADING,
    })
}

export const user=()=>async(dispatch)=>{
    dispatch({
        type:SET_AUTH_LOADING,
    })

    try{
        const res=await fetch('/api/account/user',{
            method:'GET',
        })

        const data=await res.json()

        if(res.status===200){
            dispatch({
                type:USER_SUCCESS,
                payload:data,
            })
        }else{
            dispatch({
                type:USER_FAIL,
            })
        }
    }catch(err){
        dispatch({
            type:USER_FAIL,
        })
    }

    dispatch({
        type:REMOVE_AUTH_LOADING,
    })
}

export const refresh=()=>async(dispatch)=>{
    dispatch({
        type:SET_AUTH_LOADING,
    })

    try{
        const res=await fetch('/api/account/refresh',{
            method:'GET',
        })

        if(res.status===200){
            dispatch({
                type:REFRESH_SUCCESS,
            })

            dispatch(verify())
        }else{
            dispatch({
                type:REFRESH_FAIL,
            })
        }
    }catch(err){
        dispatch({
            type:REFRESH_FAIL
        })
    }

    dispatch({
        type:REMOVE_AUTH_LOADING,
    })
}

export const verify=()=>async(dispatch)=>{
    dispatch({
        type:SET_AUTH_LOADING,
    })

    try{
        const res=await fetch('/api/accout/verify',{
            method:'GET',
        })

        if(res.status===200){
            dispatch({
                type:AUTHENTICATED_SUCCESS,
            })

            dispatch(user())
        }else{
            dispatch({
                type:AUTHENTICATED_FAIL,
            })
        }

    }catch(err){
        dispatch({
            type:AUTHENTICATED_FAIL,
        })
    }

    dispatch({
        type:REMOVE_AUTH_LOADING,
    })
}

export const logout=()=>async(dispatch)=>{
    dispatch({
        type:SET_AUTH_LOADING,
    })
    
    try{
        const res=await fetch('/api/account/logout',{
            method:'POST',
        })

        if(res.status===200){
            dispatch({
                type:LOGOUT_SUCCESS,
            })
        }else{
            dispatch({
                type:LOGOUT_FAIL
            })
        }

    }catch(err){
        dispatch({
            type:LOGOUT_FAIL,
        })
    }

    dispatch({
        type:REMOVE_AUTH_LOADING,
    })
}