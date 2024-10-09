import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique IDs
import Session from '../models/sessionModel.js'; // Import your Session model
import { generateQRCode } from '../utils/qrCodeGenerator.utils.js'; // Assuming you have a utility to generate QR codes

export const generateQRCodeController = async (req, res) => {
  try {
    // Automatically generate sessionId and deviceId using uuidv4
    const sessionId = uuidv4();
    const deviceId = uuidv4();

    // Create a new session and save it to MongoDB
    const session = new Session({ sessionId, deviceId });
    await session.save();

    // Generate QR data containing sessionId
    const qrData = `http://localhost:5000/api/session/receive/${sessionId}`;
    
    // Generate the QR code image based on the qrData
    const qrCodeImage = await generateQRCode(qrData);

    // Send the QR code as a PNG image in the response
    res.type('png').send(qrCodeImage);
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR Code', error });
  }
};


