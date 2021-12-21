const express = require('express')
const router = express.Router()
const User = require('../models/users')
const Image = require('../models/image')
const Rating = require('../models/ratings')
const axios = require('axios')
const api_url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

//Fetch and save a NASA's APOD
router.get('/image', async (req, res)=>{
    try{
        const image = await axios.get(api_url)
        const newImage = new Image({
            ImgUrl: image.data.url
        })
        newImage.save()
        res.json(newImage);
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//User
//Create User
router.post('/user', async (req, res)=>{
    const user = new User({
        email: req.body.email
    })
    try{
        findUsers = await User.find({"email":req.body.email})
        if(findUsers.length == 0){
            const newUser = await user.save()
            res.status(201).json(newUser);
        }else{
            return res.status(404).json({message: "email already used"});
        }
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//Delete User
router.delete('/user', async (req, res)=>{
    try{
        users = await User.find({"email": req.body.email})
        if(users.length == 0){
            return res.status(404).json({message: "Cannot find user"});
        }
        await users.map((user)=>{
            user.remove()
        })
        res.json({message: 'deleted'})
    }catch(err){
        res.status(500).json({message: err.mesage})
    }
})

//Rating
//Save a 1-5 star rating of a picture of a user
router.post('/rating', async (req, res)=>{
    const rating = new Rating({
        email: req.body.email,
        rating: req.body.rating,
        ImgUrl: req.body.ImgUrl
    })
    try{
        if(rating.rating < 1 || rating.rating > 5){
            return res.status(404).json({ message: 'rating must be between 1 and 5' })
        }
        const newRating = await rating.save()
        res.status(201).json(newRating);
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Updating a rating for a user
router.patch('/rating', async (req, res)=>{

    let rating
    try{
        rating = await Rating.find({"email": req.body.email})
        if(rating.length == 0){
            return res.status(404).json({ message: 'Cannot find rating' })
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    
    try{
        if(req.body.rating < 1 || req.body.rating > 5){
            return res.status(404).json({ message: 'rating must be between 1 and 5' })
        }
        rating[0].rating = req.body.rating
        const updatedRating = await rating[0].save()
        
        res.json(updatedRating)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Delete a user rating
router.delete('/rating', async (req, res)=>{
    let rating
    try{
        rating = await Rating.find({"email": req.body.email, "ImgUrl": req.body.ImgUrl})
        if(rating.length == 0){
            return res.status(404).json({ message: 'Cannot find rating' })
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    try{
        await rating.map((rate)=>{
            rate.remove()
        })
        res.json({message: 'deleted'})
    }catch(erro){
        res.status(500).json({message: err.mesage})
    }
})

//Getting all of a user's ratings
router.get('/rating', async (req,res)=>{
    try{
        ratings = await Rating.find({"email": req.body.email})
        console.log(ratings)
        if(ratings.length == 0){
            return res.status(404).json({ message: 'no rating available with the email' })
        }
        else{
            res.json(ratings);
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router;
