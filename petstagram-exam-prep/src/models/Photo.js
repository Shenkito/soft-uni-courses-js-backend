const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name should be at least two characters'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [1, 'Age should be greater than 1'],
        max: [100, 'Age should be smaller than 100'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        // minLength: 5,
        // maxLength: 50,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: [5, 'Location should be at least 5 characters'],
        maxLength: [50, 'Location should be not longer than 50 characters'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'User',
            },
            message: {
                type: String,
                required: [true, 'Comment message is required']
            },

        }
    ]

});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;