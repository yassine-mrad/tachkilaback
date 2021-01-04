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

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(partieRoures);
app.use(messageRoutes);
app.get('/',requireAuth,(req,res)=>{
    res.send(`Your email : ${req.user.email}`);
});

app.get('/hello',(req,res)=>{
    res.send(`hello `);
});

const server = require('http').createServer(app);

const io = require('socket.io')(server);

const mongoDB = 'mongodb+srv://yassine:IjEgHrEv4KcDB8Sl@tachkila.j9xuf.mongodb.net/Tachkila?retryWrites=true&w=majority';
mongoose.connect(mongoDB,{ useUnifiedTopology: true ,useNewUrlParser: true });
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error',(err)=>{
    console.error('Error connecting to mongo',err);
});
io.on('connection',socket =>{
    console.log('a user connected');
})


server.listen(3000,()=>{
    console.log('listening on port 3000');
});