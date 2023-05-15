const paginate = require('mongoose-paginate-v2');
module.exports = mongoose => {
  const {Schema} = mongoose;
  const UserSchema = new mongoose.Schema({
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    phoneNumber: {
      required: true,
      type: Number
    },
    username: {
      required: true,
      type: String,
    }
  });
  
  UserSchema.plugin(paginate);
  const user = mongoose.model('user_profile', UserSchema);
  return user;
};