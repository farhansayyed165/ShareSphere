import React, {useState} from 'react'
import { useParams, useLoaderData } from 'react-router-dom'
import { searchSubmit } from '../api/searchApi';
import InfiniteScroll from 'react-infinite-scroll-component';

export async function loader({params}){
  const {search} = params;
  const response = await searchSubmit(search,1)
  return response
}


function Search() {
  const [searchData, setSearchData] = useState(useLoaderData())
  const searchParams = useParams()
  console.log(searchParams, searchData)
  return (
    <div>Hello There</div>
  )
}

export default Search