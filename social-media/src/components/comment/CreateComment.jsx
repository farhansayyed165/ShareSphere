import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { createComment } from '../../api/commentApi';
import { Link,useLocation } from 'react-router-dom';

const CreateComment = ({ postId, refresh }) => {
    const path = useLocation().pathname
    const user = useSelector((state)=>state.user.user)
    if(user.login){
        const [cookies] = useCookies(['access-token'])
        const token = cookies['access-token']
        const [commentData, setCommentData] = useState({ content: "", postId: postId });
    
        const handleChange = (e)=>{
            const { name, value } = e.target;
            setCommentData(prev => 
                 ({
                    ...prev,
                    [name]: value
                })
            )
        }
    
        const handleSubmit = (e) => {
            e.preventDefault();
            createComment(commentData, token)
                .then(res => {
                    alert(res.message)
                    refresh(prev=>{return !prev})
                    setCommentData(prev=>({...prev,content:""}))
                })
    
        }
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="content"
                        id="create-comment-textarea"
                        cols="30" rows="15"
                        placeholder='comments'
                        onChange={handleChange}
                        value={commentData.content}
                    ></textarea>
                    <br />
    
                    <button type='submit'>Submit</button>
                </form>
            </>
    
        );
    }
    else{
        return (<>
        <div>
            To comment, you need to either 
            <Link to={"/login"} state={{redirectLink:path}}>login</Link>
             or 
             <Link to={"/signup"} state={{redirectLink:path}}>create an account</Link>!</div>
        </>)
    }
    }

export default CreateComment;

