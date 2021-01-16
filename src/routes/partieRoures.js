const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Partie = mongoose.model('Partie');

const router = express.Router();

router.use(requireAuth);

router.get('/parties',async (req,res)=>{
    const parties = await Partie.find();
    
    res.json(parties);
});

router.post('/mesParties',async (req,res)=>{
    const {userId}= req.body
    console.log("us",userId)
    const parties = await Partie.find({userId});
    
    res.json(parties);
});
router.post('/partiesRejoints',async (req,res)=>{
    const {userId}= req.body
    console.log("us",userId)
    const parties = await Partie.find({userId});
    
    res.json(parties);
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

router.post('/membrePartie',async (req,res)=>{
    const {_id}=req.body
   
    try{
        const partie= await Partie.find({_id},'membre');
        console.log("partie",partie)
        res.json(partie)
    }catch(err){
       return res.status(423).send(err.message);
    }
    
});

router.delete('/deletePartie',async (req,res)=>{
    const {_id}=req.body
   
    try{
        Partie.deleteOne({_id}).then( ()=>{
            console.log("succees")
        
        })
        
    }catch(err){
       return res.status(423).send(err.message);
    }
    
});

router.put('/ajouterMembre',async (req,res)=>{
    const {idpartie, userid} =req.body;

    try{
         await Partie.updateOne({_id:idpartie},{$addToSet:{membre:userid}}).then(()=>{
             
         })
         const partie=await Partie.findById(idpartie);
         const  {membre} = partie;
        console.log(membre);
        res.json({messsage:'updated'})
    }catch(err){
       return res.status(423).send(err.message);
    }

});
router.put('/effacerMembre',async (req,res)=>{
    const {idpartie, userid} =req.body;

    try{
        const partie=await Partie.findById(idpartie);
        const tab=partie.membre
        tab.filter(e=>e!==userid);
        const meb=[];
        for(let i=0;i<tab.length;i++){
            if(tab[i]!=userid){
                meb.push(tab[i])
            }
        }
        console.log(meb);
        

         await Partie.updateOne({_id:idpartie},{membre:meb}).then(()=>{
             console.log("updated")
         })

        res.json({messsage:'updated'})
    }catch(err){
       return res.status(423).send(err.message);
    }

});

module.exports = router;