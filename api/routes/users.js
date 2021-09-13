const router=require('express').Router();
const User = require('../models/User');
const Post=require('../models/Post');
const bcrypt =require('bcrypt');

// Update User Account    

router.put('/:_id',async (req,res)=>{
    if(req.body._id === req.params._id){
        try {
            if(req.body.password){
                const salt= await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);
            }
            const updateUser=await User.findByIdAndUpdate(req.params._id,{
                $set:req.body,
            },{new:true});
            res.status(200).json(updateUser);

        } catch (error) {
            res.status(500).json(error);
        }        
    }
    else{
        res.status(403).json("You can Update Only Your Account");
    }
});

// Delete User Account 

router.delete('/:_id',async (req,res)=>{
    if(req.body._id===req.params._id){
        try {
            const user=await User.findById(req.params._id);
             try {
                    await Post.deleteMany({username:user.username});
                    await User.findByIdAndDelete(req.params._id);
                    res.status(200).json("Successfully Deleted Account");
                } catch (error) {
                    res.status(500).json(error);
                }    
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json("Only Delete for Your Account");
    }
});


// Get User 

router.get('/:_id',async (req,res)=>{
    try {
        const user=await User.findById(req.params._id);
        const {password,...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports=router;