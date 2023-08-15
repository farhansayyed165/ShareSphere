import React, { useState, useRef, useEffect } from 'react'


function EditAvatar({data, avatar, setAvatar}) {
    const [avatarLink, setAvatarLink] = useState(data)
    const inputFeild = useRef(null)

    useEffect(()=>{
        if(avatar==avatarLink || !avatar ){
            return
        }
        console.log(typeof avatar)
        setAvatarLink(URL.createObjectURL(avatar))
    },[avatar])

    function handleAvatarModal(e){
        e.preventDefault()
        inputFeild.current.click()
    }
    function handleAvatarChange(e){
        e.preventDefault()
        setAvatar(e.target.files[0])
    }
    return (
        <>
        <div className='avatar cursor-pointer' onClick={handleAvatarModal}>
          <img src={avatarLink} className="w-16 h-16 rounded-full shadow-md object-cover" alt="" />
          <p className='absolute top-0 mt-7 text-white z-10 text-center avatar-text w-16'>Change</p>
        </div> 
        <input type="file" className='sr-only' onChange={handleAvatarChange} ref={inputFeild} />
        </>
    )
}

export default EditAvatar