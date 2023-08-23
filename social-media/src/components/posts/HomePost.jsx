import React, { useState, useEffect } from 'react'
import EditPost from '../../pages/EditPost'
import SmallPost from './SmallPost'
import { useNavigate } from 'react-router-dom'

function HomePost({ post, user, token }) {
  const [showEdit, setShowEdit] = useState(false)
  const [postData, setPostData] = useState(post)
  // const [data, setData] = useState()
  function closeEditPost() {
    setShowEdit(false)
    console.log(window.location.scrollTop)
    // window.location.reload()
  }

  function showEditPost(e) {
    e.preventDefault()
    setShowEdit(true)
  }

  return (
    <>
      {showEdit && <div className='absolute top-0 left-0'><EditPost data={post} close={closeEditPost} showEditPost={showEditPost} showEdit={showEdit}></EditPost></div>}
      <SmallPost data={postData} user={user} token={token} setShowEdit={setShowEdit} showEditPost={showEditPost} />
    </>
  )
}

export default HomePost