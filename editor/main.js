

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


function readSongName() {
    return document.querySelector(".song-name").textContent;
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
        temp = line.querySelector("p.line-text").textContent;
        line.querySelector("p.line-text").textContent = prevLine.querySelector("p.line-text").textContent;
        prevLine.querySelector("p.line-text").textContent = temp;
        

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
        temp = line.querySelector("p.line-text").textContent;
        line.querySelector("p.line-text").textContent = nextLine.querySelector("p.line-text").textContent;
        nextLine.querySelector("p.line-text").textContent = temp;
        

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