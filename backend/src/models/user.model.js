import mongoose from 'mongoose';

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
  role : {
    type: String,
    enum: ['patient', 'admin'],
    default: 'patient',
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  }],
  refreshToken : {
    type: String,
    default: null,
  },
  slots : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
  }]
},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;