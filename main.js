
const searchField = document.querySelector("#search-bar");
const searchResults = document.querySelector(".search-results");

fetch("songs.json")
    .then(file => file.json())
    .then(songs => searchField.addEventListener("input", evt => {

        searchResults.innerHTML = "";

        const potentialNames = [];
        const input = evt.target.value;
        console.log(`Searching "${input}"...`);

        for (const s of songs) {

            const songName = s.name;
            const inputIndex = songName.indexOf(input);
            const resultCount = searchResults.childElementCount;

            if (inputIndex != -1 && resultCount < 9) {

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



    }))
    .catch(error => console.log(error));

console.log("Hello!");