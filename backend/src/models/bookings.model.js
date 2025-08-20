import mongoose,{Schema} from 'mongoose';

const slotSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    slot : {
        type: Schema.Types.ObjectId,
        ref: 'Slot',
        required: true,
        unique: true
    }
},{timestamps: true});

const Booking = mongoose.model('Booking', slotSchema);

export default Booking;