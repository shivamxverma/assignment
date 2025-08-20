import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Booking from '../models/bookings.model.js';
import Slot from '../models/slots.model.js';

const createBooking = asyncHandler(async (req, res) => {
    const { slotId } = req.body;

    if (!slotId) {
        throw new ApiError(400, 'Missing slotId');
    }

    const slot = await Slot.findById(slotId);

    if (!slot) {
        throw new ApiError(404, 'Slot not found');
    }

    const existing = await Booking.findOne({ slot: slotId });

    if (existing) {
        throw new ApiError(409, 'Slot already booked');
    }

    const booking = await new Booking({ user: req.user, slot: slotId }).save();

    if(!booking){
        throw new ApiError(500, 'Error creating booking');
    }

    await User.findByIdAndUpdate(req.user, { $push: { bookings: booking._id, slots: slotId } });

    res.status(201).json(new ApiResponse(201, {}, 'Booked successfully'));
});

const allBookingsforPatient = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('slot');

  if(!bookings){
    throw new ApiError(404, 'No bookings found');
  }

  res.json(new ApiResponse(200, bookings.map(b => ({
    id: b._id,
    start: b.slot.startAt.toISOString(),
    end: b.slot.endAt.toISOString()
  })), 'Bookings fetched'));
});

const allBokingforAdmin = asyncHandler(async (req, res) => {

  const bookings = await Booking.find().populate('user', 'name email').populate('slot');

  if(!bookings){
    throw new ApiError(404, 'No bookings found');
  }
  
  res.json(new ApiResponse(200, bookings.map(b => ({
    id: b._id,
    user: { name: b.user.name, email: b.user.email },
    start: b.slot.startAt.toISOString(),
    end: b.slot.endAt.toISOString()
  })), 'All bookings fetched'));
});

export {
    createBooking,
    allBookingsforPatient,
    allBokingforAdmin
}

