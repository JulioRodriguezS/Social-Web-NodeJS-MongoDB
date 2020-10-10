const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const ImageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    fullFileName: { type: String },
    partFileName: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    savedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', ImageSchema);