import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Carousel from '../Carousel'
import LikeButton from './LikeButton'
import { CgComment } from 'react-icons/cg'
import { timeSince } from '../../utils/parseDate'
import { GrMore } from "react-icons/gr"
import { ImCross } from 'react-icons/im'

function SmallPost({ data, user, token }) {
  const [showMore, setShowMore] = useState(false)
  const navigate = useNavigate()
  const [postData, setPostData] = useState(data)
  const content = data.content ? (data.content.length > 200 ? data.content.substring(0, 200) + "..." : data.content) : ""
  function more(e){
    e.preventDefault()
    setShowMore(!showMore)
  }
  return (
    <div className='lg:w-[700px] md:w-[500px]  my-4 border-2 rounded-md  py-2 px-5 w-full z-40 bg-white' >
        <div className={`absolute ${showMore ? "":" opacity-0 pointer-events-none"} lg:translate-x-[800%] z-[49] md:translate-x-[500%] md:right-[unset] mt-10 mr-3  right-0 border-2 transition-all p-2 duration-200 ease-in-out bg-gray-100 shadow-lg rounded`}>
          <ImCross className='w-full ml-auto cursor-pointer' onClick={()=>{setShowMore(false)}}></ImCross>
          <span>Report</span>
          <span></span>
          <span></span>
        </div>
      <div className='relative'>
        <button className=' w-20 absolute right-0 -mr-3 cursor-pointer' onClick={more}>
          <GrMore className='w-20 absolute right-0 -mr-3 cursor-pointer' size={22}  ></GrMore>
          </button>
        <Link to={`/${postData.user.username}`} className=' '>
          <div className='profile flex items-center  mt-3 mb-2 w-[80%]'>
            <img className='w-12 h-12 rounded-full object-cover mr-4 shadow' src={postData.user.avatar} alt={`${postData.user.fullname}'s profile image`} />
            <h1 className='text-lg font-semibold text-gray-900 -mt-1'>{postData.user.fullname}</h1>
          </div>
        </Link>
        <p className='text-gray-700 text-left mb-6 text-xs'>{timeSince(Date.parse(data.addedDate))} ago</p>
        <div onClick={() => { navigate(`/posts/${data._id}`) }} className='max-w-full mb-8'>

          <h5 className='text-gray-700 max-w-full text-left'>{content}</h5>
        </div>

        {
          data.images.length > 0 ? <Carousel items={data.images} /> : <></>
        }
        <div className='flex items-center justify-center '>

          <LikeButton token={token} login={user.login} postData={postData} setPostData={setPostData} postId={data._id} user={user}></LikeButton>

          <div className="flex items-center justify-center mx-10 my-4"><CgComment /><p className='mx-2'>{data.comments?.length}</p></div>
        </div>
      </div>

    </div>
  )
}

export default SmallPost