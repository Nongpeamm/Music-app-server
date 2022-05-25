const { Song, SongSchemaValidate } = require('../models/Song');
const {User} = require('../models/User');

exports.addTrack = async(req,res) => {
    console.log("add track")
    const { error } = SongSchemaValidate(req.body)

        if(error){
            return res.status(400).send(error.details[0].message)
        }
    
    try{
        //ดูว่ารับค่าอะไรมาบ้าง
        const {name, artist, track, genre, img, lyric, duration} = req.body;

        //เพิ่ม เพลง เข้า db
        song = new Song({
            name,
            artist,
            track,
            genre,
            img,
            lyric,
            duration,
        });
        await song.save();

        const alltrack = await Song.find({}).select('-__v')
        console.log(alltrack);
        res.send({payload: alltrack});
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error!')
    }

}

exports.getAlltrack = async(req,res) => {
    try{

        const alltrack = await Song.find({}).select('-__v')
        res.send({payload: alltrack});
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error!')
    }
}

exports.gettrack = async(req,res) => {
    try{
        const track = await Song.findById({_id: req.params.id}).select('-__v')
        return res.send({payload: track});
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error!')
    }
}

exports.edittrack = async(req,res) => {
    try{

        // const id = req.params.id
        // const body = req.body

        await Song.findByIdAndUpdate(req.params.id, req.body)
        const alltrack = await Song.find({}).select('-__v')
        res.send({payload: alltrack});
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error!')
    }

}

exports.updatefavtrack = async(req,res) => {
    try{
        console.log("fav click")
        const id = req.params.id
        const track = await Song.findById({_id:id});
        const user = await User.findById(req.user._id)

        const trackCheck = user.favourite.indexOf(track._id)
        console.log("track check" + trackCheck)
        
        if(trackCheck === -1 ){
            user.favourite.push(track._id)
            await Song.findByIdAndUpdate({_id:id}, {$inc: {favCount: 1}})
        }
        else{
            user.favourite.splice(trackCheck, 1)
            await Song.findByIdAndUpdate({_id:id}, {$inc: {favCount: -1}})
        }

        
        await user.save()
        const alltrack = await Song.find({}).select('-__v')
        console.log(alltrack)
        res.send({payload: alltrack});
        // console.log(user,track)
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error!')
    }

}

exports.deletetrack = async(req,res) => {
    console.log('delete')
    try{
        const id = req.params.id
        const track = await Song.findOneAndDelete({_id:id});
        console.log(track)

        const alltrack = await Song.find({}).select('-__v')

        res.send({payload: alltrack});


    }
    catch(err){
        console.log(err)
        res.status(500).send('server error!')
    }

}