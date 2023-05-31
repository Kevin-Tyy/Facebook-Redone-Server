const CommentModel = require('../models/CommentModel')
class ReactionService {
    addComment = async (data) => {
        try {
            
            const { postId , userId , content } = data;
            const comment = await new CommentModel({postId : postId, userId : userId, content : content});
            await comment.save();
            return comment;
        } catch (error) {
            console.info(error.message);
            throw new Error('Failed to save comment')   
        }
    }   
    removeComment = async () => {

    }
    getPostComments = async () => {

    }
}
module.exports = new ReactionService