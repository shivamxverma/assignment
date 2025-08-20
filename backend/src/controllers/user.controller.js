import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateAccessTokenAndRefreshToken = async (userId, role) => {
  try {
    const user = await User.findById(userId).select('-password -refreshToken');
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = jwt.sign(
      { _id: user._id, email: user.email, name: user.name, role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d' }
    );
    const refreshToken = jwt.sign(
      { _id: user._id, role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
    );
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { role, name, email, password } = req.body;
  if ([role, name, email, password].some(field => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email: email.trim().toLowerCase() });
  if (existedUser) {
    throw new ApiError(409, "Email already exists");
  }
  if (role && !['patient', 'admin'].includes(role.toLowerCase())) {
    throw new ApiError(400, "Invalid role");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  if (!hashedPassword) {
    throw new ApiError(500, "Error hashing password");
  }
  const createdUser = await User.create({
    name,
    email: email.trim().toLowerCase(),
    password: hashedPassword,
    role: role?.toLowerCase() || 'patient',
  });
  if (!createdUser) {
    throw new ApiError(500, "Error registering user");
  }
  return res.status(201).json(
    new ApiResponse(201, {}, "User registered successfully")
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }
  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid password');
  }
  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id, user.role);
  if (!accessToken || !refreshToken) {
    throw new ApiError(500, 'Failed to generate tokens');
  }
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'Strict',
  };
  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { role: user.role, token: accessToken },
        'User logged in successfully'
      )
    );
});

export { registerUser, loginUser };