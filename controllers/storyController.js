const StoryService = require('../services/StoryService')
const { storyValidation } = require('../validation/PostValidation')
class StoryController {
    createStory = async (req, res) => {
        const {error } = storyValidation.validate(req.body) 
        if(error){
            res.send({ msg : error.details[0].message , success : false});
        }else{
            try{
                const createdStory = await StoryService.createStory(req.body);
                {createdStory ? 
                    res.send({ msg : 'Post created successfully' , post : createdStory}): 
                    res.send({ msg : 'Story not added'});
                }
            }catch(error){
                res.send({ msg : "Something went wrong" , success : false})
            }

        }
    }
    getStories = async (req, res) => {
        try{

        }catch(error){

        }
    }
}
module.exports = new StoryController;