import React, { useState, useRef } from 'react'
import EditPost from '../../pages/EditPost'
import SmallPost from './SmallPost'

function HomePost({post,user,token}) {
  const editPostBgRef = useRef()
    const [showEdit, setShowEdit] = useState(false)
    function closeEditPost(){
        setShowEdit(false)
      }
    function showEditPost(e){
      e.preventDefault()
      setShowEdit(true)
      console.log(editPostBgRef)
      editPostBgRef.current.scrollIntoView({behavior:"smooth"})
    }
    
  return (
    <>
    {showEdit && <div className='absolute top-0 left-0'><EditPost data={post} close={closeEditPost} showEditPost={showEditPost} showEdit={showEdit}></EditPost></div> }
    <SmallPost data={post} user={user} token={token} setShowEdit={setShowEdit} showEditPost={showEditPost}/>
    </>
  )
}

export default HomePost