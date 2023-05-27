import Link from 'next/link'
import AuthContext, {AUthProvider} from '@/context/AuthContext'
import { useContext } from 'react'

function Navigation(){
    let {user}=useContext(AuthContext)
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
                        {user && <p className='text-white'>Hello {user.name}</p>}
                        <div>
                            <div>
                                <Link href='/login' className='button-nav mr-4'>
                                    ログイン
                                </Link>
                                <Link href='/register' className='button-nav'>
                                    アカウント登録
                                </Link>                                
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