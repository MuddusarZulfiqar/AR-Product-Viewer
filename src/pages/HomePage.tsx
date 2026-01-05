import React from 'react';
import { useModelStore } from '../store/modelStore';
import ModelUpload from '../components/ModelUpload';
import ModelCard from '../components/ModelCard';
import './HomePage.css';

const HomePage: React.FC = () => {
  const models = useModelStore((state) => state.models);

  return (
    <div className="home-page">
      {/* Header */}
      <header className="hero">
        <div className="container">
          <div className="hero-content animate-fade-in">
            <h1 className="hero-title">
              AR Product Viewer
            </h1>
            <p className="hero-description">
              Upload your 3D models and experience them in augmented reality. 
              View models in your browser or scan QR codes to place them in your real-world environment.
            </p>
          </div>
        </div>
      </header>

      {/* Upload Section */}
      <section className="upload-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Upload 3D Model</h2>
            <p className="section-description">
              Support for GLB and GLTF file formats
            </p>
          </div>
          <ModelUpload />
        </div>
      </section>

      {/* Models Gallery */}
      {models.length > 0 && (
        <section className="gallery-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Your Models</h2>
              <p className="section-description">
                {models.length} {models.length === 1 ? 'model' : 'models'} uploaded
              </p>
            </div>
            <div className="models-grid">
              {models.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {models.length === 0 && (
        <section className="empty-state">
          <div className="container">
            <div className="empty-state-content">
              <svg className="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="empty-state-title">No models yet</h3>
              <p className="empty-state-description">
                Upload your first 3D model to get started with AR viewing
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card animate-fade-in">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="feature-title">Easy Upload</h3>
              <p className="feature-description">
                Drag and drop your GLB or GLTF files to get started instantly
              </p>
            </div>

            <div className="feature-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="feature-title">3D Viewer</h3>
              <p className="feature-description">
                Interactive 3D viewer with zoom, rotate, and pan controls
              </p>
            </div>

            <div className="feature-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="feature-title">QR Codes</h3>
              <p className="feature-description">
                Generate QR codes for instant AR access on mobile devices
              </p>
            </div>

            <div className="feature-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="feature-title">AR Experience</h3>
              <p className="feature-description">
                Place models in your space with full AR controls on mobile
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            Built with React, Three.js, and WebXR <a href="https://github.com/MuddusarZulfiqar/AR-Product-Viewer" target="_blank">Github Repo</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
