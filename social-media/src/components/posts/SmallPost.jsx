import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Carousel from '../Carousel'
import LikeButton from './LikeButton'
import { CgComment } from 'react-icons/cg'
import { getUserById } from '../../api/userApi'
import { timeSince } from '../../utils/parseDate'

function SmallPost({ data, user, token, id }) {

  const [postUser, setPostUser] = useState()
  useEffect(() => {
    getUserById(data.userId).then((response) => {
      setPostUser(response)
    })
  }, [])

  const navigate = useNavigate()
  const [postData, setPostData] = useState(data)
  const content = data.content ? (data.content.length > 200 ? data.content.substring(0, 200) + "..." : data.content) : ""
  return (
    <div className='lg:w-[700px] md:w-[500px]  my-4 border-2 py-2 px-5 w-full z-40' id={id}>

      <div className=''>
        {postUser ? <Link to={`/${postUser.username}`}>
          <div className='profile flex items-center  mt-3 mb-2'>
            <img className='w-12 h-12 rounded-full object-cover mr-4 shadow' src={postUser.avatar} alt={`${postUser.fullname}'s profile image`} />
            <h1 className='text-lg font-semibold text-gray-900 -mt-1'>{postUser.fullname}</h1>
          </div>
        </Link> : <></>}
        <p className='text-gray-700 text-left mb-6 text-xs'>{timeSince(Date.parse(data.addedDate))} ago</p>
        <div onClick={() => { navigate(`/posts/${data._id}`) }} className='max-w-full mb-8'>

          <h1 className='max-w-md text-left my-2 font-semibold text-lg'>{data.title}</h1>
          <h5 className='text-gray-700 max-w-full text-left'>{content}</h5>
        </div>

        {
          data.images.length > 0 ? <Carousel items={data.images} id={id} /> : <></>
        }
        <div className='flex items-center justify-center '>

          <LikeButton token={token} login={user.login} postData={postData} setPostData={setPostData} postId={data._id} user={user}></LikeButton>

          <div className="flex items-center justify-center mx-10 my-4"><CgComment /><p className='mx-2'>{data.comments.length}</p></div>
        </div>
      </div>

    </div>
  )
}

export default SmallPost