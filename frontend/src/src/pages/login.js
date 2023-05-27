import AuthContext from '@/context/AuthContext'
import React,{useContext} from 'react'

const Login=()=>{
    let {loginUser}=useContext(AuthContext)
    return (
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="name" placeholder='Enter Username' />
                <input type="email" name="email" placeholder='Enter Email' />
                <input type='password' name='password' placeholder='Enter Password' />
                <input type='submit' />
            </form>
        </div>
    )
}

export default Login