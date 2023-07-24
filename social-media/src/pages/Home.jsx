import React, {useState} from 'react'
import { getPosts } from '../api/postApi';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import SmallPost from '../components/posts/SmallPost';

export function loader({}){
  return getPosts()
}

function Home() {
  const [posts, setPosts] = useState(useLoaderData())
  const navigate = useNavigate()
    function sendRequest(){
      navigate("/submit")
    }
    const renderPosts = posts.map(post=>{
      const id = nanoid()
      return <SmallPost data={post} key={id}/>
    })
  return (
    <>
    <div>Home</div>
    <button onClick={sendRequest}>+</button>
    {renderPosts}
    </>
  )
}

export default Home