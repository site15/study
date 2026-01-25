import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DocumentBrowser from './pages/DocumentBrowser';
import DocumentList from './pages/DocumentList';
import DocumentReader from './pages/DocumentReader';
import BookmarksPage from './pages/BookmarksPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DocumentBrowser />} />
            <Route path="/document/:folderId" element={<DocumentList />} />
            <Route path="/document/:folder/:filename" element={<DocumentReader />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
