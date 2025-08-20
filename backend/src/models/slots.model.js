import mongoose,{Schema} from 'mongoose';

const slotSchema = new Schema({
    start_at : {
        type: Date,
        required: true
    },
    end_at : {
        type: Date,
        required: true
    }
},{timestamps: true});

const Slot = mongoose.model('Slot', slotSchema);

export default Slot;