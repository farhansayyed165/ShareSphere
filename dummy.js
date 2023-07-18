console.log("Hello World");

async function getUser( token){
    const response = await fetch('http://localhost:5000/api/users/profile', {
        headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${token}`
        }
    });
    return response.json(); 
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YWQ3NjdhNDI5ZWQzMWFjMTQwNDVlMCIsImZ1bGxuYW1lIjoiZGFtbiIsInVzZXJuYW1lIjoiZ2lybGRkZHMiLCJlbWFpbCI6ImRhbW5zZG5kbkBnZGlybC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRDNXdYZlRBOEFQUVBza3g3SzdYNGIuRmRiY3FvOXNBUmpubVVJNERwbkJiSmJCVG9uS21peSIsImF2YXRhciI6Imh0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMTUvMTAvMDUvMjIvMzcvYmxhbmstcHJvZmlsZS1waWN0dXJlLTk3MzQ2MF9fMzQwLnBuZyIsImdlbmRlciI6Im1hbGUiLCJtb2JpbGUiOm51bGwsInNhdmVkIjpbXSwiZm9sbG93ZXJzIjpbXSwiZm9sbG93aW5nIjpbXSwiY3JlYXRlZEF0IjoiMjAyMy0wNy0xMVQxNTozNDoxOC4yMzBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0xMVQxNTozNDoxOC4yMzBaIiwiX192IjowfSwiaWF0IjoxNjg5MDkzNjIzLCJleHAiOjE2ODk5NTc2MjN9.aqRc5biPLd85mvtXV-dD0mg2sDAPDkpwbObvdVc69r8'

getUser(token)
.then(res=>{console.log(res)})