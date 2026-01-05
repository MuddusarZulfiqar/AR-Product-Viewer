import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ViewerPage from './pages/ViewerPage';
import ARViewerPage from './pages/ARViewerPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/viewer/:id" element={<ViewerPage />} />
        <Route path="/ar/:id" element={<ARViewerPage />} />
      </Routes>
    </div>
  );
}

export default App;
