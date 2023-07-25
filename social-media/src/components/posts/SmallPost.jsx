import React from 'react'
import { useNavigate } from 'react-router-dom'

function SmallPost({data}) {
  const navigate = useNavigate()
  // const d = data
  // console.log(d.title )
  // const images = data.images
  // console.log(images)
  return (
    <div onClick={()=>{navigate(`/posts/${data._id}`)}} style={{cursor:"pointer"}}>
    <h1>{data.title}</h1>
    <h5 style={{color:"grey"}}>{data.content?.substring(0, 200)+"..."}</h5>
    <p>likes: {data.likes?.length}</p>
    <img src={data?.images ? data.images[0]:""} alt="" style={{ maxWidth: "120px", maxHeight: "200px" }} />
  </div>
  )
}

export default SmallPost