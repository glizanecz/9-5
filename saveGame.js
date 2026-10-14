function saveGame(method, saveNumber) {
    let saveObject = {
        papers: papers,
        money: money,
        workers: workers,
    }
    if (method === "localStorage") {
        let saveLocation = 
        localStorage.setItem("save1", saveObject)
    }
};