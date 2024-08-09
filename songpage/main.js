
console.log("Hello world!");

let capo = 0, transpose = 0, size = 100;
const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

document.querySelector(".capoplus").addEventListener("click", e => {
    capo += 1;
    document.querySelector(".capo").textContent = `Capo: ${capo}`;
});
document.querySelector(".capominus").addEventListener("click", e => {
    capo -= 1;
    document.querySelector(".capo").textContent = `Capo: ${capo}`;
});

// document.querySelector(".transposeplus").addEventListener("click", e => {
//     transpose += 1;
//     document.querySelector(".transpose")
//         .textContent = `Transpose: ${scale.at(transpose%scale.length)}`;

//     document.querySelectorAll(".chord").forEach(chord => {
//         chord.textContent = chord.textContent.replace()
//     })
// });
// document.querySelector(".transposeminus").addEventListener("click", e => {
//     transpose -= 1;
//     document.querySelector(".transpose")
//         .textContent = `Transpose: ${scale.at(transpose%scale.length)}`;
// });