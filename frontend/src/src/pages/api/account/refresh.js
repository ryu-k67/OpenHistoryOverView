import cookie from 'cookie'

export default async(req,res)=>{
    if(req.method==='GET'){
        const cookies=cookie.parse(req.headers.cookie ?? '')
        const refresh=cookies.refresh ?? ''

        if(refresh===false){
            return res.status(401).json({
                error:'リフレッシュトークンがない'
            })
        }

        const body=JSON.stringify({
            refresh,
        })

        try{
            const apiRes=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh/`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:body,
            })

            const data=await apiRes.json()

            if(apiRes.status===200){
                res.setHeader('Set-Cookie',[
                    cookie.serialize('access',data.access,{
                        httpOnly:false,
                        secure:true,
                        sameSite:'Lax',
                        path:'/',
                        maxAge:60*60, //1時間
                    })
                ])

                return res.status(200).json({
                    success:'リフレッシュトークン取得成功'
                })
            }else{
                return res.status(apiRes.status).json({
                    error:'リフレッシュトークン取得失敗'
                })
            }

        }catch(err){
            return res.status(500).json({
                error:'リフレッシュトークン取得失敗',
            })
        }

    }else{
        res.setHeader('Allow',['GET'])
        return res.status(405).json({
            error:`Method ${req.method} not allowed`
        })
    }
}