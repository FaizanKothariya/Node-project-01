const postsService = require('../services/postsService');

exports.createPost = async (req, res) => {
  try {
    const { title, body, active, geoLocation } = req.body;
    const createdBy = req.user._id; // Assuming the user ID is stored in req.user after authentication
    const post = await postsService.createPost({ title, body, createdBy, active, geoLocation });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const posts = await postsService.getPostsByUser(createdBy);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const createdBy = req.user._id;
    const post = await postsService.getPostByIdAndUser(postId, createdBy);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const createdBy = req.user._id;
    const { title, body, active, geoLocation } = req.body;
    const updatedPost = await postsService.updatePost(postId, createdBy, { title, body, active, geoLocation });

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const createdBy = req.user._id;
    const deletedPost = await postsService.deletePost(postId, createdBy);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

exports.getPostsByLocation = async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
      const posts = await postsService.getPostsByLocation({ latitude, longitude });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve posts by location' });
    }
};

exports.getPostCounts = async (req, res) => {
    try {
      const postCounts = await postsService.getPostCounts();
      res.json(postCounts);
    } catch (error) {
      console.error('Error in getPostCounts:', error);
      res.status(500).json({ error: 'Failed to retrieve post counts' });
    }
};