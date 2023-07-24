export async function getUserPosts(id){
    const response = await fetch(`/api/posts/getUserPosts/${id}`)
    return response.json()
}

export async function submitPost(data, token) {
    const response = await fetch('/api/posts', {
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

export async function getPost(postId){
    try {
        const response = await fetch(
            `/api/posts/getPost/${postId}`)
    
        return response.json(); 
    } catch (err) {
        console.log(err);
    }
}

export async function SavePost(postId, token){
    const url = `/api/posts/save/${postId}`
    try {
        const response = await fetch(
            url,{
                method:"PUT",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
            })
        return response.json(); 
    } catch (err) {
        console.log(err);
    }
}


export async function getPosts(){
    try{const response = await fetch("/api/posts/getAll")
    return response.json()}
    catch(err){return new Error(err)}
}

export async function likePost(id,token){
    try{
        const response = await fetch(`/api/posts/likePost/${id}`,{
            method:"PUT",
            headers:{
                'content-type':'application/json',
                authorization:`Bearer ${token}`
            }
        })
        return response.json()
    }
    catch(err){
        console.log(err)
        return new Error(err)
    }
} 