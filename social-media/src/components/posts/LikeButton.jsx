import React, { useState } from 'react'
import { likePost } from '../../api/postApi'
import { useNavigate, Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function LikeButton({ login, postId, token, postData, setPostData }) {
  const navigate = useNavigate()
  const path = useLocation().pathname

  // console.log(postData.likes)
  function like() {
    if (login) {
      likePost(postId, token)
      .then(res => {
        setPostData(prev=>{
          return {
            ...prev,
            likes:res.likes
          }
        })
      })
    }
    else {
      return navigate("/login",{state:{
        message:"You must login first",
        redirectLink:path
      }})
      // <Navigate state={{ redirectLink: path }} to={"/login"} />
    }

  }

  return (
    <>
      <button onClick={like}>Like</button>
      <p>{postData.likes.length}</p>
    </>
  )
}

export default LikeButton