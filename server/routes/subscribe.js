const express = require('express');
const router = express.Router();


//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res)=>{     //client > server_index.js로 가서  /api/video를 읽은 후 현재창으로 오기 때문에 굳이 post('/api/video/up...')로 쓰지 않아도 된다.
    //비디오를 서버에 저장한다.
    upload (req,res,err =>{
        if(err){
            return res.json({success:false, err})
        }
        return res.json({success:true, url:res.req.file.path, fileName:res.req.file.filename})
    })
}) 

module.exports = router;
