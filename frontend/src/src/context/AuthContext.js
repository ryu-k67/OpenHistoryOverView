import React,{ createContext,useState,useEffect } from "react";
import jwt_decode from 'jwt-decode'
import {useRouter} from 'next/router'

const AuthContext=React.createContext()

export default AuthContext


export const AuthProvider=({children})=>{
    
    let [authTokens,setAuthTokens]=useState(null)
    let [user,setUser]=useState(null)
    // let change=true
    let [loading,setLoading]=useState(true)
    let curr_path='/'

    let router=useRouter()


    useEffect(()=>{
        setAuthTokens(localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null)
        setUser(localStorage.getItem('authTokens')?jwt_decode(localStorage.getItem('authTokens')):null)
    },[loading])

    // useEffect(()=>{
    //     router.push(curr_path)
    // },[curr_path])

    let RegistUser=async(e)=>{
        e.preventDefault()
        console.log('From submitted')
        let body=JSON.stringify({'name':e.target.name.value,'email':e.target.email.value,'password':e.target.password.value})
        console.log(body)
        // let response=await fetch('http://127.20.0.4:8000/api/register/',{
        let response=await fetch('http://django:8000/api/register/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:body
        })
        .then(async(res)=>{
            // let data=await res.json()
            // console.log('data:',data)
            // console.log(jwt_decode(data.access))
            if(res.status===201){
                console.log('register success,user created')
                // setAuthTokens(data)
                // setUser(jwt_decode(data.access))
                // localStorage.setItem('authTokens',JSON.stringify(data))
                loginUser(e)
                // change=false
            }
            else{
                console.log('ユーザー登録に失敗')
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


    let loginUser=async(e)=>{
        e.preventDefault()
        console.log('From submitted')
        // let response=await fetch('http://127.20.0.4:8000/api/token/',{
        let response=await fetch('http://django:8000/api/token/',{
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
                // change=false
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

    let updateToken = async()=>{
        console.log('Update token')
        let response=await fetch('http://django:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                // 'Access-Control-Allow-Headers': 'Content-Type'
                // 'Access-Control-Allow-Headers':'access-control-allow-headers'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })
        .then(async(res)=>{
            let data=await res.json()
            // console.log('data:',data)
            // console.log(jwt_decode(data.access))
            if(res.status===200){
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens',JSON.stringify(data))
                // console.log(router.pathname)
                // localStorage.setItem('curr_path',router.pathname)
                // router.replace('/notelist')
                // change=false
            }
            else{
                console.log('status error')
                logoutUser()
            }

            // if(loading){
            //     setLoading(false)
            // }
        })
        .then(()=>{
            console.log(authTokens)
            console.log(user)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{

        // if(loading){
        //     updateToken()
        // }

        let minutes=1000*60*4
        let interval=setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        },minutes)
        return ()=> clearInterval(interval)

    },[authTokens,loading])

    let contextData={
        user:user,
        authTokens:authTokens,
        RegistUser:RegistUser,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData} >
            {/* {loading ? null:children} */}
            {children}
        </AuthContext.Provider>
    )
}