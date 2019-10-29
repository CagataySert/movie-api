const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true,'`{PATH}` alanı zorunludur'],
        maxlength: [15, '`{PATH}` alanı (`{VALUE}`) , ({MAXLENGTH}) karakterden küçük olmalıdır.'],
        minlength: 1
    },
    category: String,
    country: String,
    year: {
        type:Number,
        min: 1000,
        max: 1800
    },
    imdb_score: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);