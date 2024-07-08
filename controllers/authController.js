import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

// @desc    Login user
// @route   POST /api/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  console.log("hi hu");
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (!user.isStatus) {
      res.status(401);
      throw new Error('User is Blocked');
    } else {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImg: user.profileImg,
        bannerImg: user.bannerImg
      });
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImg: user.profileImg,
      bannerImg: user.bannerImg
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// @desc    Update user profile and add user banner image
// @route   PATCH /api/addProfile
// @access  Private
const addProfile = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.body._id);

  if (user) {
    if(req.body.profileImg){
      user.profileImg = req.body.profileImg
    }else{
      user.bannerImg = req.body.bannerImg
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImg:updatedUser.profileImg,
      bannerImg:updatedUser.bannerImg
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
})

export { loginUser, registerUser, addProfile};
