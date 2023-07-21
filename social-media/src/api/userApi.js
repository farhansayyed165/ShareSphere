export async function createUser(data) {
    const response = await fetch('http://localhost:5000/api/users/signup', {
        method: "POST", 
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", 
        headers: {
        "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(data), 
    });
    return response.json(); 

}

export async function loginUser(data) {
    const response = await fetch('http://localhost:5000/api/users/login', {
        method: "POST", 
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", 
        headers: {
        "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(data), 
    });
    return response.json(); 

}

export async function getUser( username){
    const response = await fetch(
        `http://localhost:5000/api/users/profile/${username}`)

    return response.json(); 
}
export async function updateUser(data, token){
    const response = await fetch('http://localhost:5000/api/users/update', {
        method: "PUT", 
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", 
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(data), 
    });
    return response.json(); 
}

export async function deleteUser(data, token){
    const response = await fetch('http://localhost:5000/api/users/delete', {
        method: "DELETE", 
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", 
        headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${token}`
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(data), 
    });
    return response.json(); 
};

export async function followHandler( toFollowId, token){
    const response = await fetch(`http://localhost:5000/api/users/follow/${toFollowId}`, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
    return response.json(); 
}


