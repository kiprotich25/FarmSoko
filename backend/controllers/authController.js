const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/User");


exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;
    

    try {
        const userExists = await User.findOne( {email});
        if (userExists) {
            return res.status(400).json({message: 'User already exists'})
        }
        if(!email || !email.match(/^\S+@\S+\.\S+$/)){
            return res.status(400).json({message: 'Invalid email format'});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({username, email, password: hashedPassword, role: role || 'farmer'})
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(201).json({
          _id: newUser._id,
         username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          token,
        });

        
        
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Server error' });
        
    }
};

exports.login = async (req, res ) => {
     const {email, password} = req.body;
    try {
       
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({error: 'Invalid email'})

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({error: 'Invalid password'})

        const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token, user: {id: user._id, username: user.username, role: user.role }});

    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
};
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({user});
  } catch (error) {
    console.error("GET /me error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
