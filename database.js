const mongoose = require('mongoose');
const config = require('./config');


mongoose.connect(config.mongoURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true
})
     .then(db => console.log('MongoDB is connected'))
     .catch(error => console.log(error));