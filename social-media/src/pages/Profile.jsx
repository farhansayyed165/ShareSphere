import React, { useEffect, useState } from 'react';
import { getUser } from '../api/userApi';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const params = useParams()
    const [cookies,setCookies] = useCookies(['access-token','refresh-token'])
    const token = cookies['access-token']
    console.log(token)
    const [data, setData] = useState({fullname:"", username:"", followers:[], following:[],email:"", avatar:""})
    
    const u = params.username
    useEffect(()=>{
        getUser(token, u)
       .then(response=>{
           const {fullname, email, following, followers, username,avatar}= response
           setData({fullname, email, following,followers,username,avatar})
       })

    },[])

    return (
            <div>
                <img src={data.avatar} alt="" />
                <h1>Name: {data.fullname}</h1>
                <br />
                <h2> {data.username}</h2>
                <br />
                <h1>Following: {data.following}</h1>
                <br />
                <h1>Followers: {data.followers}</h1>
                <br />
                <h1>email: {data.email}</h1>
                <br />
            </div>
    );
}

export default Profile;
