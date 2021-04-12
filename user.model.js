const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {  type: String, required: true },
    age:{type:String, required:true},
    address:{type:String,required:true},
    pinCode:{type:String,required:true},
    city:{type:String,required:true},
    district:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    password:{type:String,required:true},
    custId:{type:String}
}, {
  timestamps: true
})

module.exports = mongoose.model('User', User);