# AR Product React Application

A modern React application for uploading 3D models and viewing them in augmented reality. Built with React, Three.js, and WebXR for cross-platform AR experiences.

## Features

- 📤 **3D Model Upload**: Drag-and-drop interface for GLB/GLTF files
- 🎨 **Interactive 3D Viewer**: Full-featured viewer with zoom, rotate, and pan controls
- 📱 **QR Code Generation**: Create scannable QR codes for instant AR access
- 🥽 **Augmented Reality**: View models in your real-world environment on mobile devices
- ✨ **Premium UI**: Modern dark theme with glassmorphism and smooth animations
- 💾 **Local Storage**: Models persist across sessions

## AR Capabilities

The AR experience supports:
- **iOS**: Safari with ARKit (iOS 12+)
- **Android**: Chrome with ARCore (Android 7.0+)

AR Controls:
- 👆 Tap to place model on detected surfaces
- 🤏 Pinch to scale
- 🔄 Drag to rotate
- 📍 Touch and hold to move
- 🚶 Walk around to view from all angles

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:3000`

## Usage

### 1. Upload a Model
- Drag and drop a GLB or GLTF file onto the upload area
- Or click to browse and select a file
- Maximum file size: 50MB

### 2. View in 3D
- Click "View 3D" on any model card
- Use mouse controls:
  - Left click + drag to rotate
  - Scroll to zoom
  - Right click + drag to pan

### 3. Generate QR Code
- Click the QR code icon on any model card
- Download the QR code as PNG
- Share with mobile users

### 4. Experience in AR
- Scan the QR code with a mobile device
- Or click "AR View" to open directly on mobile
- Tap "View in AR" to launch the AR experience
- Point camera at a flat surface
- Tap to place the model
- Use gestures to interact

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ModelUpload.tsx  # File upload component
│   ├── ModelCard.tsx    # Model gallery card
│   ├── QRCodeModal.tsx  # QR code display modal
│   └── Scene3D.tsx      # Three.js 3D scene
├── pages/              # Application pages
│   ├── HomePage.tsx    # Landing page with upload
│   ├── ViewerPage.tsx  # 3D model viewer
│   └── ARViewerPage.tsx # AR viewer for mobile
├── store/              # State management
│   └── modelStore.ts   # Zustand store
├── types/              # TypeScript types
│   └── types.ts        # Type definitions
├── App.tsx             # Main app component
├── main.tsx            # Application entry
└── index.css           # Global styles
```

## Technologies

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Three.js**: 3D rendering
- **React Three Fiber**: React renderer for Three.js
- **@google/model-viewer**: WebXR AR component
- **Zustand**: State management
- **QRCode.react**: QR code generation

## Browser Support

- **Desktop**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile AR**: 
  - iOS Safari 12+ (ARKit)
  - Android Chrome (ARCore enabled devices)

## Tips

- Use optimized GLB files for best performance
- Models are automatically centered and scaled
- QR codes link directly to the AR viewer
- Models persist in browser localStorage
- For best AR experience, use well-lit environments with flat surfaces

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
