import React, { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit';
import { getUserPosts, getPost } from '../../api/postApi';
import SmallPost from './SmallPost';

function ProfilePosts({  data, user, token }) {

  const [posts, setPosts] = useState([])
  useEffect(()=>{
    getUserPosts(data._id)
    .then(postsArray=>{
      postsArray.forEach(postId => {
      getPost(postId)
        .then(post => {
          setPosts(prev=>{
              if(prev.length < data.posts.length){
                  // console.log(prev.length, " prev lenght")
                  return [...prev, post]
              }  
              else{
                  return prev
              }
          })
        })
    })})
  },[])
  const renderPosts = posts.map((post, i) => {
    return (
      <div className='max-w-xl' key={i}>
        <SmallPost  data={post} id={i} token={token} user={user}></SmallPost>
      </div>
    )
  })
  return (
    <div className=' grid-cols-3 max-w-1/2 m-auto'>
      {renderPosts}
    </div>
  )
}

export default ProfilePosts