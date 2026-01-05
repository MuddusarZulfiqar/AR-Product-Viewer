import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModelStore } from '../store/modelStore';
import Scene3D from '../components/Scene3D';
import QRCodeModal from '../components/QRCodeModal';
import './ViewerPage.css';

const ViewerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getModel = useModelStore((state) => state.getModel);
  const [showQR, setShowQR] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const model = id ? getModel(id) : undefined;

  if (!model) {
    return (
      <div className="viewer-page">
        <div className="viewer-error">
          <h2>Model not found</h2>
          <p>The requested model could not be found.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="viewer-page">
      {/* Header */}
      <header className="viewer-header">
        <div className="viewer-header-content">
          <button onClick={() => navigate('/')} className="btn btn-ghost btn-icon" title="Back">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <h1 className="viewer-title">{model.name}</h1>

          <div className="viewer-actions">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`btn btn-secondary btn-sm ${autoRotate ? 'active' : ''}`}
              title="Toggle Auto Rotate"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {autoRotate ? 'Auto' : 'Manual'}
            </button>

            <button onClick={() => setShowQR(true)} className="btn btn-primary btn-sm">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              View in AR
            </button>
          </div>
        </div>
      </header>

      {/* 3D Canvas */}
      <div className="viewer-canvas">
        <Scene3D modelUrl={model.url} autoRotate={autoRotate} />
      </div>

      {/* Controls Info */}
      <div className="viewer-controls-info">
        <div className="control-item">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span>Left click + drag to rotate</span>
        </div>
        <div className="control-item">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          <span>Scroll to zoom</span>
        </div>
        <div className="control-item">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span>Right click + drag to pan</span>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <QRCodeModal
          modelId={model.id}
          modelName={model.name}
          onClose={() => setShowQR(false)}
        />
      )}
    </div>
  );
};

export default ViewerPage;
