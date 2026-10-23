startNewGame.onclick = makeGame;
loadFromSave.onclick = loadSaveMenu;
viewSettings.onclick = openSettingsMenu;
writePaperBtn.onclick = givePaper;
buyWorkerBtn.onclick = startWorkerLoop;
convertPapers.onclick = convPapers;
goToMainMenu.onclick = goToMnMenu;
resumeGame.onclick = resumeGameFunc;

function goToMnMenu() {
    gameDisplay.style.display = "none";
    mainMenu.style.display = "flex";
    resumeGame.style.display = "block";
}

function resumeGameFunc() {
    mainMenu.style.display = "none";
    gameDisplay.style.display = "flex";
}

function convPapers() {
    money += papers * articlePrice;
    papers = 0;
    paperCount.innerText = "Papers Written: " + papers.toFixed(0);
    moneyCount.innerText = "Money: $" + money.toFixed(2);
}

function startWorkerLoop() {
    if (money < workerPrice) return;
    if (workers === 0 || workerLoopEnabled === false) {
        workerLoopEnabled = true;
        workerLoop();
    }
    workers++
    money -= workerPrice;
    moneyCount.innerText = "Money: $" + money.toFixed(2);
    workerPrice *= 1.25
    buyWorkerBtn.innerText = "Hire Writer: $" + workerPrice.toFixed(2); 
}

function autoSuffixer(valuePassed) {
  let moneySuffixedOutput;
  let numberString = String(valuePassed)
  let numberString2 = String(Math.abs(Math.trunc(Number(valuePassed))))
  let count = (numberString.match(new RegExp("0", "g")) || []).length;
  let actualLength = numberString2.length;
  let suffixSolution;
  if (valuePassed >= 1000 || valuePassed <= -1000) {
    suffixSolution = suffixes[Math.floor((actualLength - 1) / 3) - 1]
    let startIndex = valuePassed < 0 ? 1 : 0;
    let remainder = actualLength % 3 || 3;
    moneySuffixedOutput = ((valuePassed < 0 ? "-" : "") + numberString.substring(startIndex, startIndex + remainder) + "." + numberString.substring(startIndex + remainder, startIndex + remainder + 1) + suffixSolution);
  } else {
    suffixSolution = ""
    moneySuffixedOutput = valuePassed;
  }
  return moneySuffixedOutput;
}


async function workerLoop() {
    while (workerLoopEnabled) {
        await sleep(1000)
        papers += (1 * workers);
        paperCount.innerText = "Papers Written: " + papers.toFixed(0);
    }
}

async function makeGame() {
    gameDisplay.style.display = "grid";
    mainMenu.style.display = "none";
    clickMenu.style.display = "grid";
    money = 0;
    papers = 0;
    workers = 0;
    workerPrice = 200;
    articlePrice = 1.5;
    paperCount.innerText = "Papers Written: " + papers.toFixed(0);
    moneyCount.innerText = "Money: $" + money.toFixed(2);
    buyWorkerBtn.innerText = "Hire Writer: $" + workerPrice.toFixed(2); 
}

async function loadSaveMenu() {
    mainMenu.style.display = "none";
}

async function openSettingsMenu() {
    mainMenu.style.display = "none";
}

async function givePaper() {
    papers += 1;
    paperCount.innerText = "Papers Written: " + papers.toFixed(0);
}