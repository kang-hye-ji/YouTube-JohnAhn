import React, {useState} from 'react'
import {Comment, Avatar, Button, Input} from 'antd';
import Axios from 'axios';
import {useSelector} from 'react-redux'

function SingleComment(props) {
    const user = useSelector(state => state.user)
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onClickReplyOpen=()=>{
        setOpenReply(!OpenReply)
    }
    const actions=[
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]
    const onHandleChange=(e)=>{
        setCommentValue(e.currentTarget.value)
    }
    const onSubmit=(e)=>{
        e.preventDefault();

        const variables={
            writer:user.userData._id,
            postId:props.postId,
            content:CommentValue,
            responseTo:props.comment._id
        }
        Axios.post('/api/comment/saveComment',variables)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data.result)
                    setCommentValue("")
                    props.refreshFunction(response.data.result)
                }else{
                    alert('댓글을 입력하는 데 실패했습니다.')
                }
            })
    }

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt/>}
                content={<p>{props.comment.content}</p>}
            />
            {OpenReply && 
                <form style={{display:'flex'}} onSubmit={onSubmit}>
                    <textarea
                        style={{width:'100%', borderRadius:'5px'}}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성해 주세요."
                    />
                    <br/>
                    <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment