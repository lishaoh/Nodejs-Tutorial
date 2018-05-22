const {mongoose} = require('../db/mongoose');
const validator = require('validator');
// {
//   email: 'lsh294753@gmail.com',
//   password: 'Andrew',
//   tokens: [{
//     access: 'auth',
//     token: 'gsgsd'
//   }]
// }

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE}'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 0,
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

module.exports = {User};
