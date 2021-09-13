import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import './singlepost.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Context} from '../../context/Context';

const SinglePost = () => {
    const {user} =useContext(Context);
    const PF="http://localhost:5000/images/";
    const location=useLocation();
    const postid=location.pathname.split('/')[2];
    const [singlepost, setSinglePost] = useState({});
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [updateMode,setUpdateMode]=useState(false);
        
    const handleDelete=async ()=>{
        try {
            await axios.delete(`/posts/${postid}`,{
                data:{username:user.username}});
            window.location.replace("/");    
        } catch (error) {
            
        }
    }

    const handleupdate=async()=>{
        try {
            const res= await axios.put(`/posts/${postid}`,{
                username:user.username, 
                title, 
                desc
            })
            // window.location.reload();
            setUpdateMode(false);
        } catch (error) {
            
        }
    }
    
    
    useEffect(() => {
        const fetchSinglePost=async ()=>{
            const res = await axios.get(`/posts/${postid}`);
            setSinglePost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        fetchSinglePost();
    }, [])
    
    return (
        <div className="singlepost">
            <div className="singlepostwrapper">
                {singlepost.photo && (
                <img src={PF+singlepost.photo}
                alt="" 
                className="singlepostimg" />
                )}
                
                {updateMode ? (
                    <input type="text" value={title} className="singleposttitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/>
                ):(
                    <h1 className="singleposttitle">{title}
                    
                    {singlepost.username===user?.username &&
                        <div className="singlepostEdit">
                            <i className="singleposticon far fa-edit" onClick={()=>setUpdateMode(true)}/>  
                            <i className="singleposticon far fa-trash-alt" onClick={handleDelete}/>
                        </div>
                    }      
                    
                    
                </h1>
                )}
            <div className="singlepostinfo">
                <span className="singlepostauthor">Author: <b><Link to={`/?user=${singlepost.username}`} className="link">{singlepost.username}</Link></b></span>
                <span className="singlepostdate">{new Date(singlepost.createdAt).toDateString()}</span>
            </div>
            {updateMode ? (
                <textarea className="singlepostdescInput" value={desc} type="text" onChange={(e)=>setDesc(e.target.value)}/>
            ):(
                    <p className="singlepostdesc">{desc}</p>
            )
            }

            {updateMode &&
                <button className="postupdatebtn" onClick={handleupdate}>Update Post</button>
            }
            
            </div>
        </div>
    )
}

export default SinglePost
