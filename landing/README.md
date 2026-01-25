# Study Docs Reader

A responsive web application for reading technical documentation with bookmark functionality.

## Features

- **Document Browser**: Browse through different documentation categories
- **Markdown Reader**: Clean, readable interface for technical documentation
- **Paragraph-Level Bookmarks**: Bookmark any paragraph with persistent storage
- **Bookmarks Management**: View, navigate to, and manage all your bookmarks
- **Responsive Design**: Works on both mobile and desktop devices
- **Local Storage**: All bookmarks are saved locally in your browser

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
cd landing
npm install
```

### Development
```bash
npm run dev
```
The application will be available at `http://localhost:5174`

### Build for Production
```bash
npm run build
```

## Usage

1. **Browse Documents**: Click on any category to see available documents
2. **Read Documents**: Click on a document to read it with markdown formatting
3. **Add Bookmarks**: Click the 📑 icon next to any paragraph to bookmark it
4. **View Bookmarks**: Navigate to the Bookmarks page to see all saved bookmarks
5. **Navigate from Bookmarks**: Click on any bookmark to jump directly to that paragraph

## Project Structure

```
landing/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation header
│   │   └── Navbar.css
│   ├── pages/               # Main application pages
│   │   ├── DocumentBrowser.jsx  # Main library view
│   │   ├── DocumentList.jsx     # Folder contents view
│   │   ├── DocumentReader.jsx   # Document reading view
│   │   └── BookmarksPage.jsx    # Bookmarks management
│   ├── hooks/               # Custom React hooks
│   │   ├── useDocuments.js  # Document data management
│   │   └── useBookmarks.js  # Bookmark functionality
│   ├── utils/               # Utility functions
│   │   └── documentLoader.js # Document content loading
│   ├── App.jsx             # Main application component
│   ├── App.css             # Global styles
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
└── index.html             # HTML template
```

## Technical Details

- **Framework**: React with Vite
- **Routing**: React Router DOM
- **Markdown Processing**: Marked.js
- **State Management**: React Hooks
- **Persistence**: localStorage
- **Styling**: CSS Modules approach

## Adding New Documents

To add new documents to the library:

1. Add the markdown file to the appropriate folder in `/docs`
2. Update the `getDocumentStructure()` function in `src/utils/documentLoader.js`
3. Add the document content to the `contentMap` in the same file

## Bookmark Features

- Bookmarks are stored locally in browser localStorage
- Each bookmark contains:
  - Document reference (folder and filename)
  - Paragraph identifier
  - Bookmark text excerpt
  - Timestamp
- Bookmarks persist between sessions
- Easy removal of individual bookmarks or all bookmarks

## Responsive Design

The application is fully responsive and works well on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS Safari, Android Chrome)
- Tablet devices

## Future Improvements

- Backend API integration for dynamic document loading
- User accounts and cloud synchronization
- Search functionality within documents
- Dark mode theme
- Export bookmarks feature
- Document progress tracking