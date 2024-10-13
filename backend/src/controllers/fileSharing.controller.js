import { v4 as uuidv4 } from 'uuid'; 
import Session from "../models/session.model.js"; 
import { generateQRCode } from '../utils/qrCodeGenerator.utils.js'; 
import path from 'path';


export const generateQRCodeController = async (req, res) => {
  try {
   
    const sessionId = uuidv4();
    const deviceId = uuidv4();

  
    const session = new Session({ sessionId, deviceId });
    await session.save();

    const qrData = `http://localhost:5000/api/session/receive/${sessionId}`;
    
  
    const qrCodeImage = await generateQRCode(qrData);

  
    res.type('png').send(qrCodeImage);
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR Code', error });
  }
};



export const recieveFiles = async(req,res)=>{
  const {sessionId}= req.param;

  const session = Session.findOne({sessionId})
  if(!session) return res.status(404).json({message:"File does not sed"})

    res.status(200).json({
      message: 'Files uploaded successfully',
      files: files.map((file) => ({
        fileName: file.originalname,
        filePath: path.resolve(file.path),
      })),
    });

}


export const downloadFiles = async (req, res) => {
  const { sessionId } = req.params;

  const session = await Session.findOne({ sessionId });
  if (!session) return res.status(404).json({ message: 'Invalid session' });

 
  res.status(200).json({ message: 'Ready to download files' });
};







