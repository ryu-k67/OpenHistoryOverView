import React,{ createContext,useState,useEffect } from "react";
import jwt_decode from 'jwt-decode'
import {useRouter} from 'next/router'

const AuthContext=React.createContext()

export default AuthContext


export const AUthProvider=({children})=>{
    
    let [authTokens,setAuthTokens]=useState(null)
    let [user,setUser]=useState(null)
    let change=true

    useEffect(()=>{
        setAuthTokens(localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null)
        setUser(localStorage.getItem('authTokens')?jwt_decode(localStorage.getItem('authTokens')):null)
    },[change])


    let router=useRouter()

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
                localStorage.setItem('authTokens',JSON.stringify(data))
                router.push('/')
                change=false
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

    let logoutUser=()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        router.push('/')
        console.log('logout')
    }

    let contextData={
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}