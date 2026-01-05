import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModelStore } from '../store/modelStore';
import './ARViewerPage.css';

// Extend JSX to include model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        ar?: boolean;
        'ar-modes'?: string;
        'camera-controls'?: boolean;
        'touch-action'?: string;
        'auto-rotate'?: boolean;
        'shadow-intensity'?: string;
        'exposure'?: string;
        'environment-image'?: string;
        loading?: string;
      }, HTMLElement>;
    }
  }
}

const ARViewerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getModel = useModelStore((state) => state.getModel);
  const modelViewerRef = useRef<HTMLElement>(null);

  const model = id ? getModel(id) : undefined;

  useEffect(() => {
    // Check if AR is supported
    const modelViewer = modelViewerRef.current as any;
    if (modelViewer) {
      modelViewer.addEventListener('ar-status', (event: any) => {
        if (event.detail.status === 'not-presenting') {
          console.log('AR session ended');
        }
      });
    }
  }, []);

  if (!model) {
    return (
      <div className="ar-viewer-page">
        <div className="ar-error">
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
    <div className="ar-viewer-page">
      {/* Header */}
      <header className="ar-header">
        <button onClick={() => navigate('/')} className="btn btn-ghost btn-icon" title="Back">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="ar-title">{model.name}</h1>
      </header>

      {/* Model Viewer */}
      <div className="ar-viewer-container">
        <model-viewer
          ref={modelViewerRef}
          src={model.url}
          alt={model.name}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          touch-action="pan-y"
          auto-rotate
          shadow-intensity="1"
          exposure="1"
          environment-image="neutral"
          loading="eager"
        >
          {/* AR Button Slot */}
          <button slot="ar-button" className="ar-button">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            View in AR
          </button>

          {/* Loading Indicator */}
          <div slot="poster" className="ar-loading">
            <div className="spinner"></div>
            <p>Loading 3D model...</p>
          </div>
        </model-viewer>
      </div>

      {/* Instructions */}
      <div className="ar-instructions">
        <div className="instruction-card animate-fade-in">
          <div className="instruction-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="instruction-content">
            <h3>1. Tap "View in AR"</h3>
            <p>Launch the AR experience on your device</p>
          </div>
        </div>

        <div className="instruction-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="instruction-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="instruction-content">
            <h3>2. Point at Surface</h3>
            <p>Aim your camera at a flat surface like a floor or table</p>
          </div>
        </div>

        <div className="instruction-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="instruction-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </div>
          <div className="instruction-content">
            <h3>3. Place & Interact</h3>
            <p>Tap to place, pinch to scale, drag to rotate and move</p>
          </div>
        </div>
      </div>

      {/* Device Compatibility Notice */}
      <div className="ar-compatibility">
        <p>
          <strong>AR Requirements:</strong> iOS 12+ with Safari or Android 7.0+ with Chrome
        </p>
      </div>
    </div>
  );
};

export default ARViewerPage;
