// import express from 'express';
import { generateQRCodeController, recieveFiles, downloadFiles } from "../controllers/fileSharing.controller.js";
import { Router } from 'express';
const router = Router();

// Route to generate a QR code for a new session
router.get('/generate', generateQRCodeController);

// Route to receive files for a session
router.post('/receive/:sessionId', recieveFiles);

// Route to download files for a session
router.get('/download/:sessionId', downloadFiles);

export default router;
