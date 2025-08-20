import User from '../src/models/user.model.js';
import Slot from '../src/models/slots.model.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();

async function generateSlots() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const endDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const existingSlots = await Slot.countDocuments();
  if (existingSlots > 0) return; 

  const slots = [];
  let current = new Date(today);
  while (current < endDate) {
    let startHour = new Date(current);
    startHour.setUTCHours(9, 0, 0, 0);
    const endDay = new Date(current);
    endDay.setUTCHours(17, 0, 0, 0);
    while (startHour < endDay) {
      const end = new Date(startHour.getTime() + 30 * 60 * 1000);
      slots.push({ startAt: startHour, endAt: end });
      startHour = end;
    }
    current.setUTCDate(current.getUTCDate() + 1);
  }
  await Slot.insertMany(slots);
  console.log('Slots generated');
}

async function seedAdmin() {
  const adminExists = await User.findOne({ email: 'admin@clinic.com' });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD, 10);
    await new User({ name: 'Admin', email: 'admin@clinic.com', password: hashedPassword, role: 'admin' }).save();
    console.log('Admin seeded');
  }
}

export {
    generateSlots,
    seedAdmin
}