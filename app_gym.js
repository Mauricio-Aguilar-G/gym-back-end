// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

// Routes configuration
const member = require('./routes/member');
const admin = require('./routes/admin');
const admin_member = require('./routes/admin_member');

const options = {
    useNewUrlParser : true,
    useUnifiedTopology: true
}
const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200
}

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors(corsOptions));
app.use('/gym/member',member);
app.use('/gym/admin',admin);
app.use('/gym/admin_member',admin_member);

// DB connection uri
const uri = 'mongodb+srv://appVideo:appVideo@cluster0.uynkj.mongodb.net/gym_db?retryWrites=true&w=majority'

// Port 
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`API listening on port ${port}...`);
});

// DB connection
mongoose.connect(uri, options)
    .then(() => console.log('Conectado a MongoDB!'))
    .catch(err => console.log('No se pudo conectar con MongoDB', err));

app.get('/', (req, res) => {
    res.json({
        mensaje: 'Esta funcionando'
    });
});