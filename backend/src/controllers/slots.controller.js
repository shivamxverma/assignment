import asyncHandler from '../utils/asyncHandler.js';
import Slot from '../models/slots.model.js';
import Booking from '../models/bookings.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const availableSlots = asyncHandler(async (req, res) => {

  console.log('Fetching available slots');
  // const bookedSlots = await Booking.find({}).distinct('slot');

  // if(bookedSlots.length === 0) {
  //   return res.json(new ApiResponse(200, [], 'No slots available'));
  // }

  const slots = await Slot.find();
  
  res.json(new ApiResponse(200, slots.map(s => ({
    id: s._id,
    start: s.startAt.toISOString(),
    end: s.endAt.toISOString()
  })), 'Slots fetched'));
});

export {
    availableSlots
}