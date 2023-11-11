const Electronic = require('../models/Electronic');

exports.getAll = () => Electronic.find().populate('owner');

exports.getOne = (electronicId) => Electronic.findById(electronicId).populate('owner');

exports.create = (electronicData) => Electronic.create(electronicData);

exports.delete = (electronicId) => Electronic.findByIdAndDelete(electronicId);

exports.edit = (electronicId, electronicData) => Electronic.findByIdAndUpdate(electronicId, electronicData);
