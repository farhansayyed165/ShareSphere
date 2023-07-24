import React, {useState} from 'react'
import { getPosts } from '../api/postApi';
import { useLoaderData } from 'react-router-dom';
import { nanoid } from 'nanoid';
import SmallPost from '../components/posts/SmallPost';

export function loader({}){
  return getPosts()
}

function Home() {
  const [posts, setPosts] = useState(useLoaderData())
    function sendRequest(){
        getPosts()
        .then(res=>console.log(res))
    }
    const renderPosts = posts.map(post=>{
      const id = nanoid()
      return <SmallPost data={post} key={id}/>
    })
  return (
    <>
    <div>Home</div>
    <button onClick={sendRequest}>send request</button>
    {renderPosts}
    </>
  )
}

export default Home