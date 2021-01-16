require('./models/User');
require('./models/Partie');
require('./models/Message');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const partieRoures = require('./routes/partieRoures');
const messageRoutes = require('./routes/messageRoutes');
const requireAuth = require('./middlewares/requireAuth'); 
const { Socket } = require('dgram');
const Message = mongoose.model('Message');
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(partieRoures);
app.use(messageRoutes);
app.get('/',requireAuth,(req,res)=>{
    res.send('Your email : ${req.user.email}');
});

app.get('/hello',(req,res)=>{
    res.send('hello ');
});

const server = require('http').createServer(app);

const io = require('socket.io')(server);

//connect to socket 

io.on('connection',(client) =>{
    console.log('a user connected');
})


//return all messages
// app.get('/messages', (req,res)=>{
    
    
//           Message.find().then(result=>{
//             res.json(result)
           
//           })
    
        
       
    
// });


app.post('/messages', (req,res)=>{
    
    const {partieId} = req.body;
          Message.find({partieId}).then(result=>{
            res.json(result)
           
          })
    
        
       
    
});
io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on("message",async  (msg) => {
        console.log(msg.messages[0].user.name);
            const message = new Message({userId:msg.user,partieId:msg.partieId,contenue:msg.messages[0].text,nom:msg.messages[0].user.name});
            console.log("message instance",message)
            io.emit(msg.partieId.toString(), msg.messages);
            await message.save();
     
       
        


      console.log(msg);
      
    });
  });
//create new message
app.post('/message',async (req,res)=>{
    
   const  {userId,partieId,contenue} = req.body;
   console.log("user",userId)
   console.log(partieId)
   console.log(contenue)
    try{
        const message = new Message({userId,partieId,contenue});
        console.log("message instance",message)
    await message.save();
    io.emit('message',{contenue:message});
 
   
    }catch(err){
        return res.status(422).send(err.message);
     }

});


const mongoDB = 'mongodb+srv://yassine:IjEgHrEv4KcDB8Sl@tachkila.j9xuf.mongodb.net/Tachkila?retryWrites=true&w=majority';
mongoose.connect(mongoDB,{ useUnifiedTopology: true ,useNewUrlParser: true });
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error',(err)=>{
    console.error('Error connecting to mongo',err);
});



server.listen(3000,()=>{
    console.log('listening on port 3000');
});