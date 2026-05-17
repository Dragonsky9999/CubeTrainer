import { MoveOrchestrator } from "./MoveOrchestrator.js"
import { InputController, convertMove } from "../input/index.js"
import { updateFrontFace } from "../render/index.js"

export class CubeController {
    constructor(sceneContainer, {RenderFrontFace = true } = {}) {
        this.orchestrator = new MoveOrchestrator(sceneContainer)
        this.enableKeyboard = false
        
        this.input = new InputController(this.orchestrator)
        window.addEventListener("keydown", e => {
            if (!this.enableKeyboard) return
            this.input.handleKeyDown(e,this.orchestrator.frontIndex)
        })
        window.addEventListener("keyup", e => {
            if (!this.enableKeyboard) return
            this.input.handleKeyUp(e)
        })
        

        if (RenderFrontFace) {
            const frontFaceIndicator = document.createElement("div")
            frontFaceIndicator.id = "frontFaceIndicator"
            frontFaceIndicator.className = "frontFaceIndicator"
            sceneContainer.appendChild(frontFaceIndicator)

            this.orchestrator.frontFaceIndicator = frontFaceIndicator
        }

        this.isRunning = false        
    }

    reset(){
        this.stop()
        this.orchestrator.reset()
        this.start()
    }

    start(){
        this.orchestrator.isRunning = true
        this.orchestrator.isProcessing = true
        this.orchestrator.loop()
    }
    
    stop(){
        this.orchestrator.isRunning = false
        this.orchestrator.isProcessing = false
    }
}