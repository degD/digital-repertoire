
const searchField = document.querySelector("#search-bar");
const searchResults = document.querySelector(".search-results");

fetch("songs.json")
    .then(file => file.json())
    .then(songs => searchField.addEventListener("input", evt => {

        // Reset results
        searchResults.innerHTML = "";

        const potentialNames = [];
        const input = evt.target.value;
        if (input == "") return; 

        console.log(`Searching "${input}"...`);

        // Iterate the song names and search the input as a substring
        for (const songName in songs) {

            const inputIndex = songName.indexOf(input);
            const resultCount = searchResults.childElementCount;
            
            // If input found and showing less than 9 results
            if (inputIndex != -1 && resultCount < 9) {

                // Create and append a result div
                const resultDiv = document.createElement("div");
                resultDiv.className = "result"; 
                resultDiv.innerHTML = songName
                if (resultCount % 2) {
                    resultDiv["style"]["background-color"] = "rgb(201, 201, 201)";
                } else {
                    resultDiv["style"]["background-color"] = "rgb(221, 221, 221)";
                }
                searchResults.appendChild(resultDiv);

                console.log(`"${input}" in "${songName}"`);
            }
        }


        // When clicked, make resultDiv take user to the song
        document.querySelectorAll(".result").forEach(resultDiv => {

            resultDiv.addEventListener("click", evt => {

                console.log(evt.target.textContent);
                localStorage.setItem("songName", evt.target.textContent);
                window.location.href = "./songpage/index.html"
            });
        });
    }))
    .catch(error => console.log(error));


// Open a blank page in editor
document.querySelector("#blank").addEventListener("click", evt => {

    localStorage.removeItem("songName");
    localStorage.removeItem("songJSON");
    window.location.href = "editor/index.html";
});


// Open file selector window by sending a CLICK to hidden input element
document.querySelector("#import-div").addEventListener("click", evt => {

    document.querySelector("#import").click();
});