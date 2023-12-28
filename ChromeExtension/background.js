async function fetchDataFromPythonServer() {
    try {
        const response = await fetch('http://127.0.0.1:5000/getdata')
        const data = await response.json();
        
        chrome.storage.local.set({codeforcesData : data});
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}