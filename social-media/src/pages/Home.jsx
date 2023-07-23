import React from 'react'
import { getUser } from '../api/userApi';

// async function req(username){
//     const response = await fetch(
//         `http://localhost:5000/api/users/profile/${username}`)
//     return response.json(); 
// }

function Home() {
    function sendRequest(){
        getUser("farhan165")
        .then(res=>console.log(res))
    }
  return (
    <>
    <div>Home</div>
    <button onClick={sendRequest}>send request</button>
    </>
  )
}

export default Home