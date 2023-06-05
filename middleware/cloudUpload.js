export const cloudUpload = async (mediaStr) => {
    imagepUloadResponse = await cloudinary.v2.uploader.upload(previewSource, {
        folder: "user_posts",
    });
}