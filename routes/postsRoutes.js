const express = require('express');
const passport = require('passport');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), postsController.createPost);
router.get('/all', passport.authenticate('jwt', { session: false }), postsController.getPosts);
router.get('/:id', passport.authenticate('jwt', { session: false }), postsController.getPostById);
router.put('/:id', passport.authenticate('jwt', { session: false }), postsController.updatePost);
router.delete('/:id', passport.authenticate('jwt', { session: false }), postsController.deletePost);

// New endpoint to get posts by location
router.get('/byLocation', passport.authenticate('jwt', { session: false }), postsController.getPostsByLocation);

module.exports = router;