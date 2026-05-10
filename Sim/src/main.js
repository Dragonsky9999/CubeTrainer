import { CubeController } from "./app/index.js"

window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("sceneContainer")
    const app = new CubeController(container)
    
    app.start()
    
    const ResetBtn = document.getElementById("resetBtn")
    ResetBtn.addEventListener("click", () => {
        app.reset()
    })

    const scrambleBtn = document.getElementById("scramble")
    scrambleBtn.addEventListener("click", () => {
        app.orchestrator.scramble()
    })

    const undoBtn = document.getElementById("undo")
    undoBtn.addEventListener("click", () => {
        app.orchestrator.undo()
    })
    
    const stopMoveBtn = document.getElementById("stopMove")
    stopMoveBtn.addEventListener("click", () => {
        app.orchestrator.isProcessing = !app.orchestrator.isProcessing
        app.orchestrator.processQueue()
        if (!app.orchestrator.isAnimating) app.orchestrator.isProcessing = true
        
    })

    const redoBtn = document.getElementById("redo")
    redoBtn.addEventListener("click", () => {
        app.orchestrator.redo()
    })
})