const StoryModel = require('../models/StoryModel')
const { v4 : uuidv4} = require('uuid')
const cloudUpload = require('../middleware/cloudUpload')
class StoryService {
    createStory = async (storyData) => {
        
        try {
            const storyId = uuidv4();
            const {userId , storyMedia } = storyData;
            const imagepUloadResponse = await cloudUpload(storyMedia)
            const createdStory = new StoryModel({
                creatorId : userId,
                storyMedia : imagepUloadResponse?.secure_url,
                storyId: storyId,
            });
            await createdStory.save();
            console.log(createdStory);
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