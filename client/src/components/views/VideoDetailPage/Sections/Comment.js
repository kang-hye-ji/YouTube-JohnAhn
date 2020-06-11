import React, { useState } from 'react'
import Axios from 'axios'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {
    const [commentValue, setcommentValue] = useState("")
    const user = useSelector(state => state.user)
    const videoId = props.postId;

    const handleClick=(event)=>{
        setcommentValue(event.currentTarget.value)
    }
    const onSubmit=(event)=>{
        event.preventDefault();

        let variable={
            writer:user.userData._id,
            postId:videoId,
            content:commentValue
        }
        Axios.post('/api/comment/saveComment',variable)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data.result)
                    setcommentValue("")
                    props.refreshFunction(response.data.result)
                }else{
                    alert('댓글을 입력하는 데 실패했습니다.')
                }
            })
    }

    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>
            {/* Comment Lists */}
            {props.commentLists && 
                props.commentLists.map((comment,i)=>(
                    (!comment.responseTo &&
                        <React.Fragment>
                            <SingleComment refreshFunction={props.refreshFunction} postId={videoId} comment={comment}/>
                            <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} commentLists={props.commentLists} postId={videoId}/>
                        </React.Fragment>
                    )
                ))}

            {/* Root Comment Form */}
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요."
                />
                <br/>
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
