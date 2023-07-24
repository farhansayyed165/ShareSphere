import React, { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit';
import { getUserPosts, getPost } from '../../api/postApi';
import SmallPost from './SmallPost';


function ProfilePosts({  data }) {
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
  const renderPosts = posts.map(post => {
    let id = nanoid()
    return (
      <SmallPost key={id} data={post}></SmallPost>
    )
  })
  console.log(renderPosts)
  return (
    <>
      {renderPosts}
    </>
  )
}

export default ProfilePosts