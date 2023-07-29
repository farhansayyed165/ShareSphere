import React, { useState } from 'react'
import { getPosts } from '../api/postApi';
import { useLoaderData, useNavigate } from 'react-router-dom';
import SmallPost from '../components/posts/SmallPost';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux';

export function loader({ }) {
  return getPosts()
}

function Home() {
  const [cookies,setCookies] = useCookies(['access-token'])
  const token = cookies['access-token']
  const [posts, setPosts] = useState(useLoaderData().results)
  const [next, setNext] = useState(useLoaderData().next)
  const [hasMore, setHasMore] = useState(useLoaderData().next ? true : false)
  const navigate = useNavigate()
  const user = useSelector((state) => {
    const value = state.user.user ? state.user.user : state.user
    return value
})


  // const renderPosts = posts.map((post, index)=>{
  //   return <SmallPost data={post} key={index}/>
  // })
  function fetchMore() {
    getPosts(next?.page)
      .then(res => {
        const results = res.results
        const next = res?.next
        setPosts(prev => {
          const newArray = prev.concat(results);
          return newArray
        })
        setNext(next);
        setHasMore(next ? true : false)
      })
  }
  return (
    <div className='flex items-center justify-center text-center'>
      {/* <div className='w-full'>
        <h1 className=''>Home</h1>
        
      </div> */}
      <div className='max-w-xxl'>

      <InfiniteScroll
        dataLength={posts.length - 1}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {
          posts.map((post, index) => {
            if (!post) {
              console.log("no post")
            }
            return <SmallPost data={post} key={index} user={user}  token={token} id={`Small-Post-${index}`}/>
          })}
      </InfiniteScroll>
      </div>
    </div>
  )
}

export default Home