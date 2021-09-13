import React,{useContext, useState} from 'react'
import './login.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';
import {LoginFailure, LoginStart, LoginSuccess} from '../../context/Actions';


const Login = () => {
    const [userdata, setUserData] = useState({username:"",password:""})
    const [err,setErr]=useState(false);
    const {dispatch} = useContext(Context);
    const handleInput=(e)=>{
        const value=e.target.value;
        setUserData({...userdata,[e.target.name]:value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setErr(false);
        dispatch(LoginStart());
        try {
            const res =await axios.post('auth/login',{
                username:userdata.username,
                password:userdata.password
            });
            dispatch(LoginSuccess(res.data));
        } catch (error) {
            setErr(true);
            dispatch(LoginFailure());
        }
    }
    
    
    
    return (
        <div className="login">
            <span className="logintitle">Login</span>
            <form className="loginform" onSubmit={handleSubmit}>
                <label>UserName</label>
                <input type="text" placeholder="Enter your username" name="username" onChange={handleInput}/>
                <label>Password</label>
                <input type="password" placeholder="Enter Your Password" name="password" onChange={handleInput}/>
                <button className="loginbtn">Login</button>
            </form>
             <button className="loginRegisterbtn" type="submit"><Link to="/register" className="link">Register</Link></button>
             {err&&
                <span style={{color:"red" , marginTop:"20px"}}>Invalid Credentials</span>
             }
        </div>
    )
}

export default Login
