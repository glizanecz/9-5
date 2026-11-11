function saveGame(method, saveNumber) {
    let saveObject = {
        papers: papers,
        money: money,
        workers: workers,
        workerPrice: workerPrice,
        articlePrice: articlePrice,
        multiTimeObject: multiTimeObject,
        volume: volume,
        coffeesBought: coffeesBought,
        energyDrinksBought: energyDrinksBought,
        drinkMultiplierTotal: drinkMultiplierTotal,
        coffeePrice: coffeePrice,
        coffeeMult: coffeeMult,
        energyPrice: energyPrice,
        energyMult: energyMult,
    }
    if (method === "localStorage") {
        let saveLocation = saveNumber == 1 ? "save1" : saveNumber == 2 ? "save2" : saveNumber == 3 ? "save3" : "save4"
        localStorage.setItem(saveLocation, JSON.stringify(saveObject));
    } else if (method === "saveCode") {
        return JSON.stringify(saveObject)
    }
};

function loadGame(method, saveNumber) {
    if (method === "localStorage") {
        let saveLocation = saveNumber == 1 ? "save1" : saveNumber == 2 ? "save2" : saveNumber == 3 ? "save3" : "save4"
        let savedVersion = JSON.parse(localStorage.getItem(saveLocation));
        insertLoadedData(savedVersion);
    }
}

function switchValue(defaultValue, input) {
    if (input === undefined) {
        return defaultValue
    } else {
        return input
    }
}

function insertLoadedData(dataLoaded) {
    money = Number(switchValue(0, dataLoaded.money));
    papers = Number(switchValue(0, dataLoaded.papers));
    workers = Number(switchValue(0, dataLoaded.workers));
    workerPrice = Number(switchValue(200, dataLoaded.workerPrice));
    articlePrice = Number(switchValue(1.5, dataLoaded.articlePrice));
    multiTimeObject = switchValue([], dataLoaded.multiTimeObject);
    volume = Number(switchValue(0, dataLoaded.volume));
    coffeesBought = Number(switchValue(0, dataLoaded.coffeesBought));
    energyDrinksBought = Number(switchValue(0, dataLoaded.energyDrinksBought));
    drinkMultiplierTotal = Number(switchValue(1, dataLoaded.drinkMultiplierTotal));
    coffeePrice = Number(switchValue(10, dataLoaded.coffeePrice));
    coffeeMult = Number(switchValue(0, dataLoaded.coffeeMult));
    energyPrice = Number(switchValue(75, dataLoaded.energyPrice));
    energyMult = Number(switchValue(0, dataLoaded.energyMult));

    refreshAllDisplays()
}

function refreshAllDisplays () {
    buyWorkersCoffee.innerText = "Buy Workers Coffee (+.25x papers [30 seconds]) | $50";
    let moneyAsNumber = Number(money);
    moneyCount.innerText = "Money: $" + autoSuffixer(Number(moneyAsNumber.toFixed(2)));
    let paperAsNumber = Number(papers);
    paperCount.innerText = "Papers Written: " + autoSuffixer(Number(paperAsNumber.toFixed(0)));
    buyWorkerBtn.innerText = "Hire Writer: $" + workerPrice.toFixed(2); 
    if (multiTimeObject.length > 0) {
        cofShopMultiDisplay.innerText = "Coffee Shop | +" + autoSuffixer(drinkMultiplierTotal) + "x Multiplier";
    } else {
        cofShopMultiDisplay.innerText = "Coffee Shop"
    }
    buyEngDrink.innerText = "Buy Energy Drink (+2.5x papers) | $" + autoSuffixer(energyPrice);
    buyCoffee.innerText = "Buy Coffee (+.5x papers) | $" + autoSuffixer(coffeePrice);
}

submitSaveLoad.onclick = () => translateData("load");

function translateData (translation) {
    if (translation === "load") {
        let loadedData = loadFromSaveInput.value.trim();
        loadedData = loadedData.replace(/'/g, '"');
        loadFromSaveInput.value = "";
        if ((loadedData.startsWith('"') && loadedData.endsWith('"')) || (loadedData.startsWith("'") && loadedData.endsWith("'"))) {
            loadedData = loadedData.slice(1, -1);
        }
        let lastBraceIndex = loadedData.lastIndexOf("}");
        if (lastBraceIndex !== -1) {
            loadedData = loadedData.substring(0, lastBraceIndex + 1);
        }
        try {
            let loadedObject = JSON.parse(loadedData);
            insertLoadedData(loadedObject);
        } catch (error) {
            console.error(error)
        }
    }
}