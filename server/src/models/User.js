var mongoose = require('mongoose');

// Define collection and schema for User
var UserSchema = new mongoose.Schema({
  profile: {
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    //add user profile picutre
    picture: {
      type: String,
      required: false,
      match: /^http:\/\//i
    }
  },
  data: {
    oauth: { type: String },
    applied: [{
      job: {
        type: mongoose.Schema.Types.ObjectId
      }
    }]
  }
});

module.exports = mongoose.model('User', UserSchema);

// module.exports.set('toObject', { virtuals: true });
// module.exports.set('toJSON', { virtuals: true });
