import { useSelector } from "react-redux"
import Head from 'next/head'

function Index(){
  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated)
  const user=useSelector((state)=>state.auth.user)
  return(
    <>
      <Head>
        <title>
          チュートリアル
        </title>
      </Head>
      <div>
        {isAuthenticated && user ? (
          <div>
            <div>welcom, {user.name}</div>
            <div className="my-4 border-4 border-dashed border-gray-200 rounded">
              <div className="flex justify-center items-center h-64">無料会員</div>
            </div>
          </div>
        ):(
          <div className="text-center text-2xl">
            チュートリアル
          </div>
        )}
      </div>
    </>
  )
}

export default Index