console.log("Arnav's content script is currently running.")

function updateDOM(data) {
    const element = document.createElement('div');
    element.textContent = "HI MY NAME IS ARNAV";  // Static string, no need for JSON.stringify

    // Style your element here
    element.style.position = 'fixed'; // or 'absolute'
    element.style.top = '10px';  // distance from the top of the viewport
    element.style.right = '10px'; // distance from the right of the viewport
    element.style.backgroundColor = 'white'; // So text is readable
    element.style.border = '1px solid black'; // Gives a border
    element.style.padding = '5px';  // Some padding around the text
    element.style.zIndex = '1000'; // Ensure it's above other elements

    document.body.appendChild(element);
}


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

function addCustomBoxToContests() {
    // Select all rows in the contest table by a distinctive attribute like 'data-contestid'
    const contestRows = document.querySelectorAll('tr[data-contestid]');

    chrome.storage.local.get('codeforcesData', function(result){
        if (result.codeforcesData) 
        {
            let iterator = 0;
            const data = result.codeforcesData;
            contestRows.forEach(row => 
            {
                // Assuming the first 'td' element is the one containing the contest name
                const contestNameCell = row.querySelector('td');

                // Create a new div element for the custom box
                const customBox = document.createElement('div');

                for (let loopIterator = 0; loopIterator < result.codeforcesData[iterator].length; loopIterator++)
                {
                    customBox.textContent = result.codeforcesData[iterator][loopIterator]['name']; // Add your custom text or any other elements here
                    
                    customBox.style.backgroundColor = '#f0f0f0'; // Example: set a light grey background
                    customBox.style.marginLeft = '10px'; // Add some left margin to separate from the contest name
                    customBox.style.padding = '5px'; // Add some padding inside the box
                    customBox.style.display = 'inline-block'; // Ensure the box flows in line with the text

                    // Append the custom box to the contest name cell
                    if (contestNameCell) {
                        contestNameCell.appendChild(customBox);
                    }
                }

                iterator = iterator + 1;
            });
        }
        else 
        {
            console.log("Data not loaded from local.")  // error message
        }
    })
}

// Run the function when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCustomBoxToContests);
} else {
    addCustomBoxToContests(); // If the DOM is already ready, we can execute the function immediately
}
