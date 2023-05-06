import Link from 'next/link'

function Navigation(){
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
        </>
    )
}

export default Navigation