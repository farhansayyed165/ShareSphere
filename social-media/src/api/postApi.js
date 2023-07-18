// export async function createPost(data, token){
//     // console.log(token)
//     const response = await fetch('http://localhost:5000/api/posts/', {
//         method: "POST", 
//         mode: "cors",
//         cache: "no-cache",
//         credentials: "same-origin", 
//         headers: {
//         "Content-Type": "application/json",
//         'authorization':`Bearer ${token}`
//         },
//         redirect: "follow", 
//         referrerPolicy: "no-referrer", 
//         body: JSON.stringify(data), 
//     });

//     return response.json();

// }

export async function submitPost(data, token) {
    const response = await fetch('http://localhost:5000/api/posts', {
        method: "POST", 
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", 
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(data), 
    });
    return response.json(); 

}

export async function getPost(postId,token){
    try {
        const response = await fetch(
            `http://localhost:5000/api/posts/getPost/${postId}`,
            {headers:{
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,}}
            )
    
        return response.json(); 
    } catch (err) {
        console.log(err);
    }
}
