const mongoose = require('mongoose');
const partieSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    titre:{
        type: String,
        required: true
    },
    nombre:{
        type: Number,
        required: true
    },
    niveau:{
        type: String,
        required: true,
    },
    dateestime:{
        type: Date,
        required: true,
    },
    localisation:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tranchedage:{
        type: String,
        required: true
    },
    membre:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});


mongoose.model('Partie',partieSchema);