import React, { useEffect, useState } from 'react';
import { followHandler, getUser, updateUser } from '../api/userApi';
import { useCookies } from 'react-cookie';
import { useLoaderData } from 'react-router-dom';
import EditProfile from '../components/user/editProfile';
import { useSelector, useDispatch } from 'react-redux';
import { Auth } from '../features/userSlice'; 

export async function loader({ params }) {
    const { username } = params
    const res = await getUser(username)
    return res
}

const Profile = () => {
    const dispatch = useDispatch()
    const [cookies, setCookies] = useCookies(['access-token', 'refresh-token'])
    const token = cookies['access-token']
    const [data, setData] = useState(useLoaderData())
    const [edit, setEdit] = useState(false)
    // const [renderEdit, setRenderEdit] = useState(<></>);
    const toFollowId = data._id;
    const user = useSelector((state) => {
        const value = state.user.user ? state.user.user : state.user
        // console.log(state)
        return value
    })

    const editProfileComponent = (
        <>
            <EditProfile token={token} data={data} showEdit={edit} setOff={setEdit} />
            <button type='button' onClick={handleEdit} style={{ display: "block", marginBlock: "20px" }}>Edit profile</button>
        </>
    )
    // console.log(user)
    const followingButton = <button type="button" onClick={handleFollow}>{user.following.includes(toFollowId) ? "Unfollow":"Follow"}</button>
    const renderEdit = (data.username == user?.username) ? editProfileComponent : followingButton
    function handleEdit(e) {
        setEdit(!edit)
    }
    
    
    function handleFollow(e){
        followHandler(toFollowId, token)
        .then(res => {
            let {followers, following} = res.updatedViewingUser;
            setData(prev=>{
                return {...prev,
                followers,
                following}
            });
            
            const {fullname, email, password, avatar, gender, username, _id} = res.updateUser
            const userFollowers = res.updateUser.followers
            const userFollowing= res.updateUser.following
            console.log(userFollowers,userFollowing)
            console.log(user)
            dispatch(Auth({
                fullname, 
                email, 
                password, 
                avatar, 
                username,
                _id,
                gender,
                followers:userFollowers,
                following:userFollowing, 
                login:true}))
        })

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
        </div>
    );
}

export default Profile;
