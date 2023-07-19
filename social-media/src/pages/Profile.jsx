import React, { useEffect, useState } from 'react';
import { getUser } from '../api/userApi';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom'; 
import EditProfile from '../components/user/editProfile';

const Profile = () => {
    const params = useParams()
    const [cookies,setCookies] = useCookies(['access-token','refresh-token'])
    const token = cookies['access-token']
    // console.log(token)
    const [data, setData] = useState({fullname:"", username:"", followers:[], following:[],email:"", avatar:""})
    const [edit, setEdit] = useState(false)
    
    const u = params.username
    useEffect(()=>{
        getUser(token, u)
       .then(response=>{
           const {fullname, email, following, followers, username,avatar}= response
           setData({fullname, email, following,followers,username,avatar})
       })

    },[])

    function handleEdit(e){
        e.preventDefault();
        setEdit(!edit)
    }

    return (
            <div>
                <EditProfile token={token} data={data} showEdit={edit} setOff={setEdit}/>
                <button type='button' onClick={handleEdit} style={{display:"block", marginBlock:"20px"}}>Edit profile</button>
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
            </div>
    );
}

export default Profile;
