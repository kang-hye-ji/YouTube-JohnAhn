const express = require('express');
const router = express.Router();
const {Comment} = require('../models/Comment')


//=================================
//             Comment
//=================================

router.post('/saveComment', (req, res)=>{
    const comment = new Comment(req.body)
    comment.save((err,commentInfo)=>{
        if(err) return res.status(400).send(err);
        
        Comment.find({'_id':comment.writer})
            .populate('writer')
            .exec((err,result)=>{
                if(err) return res.status(400).send(err)
                return res.status(200).json({success:true, result})
            })
    })
})

router.post('/getComments', (req, res)=>{
    Comment.find({'postId':req.body.videoId})
        .populate('writer')
        .exec((err, comments)=>{
            if(err) return res.status(400).send(err);

            return res.status(200).json({success:true, comments})
        })
})

module.exports = router;
