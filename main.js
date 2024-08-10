
const searchField = document.querySelector("#search-field");
const searchContainer = document.querySelector(".search");

fetch("songs.json")
    .then(file => file.json())
    .then(songs => searchField.addEventListener("input", evt => {

        const input = evt.target.value;
        console.log(`Searching "${input}"...`);

        for (const s of songs) {

            const songName = s.name;
            const inputIndex = songName.indexOf(input);

            if (inputIndex != -1) {

                console.log(`"${input}" in "${songName}"`);
            }
        }

    }))
    .catch(error => console.log(error));

console.log("Hello!");