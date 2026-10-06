let papers = 0;

window.startGame = function () {
    mainMenu.style.display = "none";
    clickingMenu.style.display = "grid";
}

window.openSettings = function () {
    mainMenu.style.display = "none";
}

window.loadFromSave = function () {
    mainMenu.style.display = "none";
}

writeButton.onclick = writePaper;

function writePaper() {
    papers += 1;
    paperDisplay.innerText = "Papers Written: " + papers;
}