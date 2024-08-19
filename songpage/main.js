
let capo = 0, transpose = 0, size = 100;
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const song = document.querySelector("pre.song");


// Operation buttons
const capoplus = document.querySelector(".capoplus");
const capominus = document.querySelector(".capominus");
const transposeplus = document.querySelector(".transposeplus");
const transposeminus = document.querySelector(".transposeminus");
const resizeplus = document.querySelector(".resizeplus");
const resizeminus = document.querySelector(".resizeminus");


// Operation labels
const capoDiv = document.querySelector(".capo");
const transposeDiv = document.querySelector(".transpose");
const resizeDiv = document.querySelector(".resize");


resizeplus.addEventListener("click", evt => {

    size += 20;
    resizeDiv.textContent = `Size: ${size}%`;
    song["style"]["font-size"] = `${size/100}rem`;
});
resizeminus.addEventListener("click", evt => {

    size -= 20;
    resizeDiv.textContent = `Size: ${size}%`;
    song["style"]["font-size"] = `${size/100}rem`;
});





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


/**
 * Transpose a given chord by the amount of transposeAmount
 * @param  {String} chord The chord
 * @param  {Number} transposeAmount A positive or negative integer
 * @return {String} Transposed chord
 */
function transposeChord(chord, transposeAmount) {

    let tNote, tChord;
    scale.forEach((note, i) => {

        if (chord.startsWith(note)) {
            tNote = scale.at((i + transposeAmount) % scale.length);
            tChord = tNote + chord.slice(note.length);
        }
    });

    return tChord;
}


function transposeChordLine(chordLine, transposeAmount) {

    const chordsAndIndexes = [];


    let chord = "";
    let startingIndex = 0;
    let lookingForChords = true;
    [...chordLine].forEach((c, i) => {

        console.log(c, i);
        if (c != " " && lookingForChords) {

            startingIndex = i;
            lookingForChords = false;
            chord = c;
        }
        else if (c != " ") {

            chord += c;
        }
        else if (c == " " && !lookingForChords) {

            lookingForChords = true;
            chordsAndIndexes.push([chord, startingIndex]);
        }
    });
    if (!lookingForChords)
        chordsAndIndexes.push([chord, startingIndex]);


    console.log(chordsAndIndexes);


    let tLine = "";
    chordsAndIndexes.forEach(group => {

        const chord = group[0];
        const startingIndex = group[1];

        tLine += " ".repeat(startingIndex - tLine.length);
        tLine += transposeChord(chord, transposeAmount);
    });


    return tLine;
}


function transposeSong(songJSON, transposeAmount) 
{

    const transposedSongJSON = [];

    for (const line of songJSON) {
        
        if (line["type"] == "chord") {

            const tLineText = transposeChordLine(line["text"], transposeAmount);
            transposedSongJSON.push({"type": "chord", "text": tLineText});
        }
        else 
        transposedSongJSON.push({"type": "lyrics", "text": line["text"]});
    
    };
    console.log(transposedSongJSON)
    return transposedSongJSON;
}


// Load songName from the localStorage, when sent from the search page
const songName = localStorage.getItem("songName");
console.log(localStorage);


// Load song JSON
loadSongJSON(songName).then(j => {
    
    // Initial song display
    displaySongFromJSON(songName, j);


    // Transpose operation depends song JSON data
    transposeplus.addEventListener("click", evt => {

        transpose += 1;
        transposeDiv.textContent = `Transpose: ${scale.at(transpose%scale.length)}`
        displaySongFromJSON(songName, transposeSong(j, transpose));
    });
    transposeminus.addEventListener("click", evt => {
    
        transpose -= 1;
        transposeDiv.textContent = `Transpose: ${scale.at(transpose%scale.length)}`
        displaySongFromJSON(songName, transposeSong(j, transpose));
    });
});