const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const categoryRoutes = require('./routes/category');
const positionRoutes = require('./routes/position');
const clientCategoryRoutes = require('./routes/clientCategory');
const clientPositionRoutes = require('./routes/clientPosition');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI)
        .then(() => console.log('MongoDB connected'))
        .catch(error => console.log(error));

app.use(passport.initialize());
// require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
})


app.use('/api/client/clientCategory', clientCategoryRoutes);
app.use('/api/client/clientPosition', clientPositionRoutes);
app.use('/api/administrator/category', categoryRoutes);
app.use('/api/administrator/position', positionRoutes);


module.exports = app;