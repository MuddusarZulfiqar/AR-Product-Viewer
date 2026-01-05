import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './QRCodeModal.css';

interface QRCodeModalProps {
  modelId: string;
  modelName: string;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ modelId, modelName, onClose }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  
  // Generate AR viewer URL
  const arUrl = `${window.location.origin}/ar/${modelId}`;

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    // Convert SVG to canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      // Download as PNG
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${modelName}-qr-code.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">AR QR Code</h2>
          <button onClick={onClose} className="btn btn-ghost btn-icon" title="Close">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="qr-code-container" ref={qrRef}>
          <QRCodeSVG
            value={arUrl}
            size={256}
            level="H"
            includeMargin={true}
            bgColor="#ffffff"
            fgColor="#0a0e1a"
          />
        </div>

        <div className="modal-body">
          <p className="modal-description">
            Scan this QR code with your mobile device to view <strong>{modelName}</strong> in augmented reality.
          </p>

          <div className="url-display">
            <code>{arUrl}</code>
          </div>

          <div className="modal-actions">
            <button onClick={handleDownload} className="btn btn-primary">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download QR Code
            </button>
            <button onClick={onClose} className="btn btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
