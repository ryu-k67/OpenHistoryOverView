import AuthContext from "@/context/AuthContext"
import Link from "next/link"
import React,{useState,useEffect,useContext} from "react"

const allUserGraph=()=>{
    let [allUserGraph,setAllUserGraph] =useState([])
    let {authTokens,logoutUser}=useContext(AuthContext)

    useEffect(()=>{
        if(authTokens){
            getAllUserGraph()
        }
    },[authTokens])

    let getAllUserGraph=async()=>{
        // console.log(authTokens.access)
        let response=await fetch('http://localhost:8000/app/getAllUserGraph/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+authTokens.access,
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Headers':'access-control-allow-origin'
            }
        })
        .then(async(res)=>{
            console.log('res:',res)
            let data=await res.json()
            console.log('data:',data)
            // console.log(jwt_decode(data.access))
            if(res.status===200){
                setAllUserGraph(data)
                console.log('allUserGraph:',allUserGraph)

                // let imageUrl='http://localhost:8000'+data[0].image
                // console.log('imageUrl:',imageUrl)
                // const imgElement = document.createElement('img');
                // imgElement.src = imageUrl;
                // document.body.appendChild(imgElement);
            }
            else if(res.statusText==='Unauthorized'){
                logoutUser()
            }
            else{
                console.log('status error')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    // let {user}=useContext(AuthContext)
    return (
        // <> 
        //     {!user?
        //         <Link href="/login" />
        //         :
                <div>
                    <p>You are logged to all user graph page</p>
                    <ul>
                        {allUserGraph.map(graph=>(
                            <li key={graph.id}>
                                {/* <img src='http://localhost:8000/media/graph_images/graph_22.png'></img> */}
                                <img src={'http://localhost:8000'+graph.image}></img>
                            </li>
                            // {graph.image}
                        ))}
                    </ul>
                </div>
        //     }
        // </>
    )
}

export default allUserGraph