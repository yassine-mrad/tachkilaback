const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    
    nom:{
        type: String,
        required: true
    },
    prenom:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    motdepasse:{
        type: String,
        required: true,
    },
    datenaissance:{
        type: Date,
        required: true,
        max: '2008-01-01'
    },
    localisation:{
        type: String,
        required: true
    },
    telephone:{
        type: Number,
        required: true
    },
    profession:{
        type: String,
        required: true
    },
    niveau:{
        type: String,
        required: true
    },
});

userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('motdepasse')) {
        return next();
    }

    bcrypt.genSalt(10,(err, salt) => {
        if(err){
            return next(err);
        }
        bcrypt.hash(user.motdepasse,salt, (err, hash) => {
            if(err) {
                return next(err);
            }
            user.motdepasse = hash;
            next();
        })
    })

})
userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject) => {
        bcrypt.compare(candidatePassword,user.motdepasse,(err,isMatch) => {
            if(err) {
                return reject(err);
            }
            if(!isMatch) {
                return reject(false);
            }
            resolve(true);
        });
    });
}
mongoose.model('User',userSchema);