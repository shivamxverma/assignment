import asyncHandler from '../utils/asyncHandler.js';
import Slot from '../models/slots.model.js';
import Booking from '../models/bookings.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const availableSlots = asyncHandler(async (req, res) => {
  let from = req.query.from ? new Date(req.query.from) : new Date();
  let to = req.query.to ? new Date(req.query.to) : new Date(from.getTime() + 7 * 24 * 60 * 60 * 1000);
  from.setUTCHours(0, 0, 0, 0);
  to.setUTCHours(23, 59, 59, 999);
  const bookedSlots = await Booking.find({}).distinct('slot');

  if(bookedSlots.length === 0) {
    return res.json(new ApiResponse(200, [], 'No slots available'));
  }

  const slots = await Slot.find({
    startAt: { $gte: from, $lte: to },
    _id: { $nin: bookedSlots }
  });
  
  res.json(new ApiResponse(200, slots.map(s => ({
    id: s._id,
    start: s.startAt.toISOString(),
    end: s.endAt.toISOString()
  })), 'Slots fetched'));
});

export {
    availableSlots
}