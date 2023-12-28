console.log("\nArnav's content script is currently running.\n")



chrome.storage.local.get('codeforcesData', function(result){
    if (result.codeforcesData) {
        const data = result.codeforcesData;
        console.log(data[0][0]['name']); // debugging
        updateDOM(data);
    }
    else
    {
        console.log("Data not loaded from local.")  // error message
    }
})

function updateDOM(data) {
    const element = document.createElement('div');
    element.textContent = JSON.stringify("HI MY NAME IS ARNAV");
    document.body.appendChild(element);
}