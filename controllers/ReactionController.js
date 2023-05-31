const ReactionService = require("../services/ReactionService");
const {commentValidation} = require('../validation/PostValidation')
class ReactionController {
	//add comment
	addCommentReaction = async (req, res) => {
        const {error} = commentValidation.validate(req.body)
        if(error){
            res.send({ msg : error.details[0].message , success : false });
        }
        else{
            try {
                const newComment = await ReactionService.addComment(req.body);
                {newComment ?
                    res.send({ msg : 'Comment added successfully' , success : true}): 
                    res.send({ msg : "Couldn't add comment" , success : false })    
                }      
            } catch (error) {
                res.send({ msg : 'Something went wrong' , success : false });
            }

        }
	};
	//delete comment
	removeCommentReaction = async (req, res) => {
		try {

		} catch (error) {
            res.send({ msg : 'Something went wrong' , success : false });
        }
	};
	//fetch comments
	getCommentsReaction = async (req, res) => {
		try {

		} catch (error) {
            res.send({ msg : 'Something went wrong' , success : false });
        }
	};
}
module.exports = new ReactionController;
