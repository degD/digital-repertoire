

function readFromEditor() {

    const song = [];
    document.querySelectorAll(".line-container").forEach(l => {

        let type = "lyrics";
        if (l.querySelector(".chord-checkbox").checked) type = "chord";
        song.push({"type": type, "text": l.querySelector("p.line-text").textContent});
    });

    return song;
}


// true if both same
function compareSongs(song1, song2) {

    let i = 0;
    while (true) {
        let l1 = song1.at(i);
        let l2 = song2.at(i);
        if (l1 == undefined && l2 == undefined) return true;
        else if (l1["text"] != l2["text"]) return false;
        i += 1;
    }
}


document.querySelectorAll(".chord-checkbox").forEach(b => {

    // A line is selected as a chord line
    b.addEventListener("click", evt => {


        if (b.parentNode["style"]["background"] == "")
            b.parentNode["style"]["background"] = "lightblue";
        else 
            b.parentNode["style"]["background"] = "";
    });
});


document.querySelector(".save").addEventListener("click", evt => {

    // Save song
    console.log(readFromEditor());
});


// Check for updates at the editor every 5 seconds. 
// Save last 10 changes for undo/redo.
    let newSong, prevSong = readFromEditor();
    setInterval(() => {

        newSong = readFromEditor();
        if (!compareSongs(prevSong, newSong))
            console.log("Something changed!");
        else
            console.log("Same and boring");
        
        prevSong = newSong;

    }, 5000);