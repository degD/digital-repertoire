
let capo = 0, transpose = 0, size = 100;
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];


const song = document.querySelector("pre.song");


async function loadSongJSON(songName) {

    const response = await fetch("../songs.json");
    const songs = await response.json();
    const songResponse = await fetch("../songs/" + songs[songName]);
    const songJSON = await songResponse.json();
    return songJSON;
}


function displaySongFromJSON(songName, songJSON) {


    // Set song name as title
    document.title = songName;
    document.querySelector("h1").textContent = songName;


    song.innerHTML = "";
    for (const line of songJSON) {
        
        console.log(line);

        if (line["type"] == "chord")
            song.innerHTML += `<span class="chord">${line["text"]}</span>\n`
        else
            song.innerHTML += `<span class="lyric">${line["text"]}</span>\n`
    };
}


loadSongJSON("lorem ipsum pizza").then(j => displaySongFromJSON("lorem ipsum pizza", j));