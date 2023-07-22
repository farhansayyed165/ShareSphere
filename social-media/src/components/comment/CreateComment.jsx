import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { createComment } from '../../api/commentApi';
import { useLocation } from 'react-router-dom';

const CreateComment = ({ postId, setPostData }) => {
    const path = useLocation().pathname
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

                    setCommentData(prev=>({...prev,content:""}))
                    setPostData(prev =>{
                        return {
                            ...prev,
                            render:!prev.render
                        }
                     })
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
    
    

export default CreateComment;

