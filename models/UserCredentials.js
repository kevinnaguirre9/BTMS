const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userCredentialsSchema = new Schema({
     email: {
          type: String,
          unique: true 
     },
     password: {
          type: String,
          required: true
     },
     userId: {
          type: Schema.Types.ObjectId,
          ref: "users" 
     }
    
}, {
     timestamps: true,
     versionKey: false
})

const UserCredential = mongoose.model('user_credentials', userCredentialsSchema);
module.exports = UserCredential;