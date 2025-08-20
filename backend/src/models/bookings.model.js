import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  slot: {
    type: Schema.Types.ObjectId,
    ref: 'Slot',
    required: true,
    unique: true
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;