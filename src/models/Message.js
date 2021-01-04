const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    partieId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partie'
    },
    contenue:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now ,
        required: true,
    },
   
});


mongoose.model('Message',messageSchema);