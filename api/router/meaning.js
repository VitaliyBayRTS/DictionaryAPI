const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Meaning = require('../models/meaningModel');


router.get('/allwords', (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const count = parseInt(req.query.count) || 10
    Meaning.find().limit(count).skip(page == 1 ? 0 : (page * count) - count).then(result => {
        Meaning.find().exec().then(words => {
            res.status(200).json({
                totalCount: words.length,
                items: result,
                error: 0
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
       
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.get('/search', (req, res, next) => {
    const page = parseInt(req.query.page) || 1
    const count = parseInt(req.query.count) || 5
    let query = {$or:[{"word":{"$regex": req.query.word, "$options": "i" }},
                {"meaning":{"$regex": req.query.word, "$options": "i" }}]}
    Meaning.find(query).limit(count).skip(page == 1 ? 0 : (page * count) - count).then(result => {
        Meaning.find(query).exec().then(words => {
            res.status(200).json({
                totalCount: words.length,
                items: result,
                error: 0
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', (req, res, next) => {
    const meaning = new Meaning({
        _id: new mongoose.Types.ObjectId(),
        word: req.body.wordInfo.word,
        meaning: req.body.wordInfo.meaning
    })
    meaning.save().then( result => {
        res.status(200).json({
            result: result,
            statusCode: 0
        })
    }).catch(err => {
        res.status(500).json({
            error: err,
            statusCode: 1
        })
    })
})

router.put('/updateWord/:id', (req, res, next) => {
    let id = req.params.id;
    Meaning.findById(id).exec().then(result => {
        console.log(true)
    }).catch(err => {
        console.log(false)
    })
    Meaning.updateOne({_id: id}, {
        "word": req.body.wordInfo.word,
        "meaning": req.body.wordInfo.meaning
    }).exec().then(result => {
        res.status(200).json({
            result: "Word with id " + id + " was modified successfully",
            resultCode: 0
        })
    }).catch(err => {
        res.status(500).json({error: err})
    })
})

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Meaning.deleteOne({_id: id}).exec().then(result => {
        res.status(200).json({
            result: "Product was deleted successfully",
            deletedCount: result.deletedCount
        });
    }).catch(err => {
        res.status(500).json({ error: err});
    })
})

module.exports = router;