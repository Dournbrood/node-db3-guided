const express = require('express');

const Users = require("./model");

const router = express.Router();

router.get('/', (req, res) => {
  Users.list()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get users' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Users.findByID(id)
    .then(user => {
      console.log(user);
      if (user.length !== 0) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Could not find user with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get user' });
    });
});

router.post('/', (req, res) => {
  const userData = req.body;
  Users.insert(userData)
    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new user' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('users').where({ id }).update(changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update user' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('users').where({ id }).del()
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete user' });
    });
});

module.exports = router;