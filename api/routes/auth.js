const router= require('express').Router();
const User =require('../models/User');
const bcrypt = require('bcrypt');


// Register User 

router.post('/register',async (req,res)=>{
    try {
        const salt=await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
        });
        const createUser= await newUser.save();
        res.status(201).json(createUser);
    } catch (error) {
        res.status(500).json(error);
    }
})


//Login User

router.post('/login',async (req,res)=>{
    try {
        const user=await User.findOne({username:req.body.username});
    if(user){
        const validate =await bcrypt.compare(req.body.password,user.password);
        if(validate){
            const {password,...others}=user._doc;
            res.status(200).json(others);
        }
        else{
            res.status(403).json("Invalid Credentials");
        }     
    }else{
        res.status(403).json("Invalid Credentials");
    }
    } catch (error) {
        res.status(500).json(error);   
    }
})


module.exports =router;