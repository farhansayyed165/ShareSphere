import React, { useEffect, useState } from 'react';
import { getUser } from '../api/userApi';
import { useCookies } from 'react-cookie';
import { useLoaderData } from 'react-router-dom';

import { useSelector } from 'react-redux';
import FollowComponent from '../components/user/Follow';
import ProfilePosts from '../components/posts/ProfilePosts';
import { getUserPosts,getPost } from '../api/postApi';  
import ProfileComponent from '../components/user/ProfileComponent';

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

 
    const user = useSelector((state) => {
        const value = state.user.user ? state.user.user : state.user
        return value
    })


    return (
        <div>
            <ProfileComponent data={data} token={token} user={user} setData={setData}/>
            <br />
            <ProfilePosts  data={data} token={token} user={user} key={1}></ProfilePosts>
        </div>
    );
}

export default Profile;

{/* <img src={data.avatar} alt="" />
<h1>Name: {data.fullname}</h1>
<br />
<h2> {data.username}</h2>
<br /> 
<h1>Following: {data.following.length}</h1>
<br />
<h1>Followers: {data.followers.length}</h1>
<br />
<h1>email: {data.email}</h1> */}