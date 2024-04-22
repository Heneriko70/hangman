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

function spill() {
    interfaceEL.style.display = "block";
    sjanser = 6;
    sjanserEL.innerHTML = "sjanser:" + sjanser;
    riktigbokstaver = [];
    bruktebokstaver = [];
    bokstavEl.value = "";
    ord = ordliste[Math.floor(Math.random() * ordliste.length)];
    console.log(ord);
    lagBokstavBokser();
}