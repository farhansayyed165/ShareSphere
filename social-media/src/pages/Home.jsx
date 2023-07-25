import React, {useState} from 'react'
import { getPosts } from '../api/postApi';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import SmallPost from '../components/posts/SmallPost';
import InfiniteScroll from 'react-infinite-scroll-component';

export function loader({}){
  return getPosts()
}

function Home() {
  const [posts, setPosts] = useState(useLoaderData().results)
  const [next, setNext] = useState(useLoaderData().next)
  const [hasMore, setHasMore] = useState(useLoaderData().next ? true:false)
  const navigate = useNavigate()
    function sendRequest(){
      navigate("/submit")
    }

    // const renderPosts = posts.map((post, index)=>{
    //   return <SmallPost data={post} key={index}/>
    // })
  function fetchMore(){
    getPosts(next?.page)
    .then(res=>{
      // console.log(res)
      const results = res.results
      console.log("results",results)
      const next = res?.next
      setPosts(prev=>{
        const newArray = prev.concat(results);
        return newArray
        })
      setNext(next);
      setHasMore(next ? true: false)
    })
  }
  return (
    <>
    <div>Home</div>
    <button onClick={sendRequest}>+</button>
    <InfiniteScroll
    dataLength={posts.length-1}
    next={fetchMore}
    hasMore={hasMore}
    loader={<h4>Loading...</h4>}
    >
    {
    posts.map((post, index)=>{
      if(!post){
        console.log("no post")
      }
      return <SmallPost data={post} key={index}/>
    })}
    </InfiniteScroll>
    </>
  )
}

export default Home