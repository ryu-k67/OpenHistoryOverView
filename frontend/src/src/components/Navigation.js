import Link from 'next/link'
import { useSelector,useDispatch } from 'react-redux'
import {logout} from '@/actions/auth'

function Navigation(){
    const dispatch=useDispatch()
    const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated)

    const logoutHandler=async()=>{
        if(dispatch && dispatch!==null && dispatch!==undefined){
            await dispatch(logout())
        }
    }

    return(
        <>
            <div className='bg-gray-900'>
                <div className='max-w-7xl mx-auto px-8 py-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <Link href="/" className='text-white hover:text-gray-50 font-extrabold text-lg'>
                                チャレンジ
                            </Link>
                        </div>
                        <div className=''>
                            {isAuthenticated ? (
                                <div onClick={logoutHandler} className='cursor-pointer button-nav'>
                                    ログアウト
                                </div>
                            ):(
                                <div>
                                    <Link href='/login' className='button-nav mr-4'>
                                        ログイン
                                    </Link>
                                    <Link href='/register' className='button-nav'>
                                        アカウント登録
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation