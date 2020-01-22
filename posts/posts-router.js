const express = require('express');

const Posts = require("../users/model");

const router = express.Router();

router.get('/', (req, res) => {
    Posts.list()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get Posts' });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Posts.findByID(id)
        .then(post => {
            console.log(post);
            if (post.length !== 0) {
                res.json(post);
            } else {
                res.status(404).json({ message: 'Could not find post with given id.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get post' });
        });
});

router.post('/', (req, res) => {
    const postData = req.body;
    Posts.insert(postData)
        .then(ids => {
            res.status(201).json({ created: ids[0] });
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new post' });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('Posts').where({ id }).update(changes)
        .then(count => {
            if (count) {
                res.json({ update: count });
            } else {
                res.status(404).json({ message: 'Could not find post with given id' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update post' });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('Posts').where({ id }).del()
        .then(count => {
            if (count) {
                res.json({ removed: count });
            } else {
                res.status(404).json({ message: 'Could not find post with given id' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete post' });
        });
});

module.exports = router;