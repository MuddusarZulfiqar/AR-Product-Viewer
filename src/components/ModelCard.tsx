import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Model3D } from '../types/types';
import { useModelStore } from '../store/modelStore';
import QRCodeModal from './QRCodeModal';
import './ModelCard.css';

interface ModelCardProps {
  model: Model3D;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const navigate = useNavigate();
  const removeModel = useModelStore((state) => state.removeModel);
  const [showQR, setShowQR] = useState(false);

  const handleView3D = () => {
    navigate(`/viewer/${model.id}`);
  };

  const handleViewAR = () => {
    navigate(`/ar/${model.id}`);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${model.name}"?`)) {
      URL.revokeObjectURL(model.url);
      removeModel(model.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <>
      <div className="model-card animate-fade-in">
        <div className="model-card-preview">
          <div className="model-card-preview-placeholder">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>

        <div className="model-card-content">
          <h3 className="model-card-title">{model.name}</h3>
          <p className="model-card-date">{formatDate(model.uploadDate)}</p>

          <div className="model-card-actions">
            <button onClick={handleView3D} className="btn btn-primary btn-sm">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View 3D
            </button>

            <button onClick={handleViewAR} className="btn btn-secondary btn-sm">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              AR View
            </button>

            <button onClick={() => setShowQR(true)} className="btn btn-ghost btn-icon btn-sm" title="Generate QR Code">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </button>

            <button onClick={handleDelete} className="btn btn-ghost btn-icon btn-sm" title="Delete">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showQR && (
        <QRCodeModal
          modelId={model.id}
          modelName={model.name}
          onClose={() => setShowQR(false)}
        />
      )}
    </>
  );
};

export default ModelCard;
