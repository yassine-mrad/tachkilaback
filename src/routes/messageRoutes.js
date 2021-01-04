const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Message = mongoose.model('Message');

const router = express.Router();

router.use(requireAuth);

router.post('/messages',async (req,res)=>{
    
    const {partieId} = req.body;
    try{
        
        const messages = await Message.find({partieId});
    
    
    return res.json({messsage:'this is the messages',status:200,data:messages})
    }catch(err){
        return res.status(422).send(err.message);
     }
});

router.post('/message',async (req,res)=>{
   const  {userId,partieId,contenue,date} = req.body;
    try{
        const message = new Message({userId,partieId,contenue,date});
        console.log(req.params);
    await message.save();
    
    return res.json({messsage:'this is the message',status:200,data:message})
    }catch(err){
        return res.status(422).send(err.message);
     }

});


module.exports = router;