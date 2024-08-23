

// Empty line as a template
const emptyLine = document.querySelector(".line-container").cloneNode(true);
emptyLine.querySelector("p.line-text").textContent = "";


function readFromEditor() {

    const song = [];
    document.querySelectorAll(".line-container").forEach(l => {

        let type = "lyrics";
        if (l.querySelector(".chord-checkbox").checked) type = "chord";
        song.push({"type": type, "text": l.querySelector("p.line-text").textContent});
    });

    return song;
}


function removeAllLines() {
    document.querySelectorAll(".line-container").forEach(l => l.remove());
}


function loadFromJsonToEditor(songJSON, songName) {

    removeAllLines();
    document.querySelector(".song-name").textContent = songName;
    for (const l of songJSON) {

        const newLine = emptyLine.cloneNode(true);
        newLine.querySelector("p.line-text").textContent = l["text"];
        if (l["type"] == "chord") {
            newLine.querySelector(".chord-checkbox").checked = "true";
            newLine["style"]["background"] = "lightblue";
        }

        console.log(l);
        document.querySelector("body").appendChild(newLine);
    }
}


// true if both same
function compareSongs(song1, song2) {

    let i = 0;
    while (true) {
        let l1 = song1.at(i);
        let l2 = song2.at(i);
        if (l1 == undefined && l2 == undefined) return true;
        else if (l1 == undefined || l2 == undefined) return false;
        else if (l1["text"] != l2["text"]) return false;
        i += 1;
    }
}


document.querySelectorAll(".chord-checkbox").forEach(b => {

    // A line is selected as a chord line
    b.addEventListener("click", evt => {

        if (b.parentNode.parentNode["style"]["background"] == "")
            b.parentNode.parentNode["style"]["background"] = "lightblue";
        else 
            b.parentNode.parentNode["style"]["background"] = "";
    });
});


document.querySelector(".save").addEventListener("click", evt => {

    // Save song
    console.log(readFromEditor());
});


let songCurrentState, songPreviousState = readFromEditor();
const states = [songPreviousState];
setInterval(() => {

    songCurrentState = readFromEditor();
    if (!compareSongs(songCurrentState, songPreviousState)) {
        console.log("Something changed!");
        states.push(songCurrentState);
    } else {
        console.log("Same and boring");
    }
    
    songPreviousState = songCurrentState;

}, 1000);


document.querySelector(".undo").addEventListener("click", evt => {


});