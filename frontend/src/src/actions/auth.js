import { REGISTER_SUCCESS,REGISTER_FAIL,SET_AUTH_LOADING,REMOVE_AUTH_LOADING } from "./types"

export default function register(name,email,password){
    return async(dispatch)=>{
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
        }).then(res =>{
            console.log(res)
        }).catch(error => {
            // ネットワークエラーでも !response.ok でもここで処理できる
            console.log('エラーが発生しました', error);
          });

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
}}