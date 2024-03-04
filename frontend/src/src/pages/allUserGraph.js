import AuthContext from "@/context/AuthContext"
import Link from "next/link"
import React,{useState,useEffect,useContext} from "react"

const allUserGraph=()=>{
    let [allUserGraph,setAllUserGraph] =useState([])
    let {authTokens,logoutUser}=useContext(AuthContext)
    const page_per_graph_num = 3;
    let [currentPage, setCurrentPage] = useState(1);
    let [totalPages, setTotalPages] = useState(1);

    useEffect(()=>{
        if(authTokens){
            getAllUserGraph()
        }
    },[authTokens,currentPage])

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    let getAllUserGraph=async()=>{
        // console.log(authTokens.access)
        let response=await fetch(`http://localhost:8000/app/getAllUserGraph/?page=${currentPage}&page_per_graph_num=${page_per_graph_num}`,{
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
                setTotalPages(data[0].total_pages)
                setAllUserGraph(data[1])
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
                // <div>
                //     <p>You are logged to all user graph page</p>
                //     <ul>
                //         {allUserGraph.map(graph=>(
                //             <li key={graph.id}>
                //                 {/* <img src='http://localhost:8000/media/graph_images/graph_22.png'></img> */}
                //                 <img src={'http://localhost:8000'+graph.image}></img>
                //             </li>
                //             // {graph.image}
                //         ))}
                //     </ul>
                // </div>
                
                <div>
                    <div className="card-container">
                        {/* カードの表示 */}
                        {allUserGraph.map((graph) => (
                            <div key={graph.id} className="card">
                                <p>{graph.user_name}</p>
                                <img src={'http://localhost:8000'+graph.image} alt="Graph" />
                            </div>
                        ))}
                    </div>

                    {/* ページネーションの表示 */}
                    <div className="pagination">
                        <span className="step-links">
                            {currentPage > 1 && <button className="button-yellow" onClick={handlePreviousPage}>previous</button>}
                            <span className="current">
                                Page {currentPage} of {totalPages}.
                            </span>
                            {currentPage < totalPages && <button className="button-yellow" onClick={handleNextPage}>next</button>}
                        </span>
                    </div>
                </div>
        //     }
        // </>
    )
}

export default allUserGraph