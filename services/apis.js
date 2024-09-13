



// Function to fetch media list
export const getMedias = async () => {
    try {
        const response = await fetch("https://react-native-backend-ikg4.onrender.com/api/medialist");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching media list:", error);
        throw error;
    }
};

// Function to fetch tags
export const getTags = async () => {
    try {
        const response = await fetch("https://react-native-backend-ikg4.onrender.com/api/tags");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        throw error;
    }
};


// Function to fetch update status
    export const doUpdate = async () => {
        try {
            const response = await fetch("https://react-native-backend-ikg4.onrender.com/api/doupdate");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // If the data is a boolean directly:
            return data.updateAvailable; // Adjust based on your response
        } catch (error) {
            console.error("Error checking for updates:", error);
            throw error;
        }
    };



