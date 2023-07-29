import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Carousel from '../Carousel'
import LikeButton from './LikeButton'
import {CgComment} from 'react-icons/cg'

function SmallPost({ data, user, token,id }) {
  console.log(data.comments.length)
  const navigate = useNavigate()
  const [postData, setPostData] = useState(data)
  const content = data.content ? (data.content.length > 200 ? data.content.substring(0,200) + "...": data.content):""
  return (
    <div className='max-w-20  my-4 border-2 py-2 px-5' id={id}>
      <div onClick={() => { navigate(`/posts/${data._id}`) }} className='max-w-20'>

        <h1 className='max-w-md text-left my-2 font-semibold  text-lg'>{data.title}</h1>
        <h5 className='text-gray-700 max-w-md text-left'>{content}</h5>
      </div>
      {
        data.images.length > 0 ? <Carousel items={data.images} id={id} /> : <></>
      }
      <div className='flex items-center justify-center '>

      <LikeButton token={token} login={user.login} postData={postData} setPostData={setPostData} postId={data._id} user={user}></LikeButton>

      <div className="flex items-center justify-center flex-col mx-3 my-4"><CgComment/><p>{data.comments.length}</p></div>
      </div>
    </div>
  )
}

export default SmallPost