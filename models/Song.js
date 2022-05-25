const mongoose = require('mongoose')
const joi = require('joi')

// Create new schema for track
const Songschema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    artist: { 
        type: String, 
        required: true 
    },
    track: { 
        type: String, 
        required: true 
    },
    img: { 
        type: String, 
        required: true 
    },
    genre: { 
        type: String, 
        required: true 
    },
    lyric: { 
        type: String, 
        required: true 
    },
    duration: { 
        type: Number, 
        required: true 
    },
    favCount: { 
        type: Number, 
        default: 0 
    },
})

// Validate data
const SongSchemaValidate = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        artist: joi.string().required(),
        track: joi.string().required(),
        img: joi.string().required(),
        genre: joi.string().required(),
        lyric: joi.string().required(),
        duration: joi.number().required(),
    })
    return schema.validate(data)
}

const Song = mongoose.model('song', Songschema)

module.exports = { Song, SongSchemaValidate }