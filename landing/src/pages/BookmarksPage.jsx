import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../hooks/useBookmarks';
import './BookmarksPage.css';

const BookmarksPage = () => {
  const { bookmarks, removeBookmark, clearAllBookmarks } = useBookmarks();
  
  console.log('BookmarksPage: Current bookmarks from hook:', bookmarks);
  console.log('BookmarksPage: localStorage contents:', localStorage.getItem('study-docs-bookmarks'));
  
  // Force refresh bookmarks from localStorage on mount
  useEffect(() => {
    console.log('BookmarksPage: Force refreshing bookmarks');
    const savedBookmarks = localStorage.getItem('study-docs-bookmarks');
    console.log('BookmarksPage: Force refresh - localStorage contents:', savedBookmarks);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRemoveBookmark = (bookmarkId) => {
    console.log('BookmarksPage: handleRemoveBookmark called with ID:', bookmarkId);
    if (window.confirm('Вы уверены, что хотите удалить эту закладку?')) {
      console.log('BookmarksPage: Confirmed removal, calling removeBookmark');
      removeBookmark(bookmarkId);
    } else {
      console.log('BookmarksPage: Removal cancelled by user');
    }
  };

  const handleClearAll = () => {
    console.log('BookmarksPage: handleClearAll called');
    if (window.confirm('Вы уверены, что хотите удалить ВСЕ закладки? Это действие нельзя отменить.')) {
      console.log('BookmarksPage: Confirmed clearing all bookmarks');
      clearAllBookmarks();
    } else {
      console.log('BookmarksPage: Clear all cancelled by user');
    }
  };

  return (
    <div className="bookmarks-page">
      <div className="bookmarks-header">
        <h1>🔖 Мои закладки</h1>
        <p>У вас сохранено {bookmarks.length} {bookmarks.length === 1 ? 'закладка' : bookmarks.length < 5 ? 'закладки' : 'закладок'}</p>
        
        {bookmarks.length > 0 && (
          <button 
            className="clear-all-btn"
            onClick={handleClearAll}
          >
            Удалить все закладки
          </button>
        )}
      </div>

      <div className="bookmarks-container">
        {bookmarks.length === 0 ? (
          <div className="empty-bookmarks">
            <div className="empty-icon">📑</div>
            <h2>Пока нет закладок</h2>
            <p>Начните читать документы и добавляйте страницы в закладки, чтобы видеть их здесь.</p>
            <Link to="/" className="browse-link">Просмотреть документы</Link>
          </div>
        ) : (
          <div className="bookmarks-list">
            {[...bookmarks].reverse().map((bookmark) => (
              <div key={bookmark.id} className="bookmark-item">
                <div className="bookmark-content">
                  <div className="bookmark-header">
                    <Link 
                      to={`/document/${bookmark.folderId}/${bookmark.filename}${bookmark.type === 'page' ? '' : '#' + bookmark.paragraphId}`}
                      className="bookmark-title"
                      onClick={(e) => {
                        // Handle navigation manually
                        e.preventDefault();
                        
                        if (bookmark.type === 'page') {
                          // For page bookmarks, navigate and restore scroll position
                          // Store scroll position in sessionStorage before navigation
                          sessionStorage.setItem('bookmarkScrollPosition', bookmark.scrollPosition || 0);
                          sessionStorage.setItem('bookmarkType', 'page');
                          window.location.href = `/document/${bookmark.folderId}/${bookmark.filename}`;
                        } else {
                          // For paragraph bookmarks, navigate with hash
                          sessionStorage.setItem('bookmarkType', 'paragraph');
                          sessionStorage.setItem('bookmarkParagraphId', bookmark.paragraphId);
                          window.location.href = `/document/${bookmark.folderId}/${bookmark.filename}#${bookmark.paragraphId}`;
                        }
                      }}
                    >
                      {bookmark.documentTitle}
                    </Link>
                    <span className="bookmark-folder">{bookmark.folderName}</span>
                    {bookmark.type === 'page' && (
                      <span className="bookmark-type">📄 Страница</span>
                    )}
                  </div>
                  
                  <div className="bookmark-text">
                    {bookmark.type === 'page' 
                      ? '📍 Сохранена позиция прокрутки' 
                      : `"${bookmark.paragraphText}"`}
                  </div>
                  
                  <div className="bookmark-footer">
                    <span className="bookmark-date">
                      Добавлено {formatDate(bookmark.timestamp)}
                    </span>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveBookmark(bookmark.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;