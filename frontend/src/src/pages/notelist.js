import AuthContext from "@/context/AuthContext"
import Link from "next/link"
import React,{useState,useEffect,useContext} from "react"

const NoteList=()=>{
    let [notes,setNotes] =useState([])
    let {authTokens,logoutUser}=useContext(AuthContext)

    useEffect(()=>{
        if(authTokens){
            getNotes()
        }
    },[authTokens])

    let getNotes=async()=>{
        // console.log(authTokens.access)
        let response=await fetch(`${backendUrl}app/notes/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+authTokens.access,
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Headers':'access-control-allow-origin'
            }
        })
        .then(async(res)=>{
            let data=await res.json()
            // console.log('data:',data)
            // console.log(jwt_decode(data.access))
            if(res.status===200){
                setNotes(data)
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
                    <p>You are logged to the note list page</p>
                    <ul>
                        {notes.map(note=>(
                            <li key={note.id}>{note.body}</li>
                        ))}
                    </ul>
                </div>
        //     }
        // </>
    )
}

export default NoteList