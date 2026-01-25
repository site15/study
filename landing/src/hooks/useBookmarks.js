import { useState, useEffect } from 'react';

const BOOKMARKS_KEY = 'study-docs-bookmarks';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    console.log('useBookmarks: Loading bookmarks from localStorage');
    const savedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
    console.log('useBookmarks: Raw localStorage data:', savedBookmarks);
    if (savedBookmarks) {
      try {
        const parsed = JSON.parse(savedBookmarks);
        console.log('useBookmarks: Parsed bookmarks:', parsed);
        setBookmarks(parsed);
      } catch (error) {
        console.error('useBookmarks: Failed to parse bookmarks:', error);
        setBookmarks([]);
      }
    } else {
      console.log('useBookmarks: No bookmarks found in localStorage');
      setBookmarks([]);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    console.log('useBookmarks: Saving bookmarks to localStorage:', bookmarks);
    if (bookmarks.length > 0) {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
      console.log('useBookmarks: Saved to localStorage successfully');
    }
  }, [bookmarks]);

  const addBookmark = (bookmarkData) => {
    const newBookmark = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...bookmarkData
    };
    
    console.log('useBookmarks: Adding new bookmark:', newBookmark);
    
    setBookmarks(prev => {
      const updated = [...prev, newBookmark];
      console.log('useBookmarks: Bookmarks after adding:', updated);
      // Save to localStorage immediately
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      console.log('useBookmarks: Saved to localStorage:', JSON.stringify(updated));
      return updated;
    });
    return newBookmark;
  };

  const removeBookmark = (bookmarkId) => {
    console.log('useBookmarks: Removing bookmark with ID:', bookmarkId);
    setBookmarks(prev => {
      const updated = prev.filter(b => b.id !== bookmarkId);
      console.log('useBookmarks: Bookmarks after remove:', updated);
      // Save to localStorage immediately
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      console.log('useBookmarks: Saved updated bookmarks to localStorage');
      return updated;
    });
  };

  const clearAllBookmarks = () => {
    console.log('useBookmarks: Clearing all bookmarks');
    setBookmarks([]);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([]));
    console.log('useBookmarks: Cleared localStorage');
  };

  const isBookmarked = (folderId, filename, paragraphId) => {
    return bookmarks.some(
      b => b.folderId === folderId && 
           b.filename === filename && 
           b.paragraphId === paragraphId
    );
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    clearAllBookmarks,
    isBookmarked
  };
};