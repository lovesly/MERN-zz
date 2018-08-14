const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePostInput = require('../../validation/post');

router.get('/test', (req, res) => res.json({ msg: "Posts works" }));

// @route GET api/posts
// @desc Get posts
// @access Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ err }));
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ err }));
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,   
        user: req.user.id,
    });

    newPost.save().then(post => res.json(post));
});

// @route DELETE api/posts/:id
// @desc Delete post by id
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    // we can use user model to do thist right? 
    // why do we need Profile model????
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                // so right now, if the user cancel his account, nobody would be able to 
                // remove his posts.
                errors.noprofile = 'User profile not found';
                return res.status(404).json(errors);
            } else {
                Post.findById(req.params.id)
                    .then(post => {
                        if (post.user.toString() !== req.user.id) {
                            errors.post = 'User not authorized';
                            return res.status(401).json(errors);
                        } else {
                            post.remove().then((() => res.json({ success: true })));
                        }
                    })
                    .catch(err => res.status(404).json({ err }));
            }
        });
});


// @route POST  api/posts/like/:id
// @desc Like post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    // we can use user model to do thist right? 
    // why do we need Profile model????
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                // so right now, if the user cancel his account, nobody would be able to 
                // remove his posts.
                errors.noprofile = 'User profile not found';
                return res.status(404).json(errors);
            } else {
                // if already liked, return
                Post.findById(req.params.id)
                    .then(post => {
                        if (post.likes.find(el => el.user.toString() === req.user.id)) {
                            // already liked
                            errors.alreadyliked = 'Already liked this post'
                            return res.status(400).json({ errors });
                        }
                        post.likes.push({
                            user: req.user.id
                        });
                        post.save().then(() => res.json({ post }));
                    })
                    .catch(err => res.status(404).json({ err }));
            }
        });
});

// @route POST  api/posts/unlike/:id
// @desc Unlike post
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    // we can use user model to do thist right? 
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                // so right now, if the user cancel his account, nobody would be able to 
                // remove his posts.
                errors.noprofile = 'User profile not found';
                return res.status(404).json(errors);
            } else {
                // if already liked, return
                Post.findById(req.params.id)
                    .then(post => {
                        const index = post.likes.findIndex(el => el.user.toString() === req.user.id);
                        if (index !== -1) {
                            post.likes.splice(index, 1);
                            post.save().then(() => res.json({ post }));
                        } else {
                            // haven't liked the post
                            errors.notliked = 'You haven\'t liked this post'
                            return res.status(400).json({ errors });
                        }
                    })
                    .catch(err => res.status(404).json({ err }));
            }
        });
});

// @route POST  api/posts/comment/:id
// @desc Add comment to post
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // we can use user model to do thist right? 
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                // the question is, Is a user without profile considered as a valid user?
                errors.noprofile = 'User profile not found';
                return res.status(404).json(errors);
            } else {
                // if already liked, return
                Post.findById(req.params.id)
                    .then(post => {
                        const newComment = {
                            text: req.body.text,
                            name: req.body.name,
                            avatar: req.body.avatar,
                            user: req.user.id,
                        };
                        post.comments.push(newComment);
                        return post.save().then(() => res.json({ post }));
                    })
                    .catch(err => res.status(404).json({ err }));
            }
        });
});

// @route DELETE  api/posts/:id/comment/:comment_id
// @desc Delete a comment from post
// @access Private
// delete or post? we are using post in unlike routes
router.delete('/:id/comment/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    // we can use user model to do thist right? 
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {ß
                errors.noprofile = 'User profile not found';
                return res.status(404).json(errors);
            } else {
                Post.findById(req.params.id)
                    .then(post => {
                        // find the comment and check the author of comment
                        const commentIndex = post.comments.findIndex(el => el._id.toString() === req.params.comment_id);
                        if (commentIndex === -1) {
                            errors.comment = 'Comment not found with given comment id'
                            return res.status(404).json({ errors });
                        }
                        // compare the user id
                        if (post.comments[commentIndex].user.toString() === req.user.id || post.user.toString() === req.user.id) {
                            // toDo owner of the post should be able to delete comments.
                            // valid comment. 
                            post.comments.splice(commentIndex, 1);
                            post.save().then(() => res.json({ post }));
                        } else {
                            errors.comment = 'User not authorized'
                            return res.status(401).json({ errors });
                        }
                    })
                    .catch(err => res.status(404).json({ err }));
            }
        });
});

module.exports = router;