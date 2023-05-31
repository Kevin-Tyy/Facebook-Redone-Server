const StoryModel = require('../models/StoryModel')
const { v4 : uuidv4} = require('uuid')
class StoryService {
    createStory = async (storyData) => {
        
        try {
            const storyId = uuidv4();
            const {userId , storyMedia } = storyData;
            const createdStory = new StoryModel({
                creatorId : userId,
                storyMedia : storyMedia,
                storyId: storyId,
            });
            await createdStory.save();
            return createdStory;
        } catch (error) {
         console.error(error);
         throw new Error('Failed to create story')   
        }
    }
    getStories = async () => {
        try{
            const stories = await StoryModel.find()
            return stories;
        }catch(error){
            console.log(error)
            throw new Error('Failed to get stories')
        }
    }
}
module.exports = new StoryService