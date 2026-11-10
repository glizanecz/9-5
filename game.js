startNewGame.onclick = makeGame;
loadFromSave.onclick = loadSaveMenu;
viewSettings.onclick = openSettingsMenu;
writePaperBtn.onclick = givePaper;
buyWorkerBtn.onclick = startWorkerLoop;
goToMainMenu.onclick = goToMnMenu;
resumeGame.onclick = resumeGameFunc;
toggleDarkMode.onclick = () => themeSwitch("darkTheme");
toggleGreenMode.onclick = () => themeSwitch("greenTheme");
togglePurpleMode.onclick = () => themeSwitch("purpleTheme");
orangeModeToggle.onclick = () => themeSwitch("orangeTheme");
goldenModeToggle.onclick = () => themeSwitch("goldenTheme");
returnToMMSettings.onclick = settingsReturn;
btmmolg.onclick = lfsreturn;
goToClickingTab.onclick = goToClickingTabFunc;
buyCoffee.onclick = buyCoffeeFunc;
buyEngDrink.onclick = buyEnergyFunc;
reduceMultTimers();

function buyCoffeeFunc () {
    if (coffeesBought === 0 && money >= 10) {
        money -= 10;
        coffeesBought += 1;
        coffeeMult += .5;
        coffeeTimer += 30;
        coffeePrice *= 1.25;
        buyCoffee.innerText = "Buy Coffee (+.5x papers) | $" + coffeePrice;
        return
    } 
    if (coffeePrice <= money) {
        coffeesBought += 1;
        coffeeMult += .5;
        coffeeTimer += 30;
        money -= coffeePrice;
        coffeePrice *= 1.25;
        buyCoffee.innerText = "Buy Coffee (+.5x papers) | $" + coffeePrice;
        return
    }
}

function buyEnergyFunc () {
    if (energyDrinksBought === 0 && money >= 10) {
        money -= 10;
        energyDrinksBought += 1;
        energyMult += 2.5;
        energyTimer += 30;
        energyPrice *= 1.25;
        buyEngDrink.innerText = "Buy Energy Drink (+2.5x papers) | $" + energyPrice;
        return
    } 
    if (energyPrice <= money) {
        energyDrinksBought += 1;
        energyMult += 2.5;
        energyTimer += 30;
        money -= energyPrice;
        energyPrice *= 1.25;
        buyEngDrink.innerText = "Buy Energy Drink (+2.5x papers) | $" + energyPrice;
        return
    }
}

async function reduceMultTimers () {
    while (true) {
        await sleep(1000);
        if (coffeeTimer === 0) {
            coffeeTimer -= 0;
            coffeeMult = 1;
            return
        }
        if (energyTimer === 0) {
            energyTimer -= 0;
            energyMult = 1;
            return
        }
        coffeeTimer -= 1;
        energyTimer -= 1;
    }
}

function goToClickingTabFunc() {
    clickMenu.style.display = "grid";
}


function lfsreturn() {
    loadFromSaveMenu.style.display = "none";
    mainMenu.style.display = "flex";
}

function settingsReturn() {
    settingsMenu.style.display = "none";
    mainMenu.style.display = "flex";
}

function toggleDarkModeFunc() {
    document.body.classList.toggle("darkTheme");
}

function goToMnMenu() {
    gameDisplay.style.display = "none";
    mainMenu.style.display = "flex";
    resumeGame.style.display = "block";
}

function resumeGameFunc() {
    mainMenu.style.display = "none";
    gameDisplay.style.display = "flex";
    coffeeShop.style.display = "hide";
    clickMenu.style.display = "grid";
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
    loadFromSaveMenu.style.display = "flex";
}

async function openSettingsMenu() {
    mainMenu.style.display = "none";
    settingsMenu.style.display = "flex";
}

async function givePaper() {
    let papersGained = (1 * (coffeeMult + energyMult));
    papers += papersGained;
    money += papersGained * articlePrice;
    moneyCount.innerText = "Money: $" + money.toFixed(2);
    paperCount.innerText = "Papers Written: " + papers.toFixed(0);
}

function themeSwitch(theme) {
    if (document.body.classList.contains(theme)) {
        document.body.classList.remove("darkTheme","greenTheme","purpleTheme", "orangeTheme", "goldenTheme");
        return;
    } 
    document.body.classList.remove("darkTheme","greenTheme","purpleTheme", "orangeTheme", "goldenTheme");
    document.body.classList.add(theme)
}
