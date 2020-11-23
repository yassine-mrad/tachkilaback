const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup',async (req,res)=>{
    const {nom,prenom,email,motdepasse,datenaissance,localisation,telephone,profession,niveau} =req.body;
    try{
        const user = new User({nom,prenom,email,motdepasse,datenaissance,localisation,telephone,profession,niveau});
    await user.save();
    const token = jwt.sign({userId: user._id}, 'TACHKILA_YAS');
    console.log(req.body);
    res.send({token});
    }catch(err){
       return res.status(422).send(err.message);
    }
    
});

router.post('/signin',async (req,res) => {
    const {email, motdepasse} = req.body;
    if(!email || !motdepasse){
        return res.status(422).send({error: 'Must provide email and password'})
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(422).send({error: 'Invalid password or email'});
    }
    try {
        await user.comparePassword(motdepasse);
        const token = jwt.sign({userId: user._id}, 'TACHKILA_YAS');
        res.send({token});
    } catch (err) {
        return res.status(422).send({error: 'Invalid password or email'});
    }
})
module.exports = router;