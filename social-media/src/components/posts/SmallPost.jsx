import React from 'react'
import { useNavigate } from 'react-router-dom'

function SmallPost({data}) {
  const navigate = useNavigate()
  return (
    <div onClick={()=>{navigate(`/posts/${data._id}`)}} style={{cursor:"pointer"}}>
    <h1>{data.title}</h1>
    <h4>{data.content.substring(0, 20)}</h4>
    <p>likes: {data.likes.length}</p>
    <img src={data.images[0]} alt="" style={{ maxWidth: "120px", maxHeight: "200px" }} />
  </div>
  )
}

export default SmallPost