import React from 'react'
import './post.css';
import {Link} from 'react-router-dom';
const Post = ({post}) => {
    const PF="http://localhost:5000/images/";
    return (
        <div className="post">
            {post.photo && (
                <Link to={`/post/${post._id}`}>
                <img src={PF+post.photo} 
                className="postimg"
                alt="" />
                </Link>
            )}
            <div className="postinfo">
                <div className="postcategory">
                    {post.categories.map((c)=>(
                        <span className="postcat">{c.name}</span>
                    ))}
                </div>
                <Link className="link" to={`/post/${post._id}`} style={{marginTop:"20px"}}><span className="posttitle">{post.title}</span></Link>
                
                <hr />
                <span className="postdate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postdesc">{post.desc}</p>
        </div>
    )
}

export default Post
