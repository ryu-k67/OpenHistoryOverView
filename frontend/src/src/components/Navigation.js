import Link from 'next/link'
import AuthContext from '@/context/AuthContext'
import { useContext } from 'react'

function Navigation(){
    let {user,logoutUser}=useContext(AuthContext)
    return(
        <>
            <div className='bg-gray-900'>
                <div className='max-w-7xl mx-auto px-8 py-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <Link href="/" className='text-white hover:text-gray-50 font-extrabold text-lg'>
                                HistoryOverView
                            </Link>
                        </div>
                        {user && <p className='text-white'>Hello {user.name}</p>}
                        <div>
                            <div>
                                {!user && 
                                    <Link href='/login' className='button-nav mr-4'>
                                        ログイン
                                    </Link>
                                }
                                {!user && 
                                    <Link href='/register' className='button-nav'>
                                        アカウント登録
                                    </Link>
                                }
                                
                                {user && 
                                    <Link href='/notelist' className='button-nav mr-4'>
                                        一覧
                                        </Link>
                                }
                                {user && 
                                    <p onClick={logoutUser} className='button-nav mr-4'>
                                        ログアウト
                                    </p>
                                }
                                                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* <p>Hello {name}</p> */}
            </div>
        </>
    )
}

export default Navigation