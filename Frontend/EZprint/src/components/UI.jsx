import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Scan, Loader2 } from 'lucide-react';

const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full transition-colors duration-300 ${className}`}
  >
    {children}
  </button>
);

const Input = ({ type, accept, className, placeholder }) => (
  <input
    type={type}
    accept={accept}
    className={`w-full p-2 rounded-lg ${className}`}
    placeholder={placeholder}
  />
);

export default function NeonQRScanner() {
  const [activeSection, setActiveSection] = useState('qr');
  const [isScanning, setIsScanning] = useState(false);
  const [qrCode, setQrCode] = useState(null);

  const handleScan = useCallback(() => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setQrCode('https://example.com'); // Simulated QR code result
    }, 3000);
  }, []);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setQrCode(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Vertical Navbar */}
      <nav className="flex flex-col items-center justify-center w-20 bg-gray-900 border-r border-gray-800">
        <Button
          onClick={() => setActiveSection('qr')}
          className={`mb-4 ${
            activeSection === 'qr' ? 'text-purple-500' : 'text-gray-400 hover:text-purple-400'
          }`}
        >
          <QrCode className="h-6 w-6" />
          <span className="sr-only">QR Code</span>
        </Button>
        <Button
          onClick={() => setActiveSection('scan')}
          className={`${
            activeSection === 'scan' ? 'text-cyan-500' : 'text-gray-400 hover:text-cyan-400'
          }`}
        >
          <Scan className="h-6 w-6" />
          <span className="sr-only">Scan</span>
        </Button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 relative">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">
            {activeSection === 'qr' ? 'QR Code Generator' : 'QR Code Scanner'}
          </h1>

          {activeSection === 'qr' ? (
            <motion.div
              className="bg-gray-800 p-8 rounded-lg shadow-lg relative overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-64 h-64 bg-white mx-auto mb-4 relative">
                <motion.div
                  className="absolute inset-0 bg-purple-500 opacity-20"
                  animate={{
                    background: [
                      'rgba(168, 85, 247, 0.2)',
                      'rgba(59, 130, 246, 0.2)',
                      'rgba(168, 85, 247, 0.2)',
                    ],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                {qrCode && (
                  <img src={qrCode} alt="Generated QR Code" className="w-full h-full object-contain" />
                )}
              </div>
              <p className="text-center text-gray-400">
                {qrCode ? 'Your QR Code' : 'Your QR Code will appear here'}
              </p>
              <motion.div
                className="absolute inset-0 border-2 border-purple-500 rounded-lg"
                animate={{
                  borderColor: ['#A855F7', '#3B82F6', '#A855F7'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.div>
          ) : (
            <motion.div
              className="bg-gray-800 p-8 rounded-lg shadow-lg relative overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                type="file"
                accept="image/*"
                className="mb-4 bg-gray-700 border-gray-600 text-white"
                placeholder="Upload QR Code image"
                onChange={handleFileUpload}
              />
              <Button
                onClick={handleScan}
                className={`w-full py-2 px-4 rounded-lg ${
                  isScanning
                    ? 'bg-cyan-700 cursor-not-allowed'
                    : 'bg-cyan-600 hover:bg-cyan-700'
                } transition-colors duration-300`}
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  'Scan QR Code'
                )}
              </Button>
              {isScanning && (
                <motion.div
                  className="absolute inset-0 bg-cyan-500 opacity-20"
                  animate={{
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {qrCode && (
                <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                  <p className="text-cyan-300">Scanned Result:</p>
                  <p className="text-white break-all">{qrCode}</p>
                </div>
              )}
              <motion.div
                className="absolute inset-0 border-2 border-cyan-500 rounded-lg"
                animate={{
                  borderColor: ['#06B6D4', '#3B82F6', '#06B6D4'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}