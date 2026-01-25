import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDocuments } from '../hooks/useDocuments';
import { useDocumentCompletion } from '../hooks/useDocumentCompletion';
import './DocumentList.css';

const DocumentList = () => {
  const { folderId } = useParams();
  const { documents, loading, getDocumentsByFolder } = useDocuments();
  const { isDocumentCompleted, getFolderCompletionStats } = useDocumentCompletion();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const folderStats = getFolderCompletionStats(folderId, documents);

  useEffect(() => {
    if (folderId) {
      getDocumentsByFolder(folderId);
    }
  }, [folderId, getDocumentsByFolder]);

  // Debug: Log the documents to see what we're getting
  useEffect(() => {
    if (documents.length > 0) {
      console.log('Documents received:', documents);
    }
  }, [documents]);

  // Refresh completion stats when documents or folderId changes
  useEffect(() => {
    if (folderId && documents.length > 0) {
      console.log('Refreshing completion stats for folder:', folderId);
      // Force re-render to get fresh completion data
      setRefreshTrigger(prev => prev + 1);
    }
  }, [folderId, documents]);

  // Listen for localStorage changes (cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'study-docs-completion') {
        console.log('Detected completion data change, refreshing...');
        setRefreshTrigger(prev => prev + 1);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return <div className="loading">Loading documents...</div>;
  }

  const folderNumber = folderId?.match(/^\d+/)?.[0] || '';
  const folderNameRaw = folderId?.replace(/^\d+_/, '').replace(/_/g, ' ') || '';
  const folderName = `${folderNumber}. ${folderNameRaw.charAt(0).toUpperCase() + folderNameRaw.slice(1)}`;

  return (
    <div className="document-list">
      <div className="list-header">
        <Link to="/" className="back-button">← Назад в библиотеку</Link>
        <h1>{folderName}</h1>
        <div className="folder-stats">
          <p className="doc-count">{documents.length} документов доступно</p>
          <div className="completion-stats">
            <span className="completed-count">
              {folderStats.completed}/{folderStats.total} документов прочитано
            </span>
            {folderStats.isFullyCompleted && (
              <span className="folder-completed-badge">✓ Все документы прочитаны</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="documents-container">
        {documents.length === 0 ? (
          <div className="empty-state">
            <p>В этой папке не найдено документов.</p>
          </div>
        ) : (
          <div className="documents-grid">
            {documents.map((doc, index) => {
              const docNumber = doc.id.match(/^\d+/)?.[0] || (index + 1);
              const docTitle = `${docNumber}. ${doc.title}`;
              const isCompleted = isDocumentCompleted(folderId, doc.id);
              
              return (
                <Link 
                  key={doc.id}
                  to={`/document/${folderId}/${doc.id}`}
                  className={`document-card ${isCompleted ? 'completed' : ''}`}
                >
                  {doc.image && (
                    <div className="document-image-container">
                      <img 
                        src={doc.image} 
                        alt={doc.title}
                        className="document-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="doc-title">
                    {docTitle}
                    {isCompleted && <span className="doc-completed-badge">✓ Прочитано</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentList;