const mongoose = require('mongoose');

const meaningSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    word: { type: String, required: true},
    meaning: { type: String, required: true}
})

module.exports = mongoose.model('Meaning', meaningSchema);