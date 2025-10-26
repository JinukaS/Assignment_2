// This interface defines the shape of our data object.
// Using a shared type definition like this is a great practice.
export interface SavedOutput {
    id: string;
    htmlContent: string;
    createdAt: string; // The backend sends a string, the frontend will parse it as a Date.
}

/**
 * A helper function to handle API errors more gracefully.
 * It tries to parse the JSON error message from the server.
 */
async function handleApiError(response: Response): Promise<Error> {
    const errorData = await response.json().catch(() => null); // Try to get error details
    const detailMessage = errorData?.details || "No additional details from server.";
    const errorMessage = `Failed request with status ${response.status}. Server says: "${detailMessage}"`;
    return new Error(errorMessage);
}

// ... (keep the existing saveOutput, getAllOutputs, getOutputById functions)

/**
 * Deletes a saved output by its unique ID.
 * @param id The ID of the output to delete.
 */
export const deleteOutput = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`/api/outputs/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw await handleApiError(response);
        }
    } catch (error) {
        console.error(`Service Error in deleteOutput for ID ${id}:`, error);
        throw error;
    }
};
/**
 * Saves a new HTML output to the backend.
 * @param htmlContent The HTML string to save.
 * @returns The newly saved output object.
 */
export const saveOutput = async (htmlContent: string): Promise<SavedOutput> | never => {
    try {
        const response = await fetch('/api/outputs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ htmlContent }),
        });

        if (!response.ok) {
            throw await handleApiError(response);
        }

        return await response.json();

    } catch (error) {
        console.error("Service Error in saveOutput:", error);
        throw error; // Re-throw the error for the component to catch
    }
};

/**
 * Retrieves a list of all saved outputs.
 * @returns An array of saved output objects.
 */
export const getAllOutputs = async (): Promise<SavedOutput[]> | never => {
    try {
        const response = await fetch('/api/outputs');

        if (!response.ok) {
            throw await handleApiError(response);
        }

        return await response.json();

    } catch (error) {
        console.error("Service Error in getAllOutputs:", error);
        throw error;
    }
};

/**
 * Retrieves a single saved output by its unique ID.
 * @param id The ID of the output to fetch.
 * @returns The saved output object, or null if not found.
 */
export const getOutputById = async (id: string): Promise<SavedOutput | null> | never => {
    try {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const response = await fetch(`${appUrl}/api/outputs/${id}`, {
            cache: 'no-cache',
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null; // This is an expected "not found" case, not an error.
            }
            throw await handleApiError(response);
        }

        return await response.json();

    } catch (error) {
        console.error(`Service Error in getOutputById for ID ${id}:`, error);
        throw error;
    }
};