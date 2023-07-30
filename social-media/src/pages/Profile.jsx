import React, { useEffect, useState } from 'react';
import { getUser } from '../api/userApi';
import { useCookies } from 'react-cookie';
import { useLoaderData } from 'react-router-dom';
import EditProfile from '../components/user/editProfile';
import { useSelector } from 'react-redux';
import FollowComponent from '../components/user/Follow';
import ProfilePosts from '../components/posts/ProfilePosts';
import { getUserPosts,getPost } from '../api/postApi';  

export async function loader({ params }) {
    try {const { username } = params
    const res = await getUser(username)
    return { user: res}}catch(err){
        console.log(err)
    }
}

const Profile = () => {
    const [cookies, setCookies] = useCookies(['access-token', 'refresh-token'])
    const token = cookies['access-token']
    const [data, setData] = useState(useLoaderData().user)
    const [edit, setEdit] = useState(false)
    const toFollowId = data._id;
 
    const user = useSelector((state) => {
        const value = state.user.user ? state.user.user : state.user
        return value
    })
    const editProfileComponent = (
        <>
            <EditProfile token={token} data={data} showEdit={edit} setOff={setEdit} />
            <button type='button' onClick={handleEdit} style={{ display: "block", marginBlock: "20px" }}>Edit profile</button>
        </>
    )

    const FollowComponentRender = user?.login ? <FollowComponent toFollowId={toFollowId} token={token} user={user} setData={setData} /> : <></>
    const renderEdit = (data.username == user?.username) ? editProfileComponent : FollowComponentRender
    function handleEdit(e) {
        setEdit(!edit)
    }


    return (
        <div>
            {renderEdit}

            <img src={data.avatar} alt="" />
            <h1>Name: {data.fullname}</h1>
            <br />
            <h2> {data.username}</h2>
            <br /> 
            <h1>Following: {data.following.length}</h1>
            <br />
            <h1>Followers: {data.followers.length}</h1>
            <br />
            <h1>email: {data.email}</h1>
            <br />
            <ProfilePosts  data={data} token={token} user={user}></ProfilePosts>
        </div>
    );
}

export default Profile;
