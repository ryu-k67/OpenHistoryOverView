import AuthContext from '@/context/AuthContext'
import React,{useContext} from 'react'


const Login=()=>{
    let {loginUser}=useContext(AuthContext)
    let {user}=useContext(AuthContext)
    return (
        <div>
            <div>
                <form onSubmit={loginUser}>
                    <input type="email" name="email" placeholder='Enter Email' />
                    <input type='password' name='password' placeholder='Enter Password' />
                    <input type='submit' className='button-yellow'/>
                </form>
            </div>
            {user && <p>Hello {user.name}</p>}
        </div>
    )
}

export default Login