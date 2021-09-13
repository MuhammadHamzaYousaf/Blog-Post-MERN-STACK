import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import './write.css';
const Write = () => {
    
    const {user} =useContext(Context);
    const [post,setPost]=useState({title:"",desc:"",username:user.username});
    const [file,setFile]=useState(null);
    
    const handleInput=(e)=>{
        const value=e.target.value;
        setPost({...post,[e.target.name]:value});
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const newPost={
            ...post
        };
        if(file){
            const data=new FormData();
            const filename= Date.now()+file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.photo=filename;
            try {
                await axios.post('/upload',data);
            } catch (error) {
                
            }
        }

        try {
          const res=  await axios.post('/posts',newPost);     
          window.location.replace("/post/"+res.data._id)
        } catch (error) {
            
        }
        

    }
    console.log(post);
    return (
        <div className="write">
            {file &&
            <img src={URL.createObjectURL(file) }
            className="writeimg" alt="" />
            }
            
            <form className="writeform" onSubmit={handleSubmit}>
                <div className="writeformgroup">
                    <label htmlFor="fileInput">
                        <i className="writeicon fas fa-plus" />
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                    <input type="text" placeholder="Title" className="writeinput" autoFocus={true} name="title" onChange={handleInput}/>
                </div>

                <div className="writeformgroup">
                    <textarea placeholder="Tell Your Story" 
                    type="text" 
                    className="writeinput writetext"
                    name="desc"
                    onChange={handleInput}
                    />
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}

export default Write
