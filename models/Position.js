const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const positionShema = new Shema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        ref: 'categories',
        type: Shema.Types.ObjectId
    },
});

module.exports = mongoose.model('positions', positionShema);