export const COMPLETION_KEY = 'study-docs-completion';

// Helper function to get completion data from localStorage
const getCompletionData = () => {
    try {
        const savedCompletion = localStorage.getItem(COMPLETION_KEY);
        if (savedCompletion) {
            const parsed = JSON.parse(savedCompletion);
            if (typeof parsed === 'object' && parsed !== null) {
                return parsed;
            }
        }
    } catch (error) {
        console.error('Failed to parse completion data:', error);
    }
    return {};
};

// Helper function to save completion data to localStorage
const saveCompletionData = (data) => {
    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(COMPLETION_KEY, jsonData);
        return true;
    } catch (error) {
        console.error('Failed to save completion data:', error);
        return false;
    }
};

export const useDocumentCompletion = () => {

    const markDocumentAsCompleted = (folderId, filename) => {
        const key = `${folderId}/${filename}`;
        const currentData = getCompletionData();
        const updatedData = {
            ...currentData,
            [key]: {
                completed: true,
                timestamp: Date.now()
            }
        };
        saveCompletionData(updatedData);
    };

    const markDocumentAsUncompleted = (folderId, filename) => {
        const key = `${folderId}/${filename}`;
        const currentData = getCompletionData();
        const updatedData = { ...currentData };
        delete updatedData[key];
        saveCompletionData(updatedData);
    };

    const isDocumentCompleted = (folderId, filename) => {
        const key = `${folderId}/${filename}`;
        const currentData = getCompletionData();
        return currentData[key]?.completed || false;
    };

    const getFolderCompletionStats = (folderId, documentsInFolder) => {
        const currentData = getCompletionData();
        let completedCount = 0;

        documentsInFolder.forEach(doc => {
            const key = `${folderId}/${doc.id}`;
            if (currentData[key]?.completed) {
                completedCount++;
            }
        });

        return {
            total: documentsInFolder.length,
            completed: completedCount,
            percentage: documentsInFolder.length > 0
                ? Math.round((completedCount / documentsInFolder.length) * 100)
                : 0,
            isFullyCompleted: completedCount === documentsInFolder.length && documentsInFolder.length > 0
        };
    };

    const clearAllCompletion = () => {
        saveCompletionData({});
    };

    return {
        markDocumentAsCompleted,
        markDocumentAsUncompleted,
        isDocumentCompleted,
        getFolderCompletionStats,
        clearAllCompletion,
        getCompletionData
    };
};