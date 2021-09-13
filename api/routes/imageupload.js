const multer =require('multer');
const router = require('express').Router();

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
});

const upload= multer({storage:storage});

router.post('/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("File has been Uploaded");
})

module.exports = router;