import React, { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit';
import { getUserPosts, getPost } from '../../api/postApi';


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
    let content = post.content.substring(0, 20);
    let id = nanoid()
    return (
      <div key={id}>
        <h1>{post.title}</h1>
        <h4>{content}</h4>
        <p>likes: {post.likes}</p>
        <img src={post.images[0]} alt="" style={{ maxWidth: "120px", maxHeight: "200px" }} />
      </div>
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