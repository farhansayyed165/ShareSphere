import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import { getPost } from '../api/postApi';
import { useCookies } from 'react-cookie';
import { nanoid } from 'nanoid';
import CreateComment from '../components/comment/CreateComment';
import Comments from '../components/comment/Comments';
import Save from '../components/posts/Save';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LikeButton from '../components/posts/LikeButton';

export async function loader({ params }) {
    const { postId } = params;
    const response = await getPost(postId)
    // const { title, content, images, updatedAt, likes, comments } = response
    return response
}



const Post = () => {
    const postId = useParams().postId
    const data = useLoaderData()
    const [postData, setPostData] = useState({ ...data, render: 0 })
    // console.log(postData)

    const [cookies] = useCookies(['access-token'])
    const token = cookies['access-token']
    const user = useSelector((state) => {
        const value = state.user.user ? state.user.user : state.user
        return value
    })
    // console.log(user);
    const loginRequiredComponent = user.login ? <Save postId={postId} setPostData={setPostData} user={user} token={token} /> : ""

    let commentsComponent = postData.comments.map(comment => {
        const id = nanoid();
        return <Comments comment={comment} key={id} />

    });

    const path = useLocation().pathname

    const createCompoenent = user.login ? <CreateComment postId={postId} setPostData={setPostData} /> : <div>
        To comment, you need to either
        <Link to={"/login"} state={{ redirectLink: path }}> login </Link>
        or
        <Link to={"/signup"} state={{ redirectLink: path }}> create an account</Link>!
    </div>


    const postImages = postData.images.map((img) => {
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
                {/* <span>  likes:{}</span> */}
                <LikeButton login={user.login} postId={postData._id} token={token} postData={postData} setPostData={setPostData} user={user}></LikeButton>
                <br />
                {loginRequiredComponent}
            </div>
            <div>
                {createCompoenent}
                {commentsComponent}
            </div>
        </>
    );
}

export default Post;
