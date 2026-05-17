import { CubeController } from "./app/index.js"

window.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement("div")
    container.id = "sceneContainer"
    const app = new CubeController(container)
    
    app.start()
    
    const ResetBtn = document.createElement("resetBtn")
    ResetBtn.id = "resetBtn"
    ResetBtn.addEventListener("click", () => {
        app.reset()
    })

    const scrambleBtn = document.createElement("scramble")
    scrambleBtn.id = "scramble"
    scrambleBtn.addEventListener("click", () => {
        app.orchestrator.scramble()
    })

    const undoBtn = document.createElement("undo")
    undoBtn.id = "undo"
    undoBtn.addEventListener("click", () => {
        app.orchestrator.undo()
    })
    
    const stopMoveBtn = document.createElement("stopMove")
    stopMoveBtn.id = "stopMove"
    stopMoveBtn.addEventListener("click", () => {
        app.orchestrator.isProcessing = !app.orchestrator.isProcessing
        app.orchestrator.processQueue()
        if (!app.orchestrator.isAnimating) app.orchestrator.isProcessing = true
        
    })

    const redoBtn = document.createElement("redo")
    redoBtn.id = "redo"
    redoBtn.addEventListener("click", () => {
        app.orchestrator.redo()
    })
})