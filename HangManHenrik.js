var innholdEL = document.querySelector("#innhold");
var interfaceEL = document.querySelector("#interface");
var sjanserEL = document.querySelector("#sjanser");
var riktigbokstaverEl = document.querySelector("#riktigbokstaver");
var bruktebokstaverEl = document.querySelector("#bruktebokstaver");
var bokstavEl = document.querySelector("#bokstav");
var gjettEL = document.querySelector("#gjett");
gjettEL.addEventListener("click", gjett);

var gangergjett=0;

var navnEL=document.querySelector("#navn");

var highscore1EL = document.querySelector("#highscore1");
var highscore2EL = document.querySelector("#highscore2");
var highscore3EL = document.querySelector("#highscore3");
highscore1EL.addEventListener("click", highscore);
highscore2EL.addEventListener("click", highscore);
highscore3EL.addEventListener("click", highscore);
var highscorelisteEl = document.querySelector("#highscoreliste");
var lukkhighscoreEl = document.querySelector("#lukkhighscore");
lukkhighscoreEl.addEventListener("click", spilligjen);
var highscorelisteinnholdEl = document.querySelector("#highscorelisteinnhold");
var highscoreuploadEl = document.querySelector("#highscoreupload");
highscoreuploadEl.addEventListener("click", highscoreupload);

var taperskjermEl = document.querySelector("#taperskjerm");
var tapertekstEl = document.querySelector("#tapertekst");
var Provigjenknapp1El = document.querySelector("#Provigjenknapp1");
Provigjenknapp1El.addEventListener("click", spilligjen);




var vinnerskjermEl = document.querySelector("#vinnerskjerm");
var provIgjen2El = document.querySelector("#provIgjen2");
provIgjen2El.addEventListener("click", spilligjen);

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
        vinnerskjermEl.style.display="block";
        innholdEL.style.display="none";

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
    bruktebokstaverEl.innerHTML = bruktebokstaver.join(", ");
    if (sjanser == 0) {
        innholdEL.style.display = "none";
        taperskjermEl.style.display = "block";
        tapertekstEl.innerHTML = "Beklager, du har brukt opp alle sjansene dine. Riktig ord var " + ord;
    }
    else if (riktigbokstaver.join("") == ord) {
        innholdEL.style.display = "none";
        vinnerskjermEl.style.display = "block";
    }
    bokstavEl.value = "";
    gangergjett++;
    console.log(gangergjett);

}
function spilligjen() {
    sjanser = 6;
    spill();
    taperskjermEl.style.display = "none";
    vinnerskjermEl.style.display = "none";
    innholdEL.style.display = "block";
    bruktebokstaverEl.innerHTML = "";

}

function highscore(){
    innholdEL.style.display="none";
    taperskjermEl.style.display="none";
    vinnerskjermEl.style.display="none";
    highscorelisteEl.style.display="block";
}
function highscoreupload(){
    var navn=navnEL.value;
    var gangergjett=gangergjett;
    while (highscorelisteinnholdEl.firstChild) {
        highscorelisteinnholdElEl.removeChild(highscorelisteinnholdEl.firstChild);
    }


    var tableEl = document.createElement("table");
    var tbodyEl = document.createElement("tbody");

    var overskriter = "<tr>";
    overskriter += "<th>Navn</th>";
    overskriter += "<th>Antall gjett</th>";

    tbodyEl.innerHTML += overskriter;

    for (var i = 0; i < personer.value; i++) {
        var rad = "<tr>";
        rad += "<td>" + personer[i].navn + "</td>";
        rad += "<td>" + personer[i].antallgjett + "</td>";
        rad += "</tr>";

        tbodyEl.innerHTML += rad;
    }

    tableEl.appendChild(tbodyEl);
    innpakningEl.appendChild(tableEl);
}