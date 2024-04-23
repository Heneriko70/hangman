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
    sjanserEL.innerHTML = "Du har " + sjanser + " sjanser igjen";
    riktigbokstaver = [];
    bruktebokstaver = [];
    bokstavEl.value = "";
    ord = ordliste[Math.floor(Math.random() * ordliste.length)];
    console.log(ord);
}
function gjett() {
    var gjettetbokstav = bokstavEl.value;
    if (gjettetbokstav.length != 1) {
        alert("Du må gjette på en bokstav");
        return;
    }
    if (bruktebokstaver.includes(gjettetbokstav)) {
        alert("Du har allerede gjettet på denne bokstaven");
        return;
    }
    if (riktigbokstaver.includes(gjettetbokstav)) {
        alert("Du har allerede gjettet riktig på denne bokstaven");
        
        return;
    }
    if (ord.includes(gjettetbokstav)) {
        var count = 0;
        const charCount = (ord, gjettetbokstav) => { 
            const count = ord.split(ord).length - 1; 
            return count;
          } 
        count = charCount(ord, gjettetbokstav);
        console.log(count);
        riktigbokstaver.push(gjettetbokstav*count);
        riktigbokstaverEL.innerHTML = riktigbokstaver.join(" ");
        if (riktigbokstaver.length == ord.length) {
            alert("Gratulerer, du har vunnet!");
            spill();
        }
    }
}
spill();