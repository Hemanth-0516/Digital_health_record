import React from 'react';
import { QrCode, Download, Copy } from 'lucide-react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value, size = 200 }) => {
  // Simple QR code placeholder - in production, use a proper QR code library
  const qrCodeDataURL = `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="white"/>
      <rect x="20" y="20" width="40" height="40" fill="black"/>
      <rect x="20" y="80" width="40" height="40" fill="black"/>
      <rect x="20" y="140" width="40" height="40" fill="black"/>
      <rect x="80" y="20" width="40" height="40" fill="black"/>
      <rect x="140" y="20" width="40" height="40" fill="black"/>
      <rect x="80" y="80" width="40" height="40" fill="white"/>
      <rect x="140" y="80" width="40" height="40" fill="black"/>
      <rect x="80" y="140" width="40" height="40" fill="black"/>
      <rect x="140" y="140" width="40" height="40" fill="white"/>
      <text x="${size/2}" y="${size-10}" text-anchor="middle" font-size="12" font-family="monospace" fill="black">${value}</text>
    </svg>
  `)}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      alert('QR code copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = `qr-${value}.svg`;
    link.href = qrCodeDataURL;
    link.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <QrCode className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Digital Health ID</h3>
        </div>
        
        <div className="flex justify-center">
          <img 
            src={qrCodeDataURL} 
            alt={`QR Code for ${value}`}
            className="border border-gray-200 rounded"
          />
        </div>
        
        <div className="text-sm text-gray-600">
          <p className="font-medium">ID: {value}</p>
          <p className="text-xs mt-1">Present this QR code at any healthcare facility</p>
        </div>
        
        <div className="flex justify-center space-x-3">
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            <Copy className="h-4 w-4" />
            <span>Copy ID</span>
          </button>
          <button
            onClick={downloadQR}
            className="flex items-center space-x-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;