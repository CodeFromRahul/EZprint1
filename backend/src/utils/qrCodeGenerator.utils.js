import QRCode from 'qr-image';

// Generate QR Code from data
export const generateQRCode = (data) => {
  return QRCode.imageSync(data, { type: 'png' });
};
