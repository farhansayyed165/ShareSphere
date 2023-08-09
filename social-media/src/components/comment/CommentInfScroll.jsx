import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getCommentsPaginated } from '../../api/commentApi'
import Comments from './Comments'

function CommentInfScroll({ data }) {
    const [comments, setComments] = useState()
    const [next, setNext] = useState(comments?.next)
    const [hasMore, setHasMore] = useState(comments?.next ? true : false)

    useEffect(() => {
        getCommentsPaginated(data._id)
            .then(res => {
                setComments(res.results)
            })
    }, [])

    function fetchMore() {
        getCommentsPaginated(data._id, next?.page)
            .then(res => {
                console.log(res)
                const results = res.results
                const next = res?.next
                setComments(prev => {
                    const newArray = prev.concat(results);
                    return newArray
                })
                setNext(next);
                setHasMore(next ? true : false)
            })
    }
    let commentsComponent = comments?.map((comment,id)=> {
        return <Comments comment={comment} key={id} />

    });
    return (
        <InfiniteScroll
            dataLength={comments?.length - 1}
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {commentsComponent}
        </InfiniteScroll>
    )
}

export default CommentInfScroll