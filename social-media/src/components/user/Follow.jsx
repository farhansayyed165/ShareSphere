import React from 'react'
import { Auth } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import { followHandler } from '../../api/userApi';

function FollowComponent({toFollowId, token, user, setData}) {
    const dispatch = useDispatch()
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
    // console.log(user)
  return (
    <button type="button" onClick={handleFollow}>{user.following.includes(toFollowId) ? "Unfollow":"Follow"}</button>
    // <button onClick={handleFollow}>Follow</button>
  )
}

export default FollowComponent