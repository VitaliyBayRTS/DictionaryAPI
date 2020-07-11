const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const meaningRouter = require('./api/router/meaning');

console.log(process.env.MONGO_ATLAS_PW)
mongoose.connect('mongodb+srv://vitaliy:' + 
            process.env.MONGO_ATLAS_PW + 
            '@cluster0-bhwxi.mongodb.net/<dbname>?retryWrites=true&w=majority', {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            })

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://vitaliybayrts.github.io');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Accept, Autorization, content-type');
    res.header('Access-Control-Allow-Credentials', true);
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, HEAD, OPTIONS');
        return res.status(200).json({});
    }
    next();
})

//Route which should handle requests
app.use('/dictionary', meaningRouter)

app.use((req, res, next) => {
   const error = new Error('Not found');
   error.status = 404;
   next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;