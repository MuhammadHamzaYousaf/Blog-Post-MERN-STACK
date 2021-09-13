import React, { useState } from 'react'
import './register.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
const Register = () => {
    const [user, setUser] = useState({username:"",email:"",password:""})
    const [err,setErr]=useState(false);

    const handleInput=(e)=>{
        const value=e.target.value;
        setUser({...user,[e.target.name]:value});
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setErr(false);
        try {
            const res= await axios.post('auth/register',{
               username:user.username,
                email:user.email,
                password:user.password
            });
            res.data && window.location.replace("/login");
        } catch (error) {
            setErr(true);
            console.log(error)
        }
    }
    return (
        <div className="register">
            <span className="registertitle">Register</span>
            <form className="registerform" onSubmit={handleSubmit}>
                <label>UserName</label>
                <input type="text" placeholder="Enter your Username....." name="username" onChange={handleInput}/>
                <label>Email</label>
                <input type="email" placeholder="Enter your Email ....." name="email" onChange={handleInput}/>
                <label>Password</label>
                <input type="password" placeholder="Enter Your Password ...." name="password" onChange={handleInput}/>
                <button className="registerbtn" >Register</button>
            </form>
            <button className="registerloginbtn" button="submit"><Link to="/login" className="link">Login</Link></button>
            {err &&
                <span style={{color:"red", marginTop:"20px"}}>Something is Worng Plz Check it!</span>
            }
            
        </div>
    )
}

export default Register
