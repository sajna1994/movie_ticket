const router = require('express').Router();
const jwt = require("jsonwebtoken");
const movieDATA = require('../models/Movie')

const UserDATA = require('../models/User')
router.get('/movielist', async (req, res) => {
    try {
        let data = await movieDATA.find()
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})

// router.get('/movielist/:userId', async (req, res) => {
//     try {
//         let userId = req.params.userId;
//         let data = await movieDATA.find({ user: userId }).populate('user');
//         res.send(data);
//     } catch (error) {
//         res.send(error.message);
//     }
// });

router.get('/moviedetails/:id', async (req, res) => {
    try {
      const movieId = req.params.id;
      const movieDetails = await movieDATA.findById(movieId);
  
      if (!movieDetails) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.json(movieDetails);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post('/addmovie', async (req, res) => {
    try {
        console.log(req.body)
        const {userId,movieId, moviename,date,numtickets, category, language,ticket_rates,time,poster,booked_tickets, review,cast_details,image, description } = req.body;
        const movie= await movieDATA({userId,movieId, moviename,date,numtickets, category, language,ticket_rates,time,poster,booked_tickets, review,cast_details,image, description });
        movie.save();
        res.json({ message: "Created Succesfully" });


    } catch (error) {
        console.log(error)
        res.json('error')
    }

})


router.put('/movielist/:id',async(req,res)=>{
    try {
       id = req.params.id
       let updateData = {$set:req.body}
       const updated = await movieDATA.findByIdAndUpdate(id, updateData)
        res.json({message:"Updated successfully"})
    } catch (error) {
        // console.log(error)
        res.send('error')
    }
})
router.delete('/movielist/:id',async(req,res)=>{
    try {
        let id = req.params.id
       const updated = await movieDATA.findByIdAndDelete(id)
       res.json({message:"Deleted successfully"})
    } catch (error) {
        console.log(error)
        res.send('error')
    }
})


module.exports = router