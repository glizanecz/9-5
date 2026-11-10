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
        displayMoney();
        coffeesBought += 1;
        coffeeMult += .5;
        multiTimeObject.push({
            type: "coffee",
            timer: 30,
            multi: .5,
        });
        coffeePrice *= 1.2;
        coffeePrice = coffeePrice.toFixed(2);
        buyCoffee.innerText = "Buy Coffee (+.5x papers) | $" + autoSuffixer(coffeePrice);
        return
    } 
    if (coffeePrice <= money) {
        coffeesBought += 1;
        coffeeMult += .5;
        multiTimeObject.push({
            type: "coffee",
            timer: 30,
            multi: .5,
        });
        money -= coffeePrice;
        displayMoney();
        coffeePrice *= 1.2;
        coffeePrice = coffeePrice.toFixed(2);
        buyCoffee.innerText = "Buy Coffee (+.5x papers) | $" + autoSuffixer(coffeePrice);
        return
    }
}

function buyEnergyFunc () {
    if (energyDrinksBought === 0 && money >= 10) {
        money -= 75;
        displayMoney();
        energyDrinksBought += 1;
        energyMult += 2.5;
        multiTimeObject.push({
            type: "engDrink",
            timer: 15,
            multi: 2.5,
        });
        energyPrice *= 1.5;
        energyPrice = energyPrice.toFixed(2)
        buyEngDrink.innerText = "Buy Energy Drink (+2.5x papers) | $" + autoSuffixer(energyPrice);
        return
    } 
    if (energyPrice <= money) {
        energyDrinksBought += 1;
        energyMult += 2.5;
        multiTimeObject.push({
            type: "engDrink",
            timer: 15,
            multi: 2.5,
        });
        money -= energyPrice;
        displayMoney();
        energyPrice *= 1.5;
        energyPrice = energyPrice.toFixed(2)
        buyEngDrink.innerText = "Buy Energy Drink (+2.5x papers) | $" + autoSuffixer(energyPrice);
        return
    }
}

function buyWorkersCoffeeFunc () {
    //next update :=)
}

function buyProductivityBurst () {
    //next update :3
}

async function reduceMultTimers () {
    while (true) {
        await sleep(1000);
        drinkMultiplierTotal = 0;
        for (const drink of multiTimeObject) {
            drink.timer = drink.timer - 1;
            if (drink.timer === 0) {
                let indexOfDrink = multiTimeObject.indexOf(drink);
                if (indexOfDrink > -1) {
                    multiTimeObject.splice(indexOfDrink, 1);
                }
            }
            drinkMultiplierTotal += drink.multi;
        }
        if (multiTimeObject.length > 0) {
            cofShopMultiDisplay.innerText = "Coffee Shop | +" + autoSuffixer(drinkMultiplierTotal) + "x Multiplier";
        } else {
            cofShopMultiDisplay.innerText = "Coffee Shop"
        }
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
    displayMoney();
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
        let papersGained = Math.ceil((10 * (workers / 2) * workers));
        papers += papersGained;
        convMoney(papersGained);
        displayPaper();
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
    displayPaper();
    displayMoney();
    buyWorkerBtn.innerText = "Hire Writer: $" + autoSuffixer(workerPrice.toFixed(2)); 
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
    let papersGained = Number((1 * (drinkMultiplierTotal + 1)).toFixed(2));
    papers += papersGained;
    convMoney(papersGained);
    displayPaper();
}

const suffixes = [
  "k",
  "M",
  "B",
  "T",
  "Qd",
  "Qn",
  "Sx",
  "Sp",
  "Oc",
  "No",
  "Dc",
  "Ud",
  "Dd",
  "Td",
  "Qad",
  "Qid",
  "Sxd",
  "Spd",
  "Ocd",
  "Nod",
  "Vg",
  "Uvg",
  "Dvg",
  "Tvg",
  "Qavg",
  "Qivg",
  "Sxvg",
  "Spvg",
  "Ocvg",
  "Novg",
  "Tg",
  "Utg"
];

function displayPaper () {
    let paperAsNumber = Number(papers);
    paperCount.innerText = "Papers Written: " + autoSuffixer(Number(paperAsNumber.toFixed(0)));
}

function displayMoney () {
    let moneyAsNumber = Number(money);
    moneyCount.innerText = "Money: $" + autoSuffixer(Number(moneyAsNumber.toFixed(2)));
}

function convMoney (papersGained) {
    money += papersGained * articlePrice;
    displayMoney();
}

function themeSwitch(theme) {
    if (document.body.classList.contains(theme)) {
        document.body.classList.remove("darkTheme","greenTheme","purpleTheme", "orangeTheme", "goldenTheme");
        return;
    } 
    document.body.classList.remove("darkTheme","greenTheme","purpleTheme", "orangeTheme", "goldenTheme");
    document.body.classList.add(theme)
}
