import {useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {login, user} from '@/actions/auth'
import Head from 'next/head'

const Login=()=>{
    const dispatch=useDispatch()
    const router=useRouter()
    const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated)
    const loading=useSelector((state)=>state.auth.loading)

    const [formData,setFormData]=useState({
        email:'',
        password:'',
    })

    const {email,password}=formData

    const onChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onSubmit=async(e)=>{
        e.preventDefault()

        if(dispatch && dispatch!==null && dispatch!==undefined){
            await dispatch(login(email,password))
        }
    }

    if(typeof window!=='undefined' && isAuthenticated){
        router.push('/')
    }

    return(
        <>
            <Head>
                <title>
                    ログイン
                </title>
            </Head>

            <div className='text-center text-2xl mb-5'>ログイン</div>
            <form className='w-1/3 mx-auto' onSubmit={onSubmit}>
                <div className='mb-4'>
                    <div className='mb-1' htmlFor='email'>
                        メアド
                    </div>
                    <input className='input-form' type='email' name='email' 
                        placeholder='xxx@xxx.com' onChange={onChange} value={email} 
                        required 
                    />
                </div>
                <div className='mb-4'>
                    <div className='mb-1' htmlFor='password'>
                        パスワード
                    </div>
                    <input className='input-form' type='password' name='password' 
                        placeholder='半角英数8文字以上' onChange={onChange} value={password} 
                        required 
                    />
                </div>
                <div className='flex justify-center'>
                    <button className='button-yellow' type='submit'>
                        送信
                    </button>
                </div>
            </form>
        </>
    )
}

export default Login