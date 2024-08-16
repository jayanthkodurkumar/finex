const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose  = require("mongoose")

// we define the fields for user collection
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// hash the password using bcrypt
// here next is callback function which either proceeds to next middle ware or completes the current task
userSchema.pre('save', async function(next){
try {
  const hashedPassword = await bcrypt.hash(this.password,10)
  this.password = hashedPassword
} catch (error) {
  next(error)
}

})

// create the user schema in actual db. mongo will create it in pluarl form called "users"
const User = mongoose.model("User", userSchema);


module.exports = User;
