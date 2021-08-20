const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opts = {
     timestamps: {
       createdAt: 'fechaMedicion',
       updatedAt: false
     },
     versionKey: false
};

const bodyTempSchema = new Schema({
     celsius: {
          type: Number,
          required: true
     },  
     userId: {
          type: Schema.Types.ObjectId,
          ref: "users" 
     }
}, opts)

module.exports = mongoose.model('body_temp_measurements', bodyTempSchema);