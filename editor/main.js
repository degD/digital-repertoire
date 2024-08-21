
document.querySelectorAll(".chord-checkbox").forEach(b => {

    // A line is selected as a chord line
    b.addEventListener("click", evt => {


        if (b.parentNode["style"]["background"] == "")
            b.parentNode["style"]["background"] = "lightblue";
        else 
            b.parentNode["style"]["background"] = "";
    });
});


