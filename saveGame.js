function saveGame(method, saveNumber) {
    let saveObject = {
        papers: papers,
        money: money,
        workers: workers,
        workerPrice: workerPrice,
        articlePrice: articlePrice,
    }
    if (method === "localStorage") {
        let saveLocation = saveNumber == 1 ? "save1" : saveNumber == 2 ? "save2" : saveNumber == 3 ? "save3" : "save4"
        localStorage.setItem(saveLocation, JSON.stringify(saveObject));
    } else if (method === "saveCode") {
        let tempSaveCode = Object.values(saveObject);
        let tempSaveCode2 = tempSaveCode.join("|")
        return tempSaveCode2
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
    money = switchValue(0, dataLoaded.money)
    paper = switchValue(0, dataLoaded.paper)
    workers = switchValue(0, dataLoaded.workers)
    workerPrice = switchValue(200, dataLoaded.workerPrice)
    articlePrice = switchValue(1.5, dataLoaded.articlePrice)
}