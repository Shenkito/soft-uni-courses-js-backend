const mongoose = require('mongoose');

const electronicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [10, 'Name should be at least 10 characters'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        minLength: [2, 'Type should be at least 2 characters'],
    },
    damages: {
        type: String,
        required: [true, 'Damages are required'],
        minLength: [10, 'Damages should be at least 10 characters'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'Desription should be at least 10 characters'],
        maxLength: [200, 'Description should be at least 200 characters']
    },
    production: {
        type: Number,
        required: [true, 'Production is required'],
        validate: {
            validator: function(value) {
                return value > 1900 && value < 2023;
            },
            message: 'Production should be at between 1900 and 2023',
        },

    },
    exploitation: {
        type: Number,
        required: [true, 'Exploitation is required'],
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: 'Exploitation must be a positive number',
        },
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: 'Price must be positive number',
        },
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyingList: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'User',
            }
        }
    ],


});

const Electronic = mongoose.model('Electronic', electronicSchema);

module.exports = Electronic;