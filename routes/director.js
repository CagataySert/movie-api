const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

// router.get('/', (req, res) => {
//     const promise = Director.find({});
//
//     promise.then((data) => {
//         res.json(data);
//     }).catch(err => {
//         res.json(err);
//     });
// });

// router.get('/:director_id', (req, res) => {
//     const promise = Director.findById(req.params.director_id);
//     // const promise = Director.find().where('surname',req.params.surname);
//     promise.then(data => {
//         res.json(data);
//     }).catch(err => {
//         res.json(err);
//     });
// });
//
router.put('/:director_id', (req, res) => {
    const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {new: true});
    promise.then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

router.delete('/:director_id', (req, res) => {
    const promise = Director.findByIdAndRemove(req.params.director_id);
    promise.then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});


router.get('/:director_id', (req, res) => {
    const promise = Director.aggregate([
        // {
        //     $match: {'_id': mongoose.Types.ObjectId(req.params.director_id)}
        // },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                // preserveNullAndEmptyArrays:true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});
module.exports = router;