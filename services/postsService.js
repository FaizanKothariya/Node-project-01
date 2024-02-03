const Post = require('../models/post');

exports.createPost = async ({ title, body, createdBy, active, geoLocation }) => {
  return await Post.create({ title, body, createdBy, active, geoLocation });
};

exports.getPostsByUser = async (userId) => {
  return await Post.find({ createdBy: userId });
};

exports.getPostByIdAndUser = async (postId, userId) => {
  return await Post.findOne({ _id: postId, createdBy: userId });
};

exports.updatePost = async (postId, userId, { title, body, active, geoLocation }) => {
  return await Post.findOneAndUpdate(
    { _id: postId, createdBy: userId },
    { title, body, active, geoLocation },
    { new: true }
  );
};

exports.deletePost = async (postId, userId) => {
  return await Post.findOneAndDelete({ _id: postId, createdBy: userId });
};

exports.getPostsByLocation = async ({ latitude, longitude }) => {
  
    const radiusInKilometers = 10; // Example: Search within 10 kilometers
  
    try {
      const posts = await Post.find({
        geoLocation: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: radiusInKilometers * 1000, // Convert to meters
          },
        },
      });

      return posts;
    } catch (error) {
      throw error;
    }
  };

  exports.getPostCounts = async () => {
    try {
      const activeCount = await Post.countDocuments({ active: true });
      const inactiveCount = await Post.countDocuments({ active: false });
  
      return { active: activeCount, inactive: inactiveCount };
    } catch (error) {
      console.error('Error in getPostCounts:', error);
      throw error;
    }
  };