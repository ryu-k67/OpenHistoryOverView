import React from 'react'

const Login=()=>{
    return (
        <div>
            <form>
                <input type="text" name="name" placeholder='Enter Username' />
                <input type="email" name="email" placeholder='Enter Email' />
                <input type='password' name='password' placeholder='Enter Password' />
                <input type='submit' />
            </form>
        </div>
    )
}

export default Login