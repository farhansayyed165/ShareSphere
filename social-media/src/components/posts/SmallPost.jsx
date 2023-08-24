import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Carousel from '../Carousel'
import LikeButton from './LikeButton'
import { CgComment } from 'react-icons/cg'
import { timeSince } from '../../utils/parseDate'
import { GrMore } from "react-icons/gr"
import { ImCross } from 'react-icons/im'
import Save from './Save'

function SmallPost({ data, user, token }) {
  const [showMore, setShowMore] = useState(false)
  const navigate = useNavigate()
  const [postData, setPostData] = useState(data)
  const content = data?.content ? (data.content.length > 200 ? data.content.substring(0, 200) + "..." : data.content) : ""
  function more(e) {
    e.preventDefault()
    setShowMore(!showMore)
  }
  function closeMore(e){
    e.preventDefault()
    setShowMore(false)
  }
  function navigateToEditPost(){
    navigate(`/edit/${data._id}`)
  }


  return (
    <div className='lg:w-[700px] md:w-[500px]  my-4 border-2 rounded-md  py-2 px-5 w-full z-40 bg-white' >
      <div className={`${showMore ? "" : " opacity-0 pointer-events-none"} fixed top-0 left-0 w-full h-full z-50`} onClick={closeMore}>
      </div>
      <div className={`absolute ${showMore ? "" : " opacity-0 pointer-events-none"} text-left w-[120px] lg:translate-x-[450%] z-[51] md:translate-x-[300%] md:right-[unset] mt-10 mr-3  right-0 border-2 transition-all p-2 duration-200 ease-in-out bg-gray-100 shadow-lg rounded`}>
        <div className='w-full ml-auto flex flex-row-reverse mb-2 ' >
          <ImCross className='' onClick={closeMore}></ImCross>
        </div>
        <div style={{li:{margin:0, padding:0}}}> 
        
        <p className='cursor-pointer  py-2 pt-3'>Report</p>
          
          {user.login &&
            <span className='cursor-pointer  py-2 flex items-center'>
              <p className='mr-1'>Save</p>
              <Save user={user} token={token} setPostData={setPostData} postId={postData?._id}></Save>
            </span>
          }
        {(postData?.user.username == user?.username) && 
        <>
      
          <p className='cursor-pointer  py-2' onClick={navigateToEditPost}>Edit Post</p>
        
      
          <p className='text-red-500 cursor-pointer font-semibold py-2'>Delete post</p>
        
        </>
          }
        </div>
      </div>
      <div className='relative'>
        <button className=' w-20 absolute right-0 -mr-3 cursor-pointer' onClick={more}>
          <GrMore className='w-20 absolute right-0 -mr-3 cursor-pointer' size={22}  ></GrMore>
        </button>
        <Link to={`/${postData?.user.username}`} className=' '>
          <div className='profile flex items-center  mt-3 mb-2 w-[80%]'>
            <img className='w-12 h-12 rounded-full object-cover mr-4 shadow' src={postData?.user.avatar} alt={`${postData?.user.fullname}'s profile image`} />
            <h1 className='text-lg font-semibold text-gray-900 -mt-1'>{postData?.user.fullname}</h1>
          </div>
        </Link>
        <p className='text-gray-700 text-left mb-6 text-xs'>{timeSince(Date.parse(data?.addedDate))} ago</p>
        <div onClick={() => { navigate(`/posts/${data?._id}`) }} className='max-w-full mb-8 cursor-pointer'>

          <p className='text-gray-700 max-w-full text-left text-h3Clamp'>{content}</p>
        </div>

        {
          data?.images.length > 0 ? <Carousel items={data?.images} /> : <></>
        }
        <div className='flex items-center justify-center '>

          <LikeButton token={token} login={user.login} postData={postData} setPostData={setPostData} postId={data?._id} user={user}></LikeButton>

          <div className="flex items-center justify-center mx-10 my-4"><CgComment /><p className='mx-2'>{data?.comments?.length}</p></div>
        </div>
      </div>

    </div>
  )
}

export default SmallPost