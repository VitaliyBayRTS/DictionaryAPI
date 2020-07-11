// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const { Schema } = mongoose

// const meaningSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     word: { type: String, required: true},
//     meaning: { type: String, required: true}
// })
const meaningSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    word: { type: String, required: true},
    meaning: { type: String, required: true}
})

// module.exports = mongoose.model('Meaning', meaningSchema);
let Meaning = mongoose.model('Meaning', meaningSchema);
export default Meaning;