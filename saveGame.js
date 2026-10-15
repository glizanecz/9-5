function saveGame(method, saveNumber) {
    let saveObject = {
        papers: papers,
        money: money,
        workers: workers,
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

    }
}
