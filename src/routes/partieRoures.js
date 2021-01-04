const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Partie = mongoose.model('Partie');

const router = express.Router();

router.use(requireAuth);

router.get('/parties',async (req,res)=>{
    const parties = await Partie.find();
    
    res.send(parties);
});
router.post('/partie',async (req,res)=>{
   const  {userId,titre,nombre,niveau,dateestime,localisation,description,tranchedage,membre} = req.body;
    try{
        const partie = new Partie({userId,titre,nombre,niveau,dateestime,localisation,description,tranchedage,membre});
    await partie.save();
    return res.status(200).send('Done !');
    }catch(err){
        return res.status(422).send(err.message);
     }

});
router.put('/updatepartie',async (req,res)=>{
    const {userId,titre,nombre,niveau,dateestime,localisation,description,tranchedage,membre,idpartie} =req.body;
   
    try{
         await Partie.updateOne({_id:idpartie},{userId,titre,nombre,niveau,dateestime,localisation,description,tranchedage,membre});
    
        res.json({messsage:'updated',status:200,data:req.body})
    }catch(err){
       return res.status(423).send(err.message);
    }
    
});

module.exports = router;