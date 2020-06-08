const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer : {
        type:Schema.Types.ObjectId,   // 쓰는 사람의 아이디를 넣도록 함 / User를 ref(참조)하여 user의 모든 정보를 끌고 옴
        ref:'User'
    },
    title : {
        type:String,
        maxlength:50
    },
    description:{
        type:String
    },
    privacy:{
        type:Number
    },
    filePath:{
        type:String
    },
    category:{
        type:String
    },
    views:{
        type:Number,
        default:0
    },
    duration:{
        type:String
    },
    thumbnail:{
        type:String
    }
}, {timestamps:true})   //만든 date와 update한 date가 저장됨.

const Video = mongoose.model('Video',videoSchema)

module.exports = { Video }