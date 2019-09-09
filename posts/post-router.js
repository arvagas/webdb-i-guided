const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    // db.select('*').from('posts')
    db('posts') //shorthand for above; can still use .select('*') to pick categories
    .then(posts => res.status(200).json(posts))
    .catch(err => res.json(err))
});

router.get('/:id', (req, res) => {
    const { id } = req.params

    db('posts')
    .where({ id }) //always return an array
    .first() //picks the first element on the resulting array
    .then(post => res.status(200).json(post))
    .catch(err => res.json(err))
});

router.post('/', (req, res) => {
    const newPost = req.body

    db('posts')
    .insert(newPost, 'id')
    .then(([id]) => {
        db('posts')
        .where({ id }) //always return an array
        .first() //picks the first element on the resulting array
        .then(post => res.status(200).json(post))
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
});

router.put('/:id', (req, res) => {
    const updatePost = req.body
    
    db('posts')
    .where('id', req.params.id)
    .update(updatePost)
    .then(count => res.status(200).json({ message: `deleted ${count} records` }))
    .catch(err => res.json(err))
});

router.delete('/:id', (req, res) => {
    db('posts')
    .where({ id: req.params.id })
    .del()
    .then(count => res.status(200).json({ message: `deleted ${count} records` }))
    .catch(err => res.json(err))
});

module.exports = router;