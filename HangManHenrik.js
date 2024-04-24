var innholdEL = document.querySelector("#innhold");
var interfaceEL = document.querySelector("#interface");
var sjanserEL = document.querySelector("#sjanser");
var riktigbokstaverEL = document.querySelector("#riktigbokstaver");
var bruktebokstaverEL = document.querySelector("#bruktebokstaver");
var bokstavEl = document.querySelector("#bokstav");
var gjettEL = document.querySelector("#gjett");
gjettEL.addEventListener("click", gjett);
var highsscorebuttonEL = document.querySelector("#highscorebutton");
highsscorebuttonEL.addEventListener("click", highscore);

var ordliste = [
    "bok", "skrive", "lære", "bilde", "hund", "katt", "bord", "stol", "skole", "arbeid",
    "datamaskin", "programmering", "musikk", "kunst", "natur", "vitenskap", "matematikk", "idrett", "historie", "geografi",
    "språk", "kultur", "litteratur", "filosofi", "psykologi", "økonomi", "politikk", "religion", "sosiologi", "teknologi",
    "arkitektur", "medisin", "jus", "fysikk", "kjemi", "biologi", "astronomi", "geologi", "meteorologi", "zoologi"
];
var ord = "";
var splittetord = [];
var sjanser = 6;

function spill() {
    interfaceEL.style.display = "block";
    sjanserEL.innerHTML = "Du har " + sjanser + " sjanser igjen";
    riktigbokstaver = [];
    bruktebokstaver = [];
    bokstavEl.value = "";
    ord = ordliste[Math.floor(Math.random() * ordliste.length)];
    for (var i = 0; i < ord.length; i++) {
        riktigbokstaver.push("_");
    }
    console.log(ord);
    indices = [];
    for (var i = 0; i < ord.length; i++) {
        indices.push(i);
        extractLetters(ord, indices);
    }


}
function extractLetters(ord, indices) {
    var letters = [];
    for (var i = 0; i < indices.length; i++) {
        // Check if the index is within the range of the word's length
        if (indices[i] >= 0 && indices[i] < ord.length) {
            // Add the letter at the specified index to the list
            letters.push(ord.charAt(indices[i]));
        }
    }
    return letters;
}
spill();
function gjett() {
    if (bokstavEl.value==ord){
        alert("Gratulerer! Du har gjettet riktig ord!");
        spill();
    }
    var splittetord=extractLetters(ord, indices);
    for (var i = 0; i < ord.length; i++) {
        if (splittetord[i] == bokstavEl.value) {
            riktigbokstaver[i] = bokstavEl.value;
            riktigbokstaverEL.innerHTML = riktigbokstaver.join(" ");
        }       
    }
    if (!splittetord.includes(bokstavEl.value)) {
        sjanser--;
        sjanserEL.innerHTML = "Du har " + sjanser + " sjanser igjen";
    }
    bruktebokstaver.push(bokstavEl.value);
    bruktebokstaverEL.innerHTML = bruktebokstaver.join(", ");
    if (sjanser == 0) {
        alert("Du har brukt opp alle sjansene dine! Ordet var " + ord);
        spill();
    }
    else if (riktigbokstaver.join("") == ord) {
        alert("Gratulerer! Du har gjettet riktig ord!");
        spill();
    }
    bokstavEl.value = "";

}