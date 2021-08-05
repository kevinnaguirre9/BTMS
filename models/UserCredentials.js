const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userCredentialsSchema = new Schema({
     email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true
     },
     password: {
          type: String,
          required: true,
     },
     userId: {
          type: Schema.Types.ObjectId,
          ref: "users" 
     }
    
}, {
     timestamps: true,
     versionKey: false
});


//Encrypt password before save to DB
userCredentialsSchema.statics.encryptPassword = async (password) => {
     try {
          const salt = await bcrypt.genSalt(10);
          return await bcrypt.hash(password, salt);
     } catch (error) {
          console.log(error);
     }
     
}

userCredentialsSchema.statics.comparePassword = async (receivedPassword, userPassword) => {
     try {
          return await bcrypt.compare(receivedPassword, userPassword);
     } catch (error) {
          console.log(error);
     }
}

module.exports = mongoose.model('user_credentials', userCredentialsSchema);