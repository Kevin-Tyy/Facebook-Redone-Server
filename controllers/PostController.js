const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');
const PostService = require('../services/PostService')
const createPostValidation = require('../validation/PostValidation')
class PostController {
    createPost = async (req, res) => {
        const {error } = createPostValidation.validate(req.body) 
        if(error){
            res.send({ msg : error.details[0].message , success : false});
        }else{
            try{
                const {userId} = req.body;
                const createdPost = await PostService.createPost(userId , req.body);
                res.send({ msg : 'Post created successfully' , post : createdPost})
            }catch(error){
                res.send({ msg : "Something went wrong" , success : false})
            }

        }
    }
    fetchPostsByCreatorId = async (req , res) => {
        const { userId } = req.params;
        try {
            const userPosts = await PostService.getPostsByUserId(userId);
            if(userPosts){
                res.send({ msg : 'Posts retrieved successfully' , data : userPosts})
            }
            else{
                res.send({ msg : "Couldn't retrieve posts"})
            }
        } catch (error) {
            
        }
    }
    fetchAllPosts = async (req , res) => {
        try {
            const posts = await PostService.getAllPosts()
            if(posts){
                res.send({ msg : "Posts retrieved successfully" , data : posts })
            }    
            else{
                res.send({ msg : "No posts retrieved" , data : posts })
            }
        } catch (error) {
            console.log(error)
           res.send({ msg : "Something went wrong"})
        }
    }
    deletePost = async (req, res) => {
        const {postId } = req.params
        const {userId } = req.body
        try {
            const deletedPost = await PostService.deletePost(userId, postId)
            {deletedPost ? 
                res.send({msg : "post deleted successfully" , success : true}) :
                res.send({ msg : "Couldn't delete post " , success : false })
            }
        } catch (error) {
            res.send({msg : "Somthing went wrong: " , success : false})
        }
    }
    addLike = async (req, res) => {
        const { postId , userId } = req.body;
        try {
            const likedPost = await PostService.addLike(postId, userId);
            {likedPost ? 
                res.send({ msg : 'like added successfully', success : true , data : likedPost}) :
                res.send({ msg : 'Like not added successfully', success : false})        
            }
        } catch (error) {
            res.send({ msg : "Something went wrong" , success : false})
        }
    }
    removeLike = async (req, res) => {
        const { postId , userId } = req.body;
        try{
            const likedPost = await PostService.removeLike(postId , userId);
            {likedPost ? 
                res.send({ msg : 'like removed successfully', success : true , data : likedPost}) :
                res.send({ msg : 'Like not removed successfully', success : false})        
            }
        }catch(error){
            res.send({ msg : "Something went wrong" , success : false})
        }
    }
 
}
module.exports = new PostController;