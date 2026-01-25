import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocumentStructure, getFolderImage } from '../utils/documentLoader';
import { useDocumentCompletion } from '../hooks/useDocumentCompletion';
import './DocumentBrowser.css';

const DocumentBrowser = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getFolderCompletionStats } = useDocumentCompletion();

  useEffect(() => {
    // Get the actual document structure
    const structure = getDocumentStructure();
    const folderList = Object.entries(structure).map(([id, docs]) => {
      const number = id.match(/^\d+/)[0];
      const name = id.replace(/^\d+_/, '').replace(/_/g, ' ');
      const stats = getFolderCompletionStats(id, docs);
      return {
        id,
        name: `${number}. ${name.charAt(0).toUpperCase() + name.slice(1)}`,
        count: docs.length,
        completion: stats,
        image: getFolderImage(id)
      };
    });
    setFolders(folderList);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading documents...</div>;
  }

  return (
    <div className="document-browser">
      <h1>📚 Библиотека документации</h1>
      <p className="subtitle">Просматривайте и читайте техническую документацию с поддержкой закладок</p>
      
      <div className="folders-grid">
        {folders.map(folder => (
          <div key={folder.id} className={`folder-card ${folder.completion.isFullyCompleted ? 'completed' : ''}`}>
            <div className="folder-image-container">
              <img 
                src={folder.image} 
                alt={folder.name}
                className="folder-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="folder-header">
              <h2>{folder.name}</h2>
              <div className="folder-stats">
                <span className="doc-count">{folder.count} документов</span>
                {folder.completion.completed > 0 && (
                  <span className="folder-completion">
                    {folder.completion.completed}/{folder.completion.total} ✓
                  </span>
                )}
                {folder.completion.isFullyCompleted && (
                  <span className="folder-completed-badge">✓ Все прочитано</span>
                )}
              </div>
            </div>
            <Link to={`/document/${folder.id}`} className="browse-button">
              Просмотреть документы
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentBrowser;