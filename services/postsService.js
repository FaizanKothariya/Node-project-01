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