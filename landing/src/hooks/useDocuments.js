import { useState } from 'react';
import { getDocumentStructure } from '../utils/documentLoader';

// Get document structure from the loader
const DOCUMENT_STRUCTURE = getDocumentStructure();

export const useDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [loading] = useState(false);

    const getDocumentsByFolder = (folderId) => {
        const docs = DOCUMENT_STRUCTURE[folderId] || [];
        setDocuments(docs);
    };

    const getAllDocuments = () => {
        const allDocs = [];
        Object.entries(DOCUMENT_STRUCTURE).forEach(([folderId, docs]) => {
            docs.forEach(doc => {
                allDocs.push({
                    ...doc,
                    folderId,
                    folderName: folderId.replace(/^\d+_/, '').replace(/_/g, ' ')
                });
            });
        });
        return allDocs;
    };

    return {
        documents,
        loading,
        getDocumentsByFolder,
        getAllDocuments
    };
};