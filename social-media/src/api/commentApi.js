export async function createComment(data,token){
    try {
        const response = await fetch('http://localhost:5000/api/comments/createComment', {
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
    } catch (err) {
        console.log(err)
    }
}

export async function getComment(commentId){
    const response = await fetch(
        `http://localhost:5000/api/comments/${commentId}`)

    return response.json(); 
}