import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../api/postApi';
import { useCookies } from 'react-cookie';
import { nanoid } from 'nanoid';
import CreateComment from '../components/comment/CreateComment';
import Comments from '../components/comment/Comments';
import Auth from '../components/Auth';



const Post = () => {
    const postId = useParams().postId
    // const postId = new ObjectId(id)
    const [postData ,setPostData]= useState({title:"", content:"", images:[], updatedAt:"", likes:[], comments:[]})

    const [cookies] = useCookies(['access-token'])
    const token = cookies['access-token']
    // console.log(token)
    const [refreshOnComments, setRefreshOnComments] = useState(0)
    useEffect(() => {
        getPost(postId, token)
        .then(res => {
            const {title, content, images, updatedAt, likes, comments} = res
            setPostData({title,content,images,updatedAt,likes,comments})
            
        })
        
    }, [refreshOnComments])
    let commentsComponent = postData.comments.map(comment=>{
        const id = nanoid();
        return <Comments comment={comment} key={id}/>

    });
    const postImages = postData.images.map((img)=>{
        const id = nanoid();
        return <img key={id} src={img} alt="post image" width={'400px'} height='600px' />
    })

    return (
        <>
        <div>
            <p>last updates: {postData.updatedAt}</p>
            <h2>{postData.title}</h2>
            <p>{postData.content}</p>
            {
                postImages
            }
            <span>  likes:{postData.likes.length}</span>

        </div>
        <div>
            
            <CreateComment postId={postId} refresh={setRefreshOnComments}></CreateComment>
            {commentsComponent}
        </div>
        </>
    );
}

export default Post;
