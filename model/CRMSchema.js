const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  email: { type: String, required: true},
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum:['user','admin']
  }
//   token:{
//     type:String
//   }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
