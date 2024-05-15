var innholdEL = document.querySelector("#innhold");
var interfaceEL = document.querySelector("#interface");
var sjanserEL = document.querySelector("#sjanser");
var riktigbokstaverEl = document.querySelector("#riktigbokstaver");
var bruktebokstaverEl = document.querySelector("#bruktebokstaver");
var bokstavEl = document.querySelector("#bokstav");
var gjettEL = document.querySelector("#gjett");
gjettEL.addEventListener("click", gjett);

var gangergjett = 0;

var navnEL = document.querySelector("#navn");

var highscore1EL = document.querySelector("#highscore1");
var highscore2EL = document.querySelector("#highscore2");
var highscore3EL = document.querySelector("#highscore3");
highscore1EL.addEventListener("click", highscore);
highscore2EL.addEventListener("click", highscore);
highscore3EL.addEventListener("click", highscore);
var highscorelisteEl = document.querySelector("#highscoreliste");
var highscorelisteinnholdEl = document.querySelector("#highscorelisteinnhold");
var highscoreuploadEl = document.querySelector("#highscoreupload");
highscoreuploadEl.addEventListener("click", highscoreupload);
var lukkhighscoreEl = document.querySelector("#lukkhighscore");
lukkhighscoreEl.addEventListener("click", spilligjen);

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

var personer = [];

// Funksjon som starter spillet
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

//funksjon som sjekker om gjettet ditt er feil eller riktig
function gjett() {
    if (bokstavEl.value == ord) {
        vinnerskjermEl.style.display = "block";
        innholdEL.style.display = "none";

    }
    var splittetord = extractLetters(ord, indices);
    for (var i = 0; i < ord.length; i++) {
        if (splittetord[i] == bokstavEl.value) {
            riktigbokstaver[i] = bokstavEl.value;
            riktigbokstaverEl.innerHTML = riktigbokstaver.join(" ");
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

//funksjonen som viser spillet igjen
function spilligjen() {
    sjanser = 6;
    spill();
    taperskjermEl.style.display = "none";
    vinnerskjermEl.style.display = "none";
    innholdEL.style.display = "block";
    bruktebokstaverEl.innerHTML = "";
    highscorelisteEl.style.display = "none";
    riktigbokstaverEl.innerHTML = "";

}

//funksjonen som viser highscore skjermen
function highscore() {
    innholdEL.style.display = "none";
    taperskjermEl.style.display = "none";
    vinnerskjermEl.style.display = "none";
    highscorelisteEl.style.display = "block";
}
function highscoreupload() {
    var navn = navnEL.value;
    var antallgjett = gangergjett;
    var highscore = getHighscoreFromCookie();
    highscore.push({ navn: navn, antallgjett: antallgjett });
    highscore.sort((a, b) => a.antallgjett - b.antallgjett);
    highscore = highscore.slice(0, 3);
    setHighscoreToCookie(highscore);
    displayHighscore(highscore);
}

function getHighscoreFromCookie() {
    var highscore = [];
    var highscoreCookie = document.cookie.replace(/(?:(?:^|.*;\s*)highscore\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (highscoreCookie) {
        highscore = JSON.parse(highscoreCookie);
    }
    return highscore;
}

function setHighscoreToCookie(highscore) {
    document.cookie = "highscore=" + JSON.stringify(highscore);
}

function displayHighscore(highscore) {
    highscorelisteinnholdEl.innerHTML = "";
    for (var i = 0; i < highscore.length; i++) {
        var row = document.createElement("tr");
        var nameCell = document.createElement("td");
        var guessCell = document.createElement("td");
        nameCell.textContent = highscore[i].navn;
        guessCell.textContent = highscore[i].antallgjett;
        row.appendChild(nameCell);
        row.appendChild(guessCell);
        highscorelisteinnholdEl.appendChild(row);
    }
}