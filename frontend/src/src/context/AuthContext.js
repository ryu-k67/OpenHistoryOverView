import React,{ createContext,useState,useEffect } from "react";
import jwt_decode from 'jwt-decode'

const AuthContext=React.createContext()

export default AuthContext


export const AUthProvider=({children})=>{

    let [authTokens,setAuthTokens]=useState(null)
    let [user,setUser]=useState(null)

    let loginUser=async(e)=>{
        e.preventDefault()
        console.log('From submitted')
        let response=await fetch('http://127.20.0.4:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Headers': 'Content-Type'
            },
            body:JSON.stringify({'email':e.target.email.value,'password':e.target.password.value})
        })
        .then(async(res)=>{
            let data=await res.json()
            console.log('data:',data)
            console.log(jwt_decode(data.access))
            if(res.status===200){
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
            }
            else{
                console.log('status error')
            }
        })
        .then(()=>{
            console.log(authTokens)
            console.log(user)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    let contextData={
        user:user,
        loginUser:loginUser
    }

    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}