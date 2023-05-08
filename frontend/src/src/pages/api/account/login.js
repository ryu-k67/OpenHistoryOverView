import cookie from 'cookie'

export default async(req,res)=>{
    if(req.method==='POST'){
        const {email,password}=req.body

        const body=JSON.stringify({
            email,
            password,
        })
        console.log(body)

        try{
            const apiRes=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`,{
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
                        secure:false, //trueにするとSSL/HTTPS通信の場合のみcookie送信する設定になる
                        sameSite:'Lax',
                        path:'/',
                        maxAge:60*60, //1時間
                    }),
                    cookie.serialize('refresh',data.refresh,{
                        httpOnly:false,
                        secure:false,
                        sameSite:'Lax',
                        path:'/',
                        maxAge:60*60*24, //1日
                    })
                ])


                return res.status(200).json({
                    success:data.access//'ログイン成功',
                })
            }else{
                return res.status(apiRes.status).json({
                    error:'ログイン失敗',
                })
            }

        }catch(err){
            return res.status(500).json({
                error:'ログイン失敗'
            })
        }
    }else{
        res.setHeader('Allow',['POST'])
        return res.status(405).json({error:`Method ${req.method} not alloed`})
    }
}