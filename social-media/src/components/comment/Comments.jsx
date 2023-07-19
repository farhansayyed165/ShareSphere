import React from 'react';
import { useEffect } from 'react';
import { getComment } from '../../api/commentApi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Comments = ({comment}) => {
    if(comment){
        const [commentData, setCommentData] = useState({content:"",updatedAt:"", user:"", username:"", likes:[]})
        useEffect(()=>{
            getComment(comment)
            .then(res=>{
                const {content, updatedAt, user, username, likes} = res.comment;
                setCommentData({content, updatedAt, user, username, likes})
            })
        },[])
        return (
            <div style={{border:"2px solid red", margin:"5px", padding:"10px"}}>
                <p>{commentData.updatedAt ? Date(commentData.updatedAt):""}</p>
                {commentData.username && <h4><Link to={`/profile/${commentData.username}`}>{commentData.user}</Link> </h4>}
                
                <p>{commentData.content}</p>
                <p>likes:{commentData.likes}</p>
            </div>
        );
    }else{
        return (
            <div>No comments on this post</div>
        )
    }
}

export default Comments;
