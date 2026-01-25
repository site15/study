import { marked } from "marked";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";
import { useDocumentCompletion } from "../hooks/useDocumentCompletion";
import {
    getDocumentStructure,
    loadDocumentContent,
} from "../utils/documentLoader";
import "./DocumentReader.css";

const DocumentReader = () => {
  const { folder, filename } = useParams();
  const [content, setContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [documentTitle, setDocumentTitle] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } =
    useBookmarks();
  const {
    isDocumentCompleted,
    markDocumentAsCompleted,
    markDocumentAsUncompleted,
    getCompletionData,
  } = useDocumentCompletion();

  useEffect(() => {
    // Get document title from structure
    const structure = getDocumentStructure();
    const folderDocs = structure[folder] || [];
    const doc = folderDocs.find((d) => d.id === filename);
    if (doc) {
      setDocumentTitle(doc.title);
    }
  }, [folder, filename]);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        setLoading(true);

        // Load the actual document content
        const docContent = await loadDocumentContent(folder, filename);
        setContent(docContent);

        // Convert markdown to HTML
        const html = marked(docContent);
        setHtmlContent(html);
      } catch (error) {
        console.error("Error loading document:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [folder, filename]);

  // Handle hash changes for bookmark navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const elementId = window.location.hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            // Highlight the element
            element.style.backgroundColor = "#e3f2fd";
            element.style.padding = "10px";
            element.style.borderRadius = "4px";
            element.style.border = "2px solid #2196f3";
            setTimeout(() => {
              element.style.backgroundColor = "";
              element.style.padding = "";
              element.style.borderRadius = "";
              element.style.border = "";
            }, 2000);
          }
        }, 100);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Handle scroll restoration and hash changes for bookmark navigation
  useEffect(() => {
    // Check for bookmark scroll restoration
    const bookmarkType = sessionStorage.getItem("bookmarkType");
    const bookmarkScrollPosition = sessionStorage.getItem(
      "bookmarkScrollPosition"
    );
    const bookmarkParagraphId = sessionStorage.getItem("bookmarkParagraphId");

    if (bookmarkType === "page" && bookmarkScrollPosition) {
      // Restore page scroll position
      const scrollPos = parseInt(bookmarkScrollPosition, 10);
      console.log("Restoring scroll position to:", scrollPos);

      // Wait for content to load, then scroll
      const scrollToPosition = () => {
        if (document.querySelector(".document-content")) {
          window.scrollTo({
            top: scrollPos,
            behavior: "smooth",
          });
          // Clear sessionStorage
          sessionStorage.removeItem("bookmarkType");
          sessionStorage.removeItem("bookmarkScrollPosition");
        } else {
          // Retry if content not loaded yet
          setTimeout(scrollToPosition, 100);
        }
      };

      setTimeout(scrollToPosition, 300);
    } else if (bookmarkType === "paragraph" && bookmarkParagraphId) {
      // Scroll to paragraph element
      console.log("Scrolling to paragraph:", bookmarkParagraphId);

      const scrollToElement = () => {
        const element = document.getElementById(bookmarkParagraphId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Highlight the element
          element.style.backgroundColor = "#fff3cd";
          element.style.padding = "10px";
          element.style.borderRadius = "4px";
          element.style.border = "2px solid #ffc107";
          setTimeout(() => {
            element.style.backgroundColor = "";
            element.style.padding = "";
            element.style.borderRadius = "";
            element.style.border = "";
          }, 2000);
          // Clear sessionStorage
          sessionStorage.removeItem("bookmarkType");
          sessionStorage.removeItem("bookmarkParagraphId");
        } else {
          // Retry if element not found yet
          setTimeout(scrollToElement, 100);
        }
      };

      setTimeout(scrollToElement, 300);
    }

    // Handle hash changes
    const handleHashChange = () => {
      if (window.location.hash) {
        const elementId = window.location.hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [htmlContent]);

  const handlePageBookmark = () => {
    console.log("DocumentReader: handlePageBookmark called");
    console.log("DocumentReader: Current folder:", folder);
    console.log("DocumentReader: Current filename:", filename);
    console.log("DocumentReader: Current bookmarks:", bookmarks);

    // Get current scroll position
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    // Check if bookmark already exists for this page
    const existingBookmark = bookmarks.find(
      (b) => b.folderId === folder && b.filename === filename
    );

    console.log("DocumentReader: Existing bookmark found:", existingBookmark);

    if (existingBookmark) {
      // Update existing bookmark with new scroll position
      console.log(
        "DocumentReader: Removing existing bookmark:",
        existingBookmark.id
      );
      removeBookmark(existingBookmark.id);
    }

    // Add new page bookmark
    const bookmarkData = {
      folderId: folder,
      filename: filename,
      scrollPosition: scrollPosition,
      folderName: folder?.replace(/^\d+_/, "").replace(/_/g, " ") || "",
      documentTitle: documentTitle || filename?.replace(".md", "") || "",
      timestamp: Date.now(),
      type: "page",
    };

    console.log("DocumentReader: Adding new bookmark with data:", bookmarkData);
    addBookmark(bookmarkData);
  };

  const isPageBookmarked = () => {
    return bookmarks.some(
      (b) =>
        b.folderId === folder && b.filename === filename && b.type === "page"
    );
  };

  const handleDocumentCompletion = () => {
    console.log("DocumentReader: handleDocumentCompletion called");
    console.log(
      "DocumentReader: Current completion status:",
      isDocumentCompleted(folder, filename)
    );
    console.log("DocumentReader: Folder:", folder, "Filename:", filename);

    if (isDocumentCompleted(folder, filename)) {
      console.log("DocumentReader: Marking as uncompleted");
      markDocumentAsUncompleted(folder, filename);
      // Dispatch storage event to notify other tabs/components
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "study-docs-completion",
          oldValue: localStorage.getItem("study-docs-completion"),
          newValue: JSON.stringify(getCompletionData()),
        })
      );
    } else {
      console.log("DocumentReader: Marking as completed");
      markDocumentAsCompleted(folder, filename);
      // Dispatch storage event to notify other tabs/components
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "study-docs-completion",
          oldValue: localStorage.getItem("study-docs-completion"),
          newValue: JSON.stringify(getCompletionData()),
        })
      );
    }

    setRefreshKey((prev) => prev + 1);
  };

  const isCompleted = isDocumentCompleted(folder, filename);
  console.log(
    "DocumentReader: Render - isCompleted:",
    isCompleted,
    "for",
    folder,
    "/",
    filename
  );

  const folderNumber = folder?.match(/^\d+/)?.[0] || "";
  const folderNameRaw = folder?.replace(/^\d+_/, "").replace(/_/g, " ") || "";
  const folderName = `${folderNumber}. ${
    folderNameRaw.charAt(0).toUpperCase() + folderNameRaw.slice(1)
  }`;

  if (loading) {
    return (
      <div className="document-reader">
        <div className="reader-loading">Загрузка документа...</div>
      </div>
    );
  }

  return (
    <div className="document-reader">
      <div className="reader-header">
        <Link to={`/document/${folder}`} className="back-button">
          ← Назад к {folderName}
        </Link>
        <h1>{documentTitle || filename?.replace(".md", "") || ""}</h1>
        <div className="doc-info">
          <span className="folder-name">{folderName}</span>
        </div>
      </div>

      {/* Floating bookmark button */}
      <button
        className={`floating-bookmark-btn ${
          isPageBookmarked() ? "bookmarked" : ""
        }`}
        onClick={handlePageBookmark}
      >
        {isPageBookmarked() ? "🔖 В закладках" : "📑 В закладки"}
      </button>

      <div className="reader-content">
        <div className="document-content">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>

        {/* Completion button at the bottom */}
        <div className="completion-section">
          <button
            className={`completion-btn ${isCompleted ? "completed" : ""}`}
            onClick={handleDocumentCompletion}
          >
            {isCompleted ? (
              <>
                <span className="check-icon">&#10003;</span>
                Отметить как непрочитанное
              </>
            ) : (
              <>
                <span className="check-icon">&#10003;</span>
                Ознакомился
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentReader;
