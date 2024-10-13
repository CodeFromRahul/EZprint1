import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sessionRoutes from "./routes/user.routes.js";  // Import the session routes

dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());  // To parse incoming JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

// Routes
app.use('/api/session', sessionRoutes);  // Use the session routes

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('File Sharing Server is running...');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
