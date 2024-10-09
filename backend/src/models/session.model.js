import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  deviceId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '2h' }, // Session expires after 2 hours
});

const Session = mongoose.model('Session', sessionSchema);
export default Session;
