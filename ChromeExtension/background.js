async function fetchDataFromPythonServer() {
    try {
        const response = await fetch('http://127.0.0.1:5000/getdata');
        const data = await response.json();
        
        chrome.storage.local.set({ codeforcesData: data }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error setting the data:", chrome.runtime.lastError);
            } else {
                console.log("Data stored successfully");
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch data or set it to be called on specific events
fetchDataFromPythonServer();

// Optionally, you might want to fetch new data at regular intervals
// setInterval(fetchDataFromPythonServer, 1000 * 60 * 60); // e.g., every hour
