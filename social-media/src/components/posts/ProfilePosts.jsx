import React, { useEffect } from 'react'
import { getUserPosts } from '../../api/postApi'

function ProfilePosts({user, }) {
  const aaaaa = ()=>{
    getUserPosts(user._id)
    .then(res=>console.log(res))
}
  return (  
    <button onClick={aaaaa}>Load</button>
  )
}

export default ProfilePosts