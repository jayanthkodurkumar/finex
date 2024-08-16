const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// always remember db operations are asyncronous only
const registerUser = async(req,res) =>{

  const {name,email,password} = req.body

  // if user exists return 400 erros
  const userExists = await User.findOne({email})

  if(userExists){
    return res.status(400).json({message: "User already Exists"})
  }

  // create new user
    const user = await User.create({
      name,
      email,
      password,
    });


     if (user) {
       res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id),
       });
     } else {
       res.status(400).json({ message: "Invalid user data" });
     }

}


// Login  user
const loginUser = async(req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid email or password' });
  }
};


// delete user

const deleteUserAccount = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.deleteOne(user);

  res.status(200).json({ message: "User account deleted successfully" });
};



// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


module.exports = { registerUser,loginUser,deleteUserAccount };
