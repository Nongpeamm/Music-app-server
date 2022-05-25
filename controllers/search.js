const { Song } = require('../models/Song');

exports.searchTrack = async(req,res) =>{
    try{
        const searchValue = req.params.value
        console.log(searchValue)

        if(searchValue !== ''){
            const tracks = await Song.find({name: { $regex: searchValue, $options: 'i' }})

            const artist = await Song.find({artist: { $regex: searchValue, $options: 'i' }})
            res.send({tracks, artist})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}