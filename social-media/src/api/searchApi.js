export async function searchBoxRecommend(searchQuery){
    if(!searchQuery){
        throw new Error("No Search Query")
    }
    const response = await fetch(`/api/search/${searchQuery}`)
    return response.json()
}

export async function searchSubmit(searchQuery, p){
    
    if(!searchQuery){
        throw new Error("No Search Query")
    }
    const page = p ? p:1;
    const response = await fetch(`/api/searchSubmit/${searchQuery}?page=${page}&limit=5`)
    return response.json()
}