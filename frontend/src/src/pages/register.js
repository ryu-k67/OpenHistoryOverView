import {useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {register} from '../actions/auth'
import Head from 'next/head'

function Register(){
    const dispatch=useDispatch()
    const router=useRouter()
    const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated)
    const loading=useSelector((state)=>state.auth.loading)

    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    })

    const {name,email,password}=formData

    const onSubmit=async(e)=>{
        e.preventDefault()
        
        if(dispatch && dispatch!=null && dispatch!==undefined){
            await dispatch(register(name,email,password))
        }
    }

    const onChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    if(typeof window!=='undefined' && isAuthenticated){
        router.push('/')
    }

    return(
        <>
            <Head>
                <title>
                    ユーザー登録
                </title>
            </Head>
            <div className='text-center text-2xl mb-5'>ユーザー登録</div>
            <form className='w-1/3 mx-auto' onSubmit={onSubmit}>
                <div className='mb-4'>
                    <div className='mb-1' htmlFor='name'>
                        ユーザー名
                    </div>
                    <input className='input-form' type='text' name='name' placeholder='abc' onChange={onChange} value={name} required></input>
                </div>
                <div className='mb-4'>
                    <div className='mb-1' htmlFor='email'>
                        メアド
                    </div>
                    <input className='input-form' type='email' name='email' placeholder='xxx@xxx.com' onChange={onChange} value={email} required></input>
                </div>
                <div className='mb-4'>
                    <div className='mb-1' htmlFor='password'>
                        パスワード
                    </div>
                    <input className='input-form' type='password' name='password' placeholder='半角英数8文字以上' onChange={onChange} value={password} required></input>
                </div>
                <div className='flex justify-center'>
                    {/* {loading ? (
                        <Loader type='Oval' color='#F59E00' width={50} height={50}></Loader>
                    ):( */}
                        <button className='button-yellow' type='submit'>
                            登録
                        </button>
                    {/* )} */}
                </div>
            </form>
        </>
    )
}

export default Register