const Post = require("../model/postsModel")

async function paginateModel(req, res, next){
        const limit = parseInt(req.query.limit)
        const page = parseInt(req.query.page)
        const startIndex = (page-1) * limit
        const endIndex = page * limit
        const results = {}
        if(startIndex>0){
            results.previous = {
                page:page-1,
                limit: limit,
            }
        }
        if(endIndex < await Post.countDocuments()){
            results.next = {
                page:page+1,
                limit:limit
            }
        }
        try{

            results.results= await Post.find().limit(limit).skip(startIndex).sort({likes:-1, updatedAt:-1}).exec();
            res.paginatedResults = results
            next()
        }
        catch(e){
            res.status(500).json({message:e.message})
        }
}

module.exports = paginateModel