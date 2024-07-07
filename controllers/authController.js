import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

// @desc    Login user
// @route   POST /api/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
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
  console.log("helo");
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

export { loginUser, registerUser };
