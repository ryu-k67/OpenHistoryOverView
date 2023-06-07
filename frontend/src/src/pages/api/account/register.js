// export default async(req,res)=>{
//     if(req.method==='POST'){
//         const {name,email,password}=req.body
//         //print(req.body)

//         const body=JSON.stringify({
//             "name":name,
//             "email":email,
//             "password":password,
//         })
//         const URL=`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/`
//         // const URL='htttp://0.0.0.0:8000/api/auth/register/'

//         try{
//             console.log('try')
//             console.log(process.env.NEXT_PUBLIC_API_URL)
            
//             const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/`, {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Accept': 'application/json',
//                 },
//                 body: body
//               })

//             const data=await apiRes.json()

//             if(apiRes.status===201){
//                 return res.status(200).json({
//                     success:'ユーザー登録成功',
//                 })
//             }else{
//                 return res.status(apiRes.status).json({
//                     error:'ユーザー登録失敗'
//                 })
//             }
//         }catch(err){
//             return res.status(500).json({
//                 error:`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/`//'ユーザー登録失敗500'
//             })
//         }

//     }else{
//         res.setHeader('Allow',['POST'])
//         return res.status(405).json({error:`Method ${req.method} not allowed`})
//     }
// }