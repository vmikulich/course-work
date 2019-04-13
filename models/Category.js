const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const categoryShema = new Shema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('categories', categoryShema);