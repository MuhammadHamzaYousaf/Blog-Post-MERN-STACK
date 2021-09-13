import React, { useContext , useState , useEffect} from 'react'
import SideBar from '../../components/sidebar/SideBar';
import { Context } from '../../context/Context';
import './seeting.css';
import axios from 'axios';
const Seeting = () => {
    const {user} =useContext(Context);
    const[updateUser, setUpdateUser] = useState({username:user.username,email:user.email,password:user.password});
    const [success,setSuccess]=useState(false);
    const [file, setFile] = useState(null);
    const PF="http://localhost:5000/images/";
    
    const handleInput=(e)=>{
        const value=e.target.value;
        setUpdateUser({...updateUser,[e.target.name]:value});
    }
    
   

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const updateAccount={
            _id:user._id,
            ...updateUser
        };
        if(file){
            const data=new FormData();
            const filename= Date.now()+file.name;
            data.append("name",filename);
            data.append("file",file);
            updateAccount.profilePic=PF+filename;
            try {
                await axios.post('/upload',data);
            } catch (error) {
                
            }
        }

        try {
          const res=  await axios.put(`/users/${user._id}`,updateAccount);     
          setSuccess(true);
        } catch (error) {
            setSuccess(false);
        }
        
    }
    console.log(updateUser)
    return (
        <div className="seeting">
            <div className="seetingwrapper">
                <div className="seetingtitle">
                    <span className="seetingupdatetitle">Update Your Account</span>
                    <span className="seetingdeletetitle">Delete Your Account</span>
                </div>
                <form  className="seetingform" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="seetingPP">
                        <img src={ user.profilePic || "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png"} 
                        alt="" className="seetingimg"/>  
                        <label htmlFor="fileInput">
                            <i className="seetingicon far fa-user-circle" />
                        </label>
                        <input type="file" id="fileInput"  style={{display:"none"}}
                        onChange={(e)=>setFile(e.target.files[0])}
                        />
                    </div>  
                    <label>UserName</label> 
                    <input type="text"  value={updateUser.username} name="username" onChange={handleInput}/>
                    <label>Email</label> 
                    <input type="email" value={updateUser.email} name="email" onChange={handleInput}/>
                    <label>Password</label> 
                    <input type="password" placeholder="*****" name="password" onChange={handleInput}/>
                    <button className="seetingbtn" type="submit">Update</button>
                    {success ? 
                        (<span style={{color:"green",marginTop:"20px",textAlign:"center"}}>Update Account Successfully</span>):
                        ( <span style={{color:"red",marginTop:"20px",textAlign:"center"}}>Error Something</span> )
                    }
                </form>    
            </div>
            <SideBar/>
        </div>
    )
}

export default Seeting
