import mongoose, { Schema } from 'mongoose';

const slotSchema = new Schema({
  startAt: {
    type: Date,
    required: true
  },
  endAt: {
    type: Date,
    required: true
  }
}, { timestamps: true });

const Slot = mongoose.model('Slot', slotSchema);

export default Slot;