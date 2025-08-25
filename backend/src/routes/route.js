import { Router } from 'express';
import { registerUser, loginUser} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { availableSlots } from '../controllers/slots.controller.js';
import { allBookingsforPatient, allBokingforAdmin,createBooking } from '../controllers/booking.controller.js';
import limiter from '../middlewares/ratelimit.middleware.js';

const router = Router();

router.post('/register',registerUser);
router.post('/login', loginUser);

router.get('/slots',verifyJWT, availableSlots);
router.post('/book/:slotId',verifyJWT,createBooking);

router.get('/my-bookings', verifyJWT,allBookingsforPatient);

router.get('/all-bookings',allBokingforAdmin);

export default router;