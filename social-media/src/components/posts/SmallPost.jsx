import React from 'react'
import { useNavigate } from 'react-router-dom'
import Carousel from '../Carousel'

import LikeButton from './LikeButton'
import { useState } from 'react'

function SmallPost({ data, user, token }) {
  const navigate = useNavigate()
  const [postData, setPostData] = useState(data)

  const content = data.content ? (data.content.length > 200 ? data.content.substring(0,200) + "...": data.content):""
  return (
    <div className='max-w-20'>
      <div onClick={() => { navigate(`/posts/${data._id}`) }} >

        <h1>{data.title}</h1>
        <h5 className='text-gray-700'>{content}</h5>
        <p>likes: {data.likes?.length}</p>
      </div>
      {
        data.images.length > 0 ? <Carousel items={data.images} /> : <></>
      }
      <LikeButton token={token} login={user.login} postData={postData} setPostData={setPostData} postId={data._id}></LikeButton>
    </div>
  )
}

export default SmallPost