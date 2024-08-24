

function replaceLines(line1, line2) {

    let temp;

    try {

        // Replace line texts
        temp = line1.querySelector("pre.line-text").textContent;
        line1.querySelector("pre.line-text").textContent = line2.querySelector("pre.line-text").textContent;
        line2.querySelector("pre.line-text").textContent = temp;
        

        // Replace chord checkboxes
        temp = line1.querySelector(".chord-checkbox").checked;
        line1.querySelector(".chord-checkbox").checked = line2.querySelector(".chord-checkbox").checked;
        line2.querySelector(".chord-checkbox").checked = temp;


        // Replace also background colors
        if (line1.querySelector(".chord-checkbox").checked) 
            line1["style"]["background"] = "lightblue";
        else 
            line1["style"]["background"] = "";

        if (line2.querySelector(".chord-checkbox").checked) 
            line2["style"]["background"] = "lightblue";
        else 
            line2["style"]["background"] = "";

    } catch {

        return;
    }
}


function createNewSongLine() {

    const line = document.querySelector(".hidden.line-container").cloneNode(true);
    line.querySelector("pre.line-text").textContent = "";
    line.classList.remove("hidden");

    line.querySelector(".up").addEventListener("click", evt => {

        try {
            const prevLine = line.previousSibling;
            replaceLines(line, prevLine);
        } catch { return };
    });

    line.querySelector(".down").addEventListener("click", evt => {

        try {
            const nextLine = line.nextSibling;
            replaceLines(line, nextLine);
        } catch { return };
    });

    line.querySelector(".new-line").addEventListener("click", evt => {

        const newLine = createNewSongLine();
        line.insertAdjacentElement("afterend", newLine);
    });

    line.querySelector(".delete").addEventListener("click", evt => {

        line.remove();
    });
    
    return line;
}


function readFromEditor() {

    const song = [];
    document.querySelectorAll(".line-container").forEach(l => {

        let type = "lyrics";
        if (l.querySelector(".chord-checkbox").checked) type = "chord";
        song.push({"type": type, "text": l.querySelector("pre.line-text").textContent});
    });

    return song;
}


function readSongName() {
    return document.querySelector(".song-name").textContent;
}


function removeAllLines() {
    document.querySelectorAll(":not(.hidden).line-container").forEach(l => l.remove());
}


function loadFromJsonToEditor(songJSON, songName) {

    removeAllLines();
    document.querySelector(".song-name").textContent = songName;
    for (const l of songJSON) {

        const newLine = createNewSongLine();
        newLine.querySelector("pre.line-text").textContent = l["text"];
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
        // console.log("Something changed!");
        states.push(songCurrentState);
    } else {
        // console.log("Same and boring");
    }
    
    songPreviousState = songCurrentState;

}, 1000);


document.querySelector(".undo").addEventListener("click", evt => {


});


// Add event listeners for UP buttons
document.querySelectorAll("button.up").forEach(b => b.addEventListener("click", evt => {

    const line = b.parentNode.parentNode;
    const prevLine = line.previousSibling.previousSibling;
    let temp;


    try {

        // Replace line texts
        temp = line.querySelector("pre.line-text").textContent;
        line.querySelector("pre.line-text").textContent = prevLine.querySelector("pre.line-text").textContent;
        prevLine.querySelector("pre.line-text").textContent = temp;
        

        // Replace chord checkboxes
        temp = line.querySelector(".chord-checkbox").checked;
        line.querySelector(".chord-checkbox").checked = prevLine.querySelector(".chord-checkbox").checked;
        prevLine.querySelector(".chord-checkbox").checked = temp;


        // Replace also background colors
        if (line.querySelector(".chord-checkbox").checked) 
            line["style"]["background"] = "lightblue";
        else 
            line["style"]["background"] = "";

        if (prevLine.querySelector(".chord-checkbox").checked) 
            prevLine["style"]["background"] = "lightblue";
        else 
            prevLine["style"]["background"] = "";

    } catch {

        return;
    }
}));


// Add event listeners for DOWN buttons
document.querySelectorAll("button.down").forEach(b => b.addEventListener("click", evt => {

    const line = b.parentNode.parentNode;
    const nextLine = line.nextSibling.nextSibling;
    let temp;


    try {

        // Replace line texts
        temp = line.querySelector("pre.line-text").textContent;
        line.querySelector("pre.line-text").textContent = nextLine.querySelector("pre.line-text").textContent;
        nextLine.querySelector("pre.line-text").textContent = temp;
        

        // Replace chord checkboxes
        temp = line.querySelector(".chord-checkbox").checked;
        line.querySelector(".chord-checkbox").checked = nextLine.querySelector(".chord-checkbox").checked;
        nextLine.querySelector(".chord-checkbox").checked = temp;


        // Replace also background colors
        if (line.querySelector(".chord-checkbox").checked) 
            line["style"]["background"] = "lightblue";
        else 
            line["style"]["background"] = "";

        if (nextLine.querySelector(".chord-checkbox").checked) 
            nextLine["style"]["background"] = "lightblue";
        else 
            nextLine["style"]["background"] = "";

    } catch {

        return;
    }
}));


// Load song from local storage
const song = JSON.parse(localStorage.getItem("songJSON"));
const songName = localStorage.getItem("songName");
if (song && songName)
    loadFromJsonToEditor(song, songName);
else
    console.log("Direct load!!!");


// Make save button work
document.querySelector(".save").addEventListener("click", evt => {

    const name = readSongName();
    const song = readFromEditor();
    
    
});