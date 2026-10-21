startNewGame.onclick = makeGame;
loadFromSave.onclick = loadSaveMenu;
viewSettings.onclick = openSettingsMenu;
writePaperBtn.onclick = givePaper;

async function makeGame() {
    gameDisplay.style.display = "grid";
    mainMenu.style.display = "none";
    menuBar.style.display = "grid";
    clickMenu.style.display = "grid";
    

}

async function loadSaveMenu() {
    mainMenu.style.display = "none";
}

async function openSettingsMenu() {
    mainMenu.style.display = "none";
}

async function givePaper() {
    papers += 1;
    paperCount.innerText = "Papers Written: " + papers;
}