import { CubeController } from "../../../Sim/src/app/index.js"

export class FreeSimulatorPage {

    constructor(pageManager) {
        this.pageManager = pageManager
    }

    render() {

        this.element = document.createElement("div")

        this.element.className = "free-page"

        this.element.innerHTML = `

            <header class="glass header">

                <button id="backButton">←</button>

                <h1>Free Simulator</h1>

                <button>⚙</button>
            </header>

            <main class="free-content">

                <div class="free-layout">

                    <div class="glass simulator-container-wrapper">

                        <div
                            class="glass simulator-container"
                            id="freeCube">
                        </div>

                        <div class="control-overlay">

                            <div class="control-group left-controls">

                                <button class="sim-button" id="resetButton">
                                    Reset
                                </button>

                                <button class="sim-button" id="scrambleButton">
                                    Scramble
                                </button>
                            </div>

                            <div class="control-group right-controls">

                                <button class="icon-button" id="undoButton">
                                    ↶
                                </button>

                                <button class="icon-button stop-button" id="stopButton">
                                    ■
                                </button>

                                <button class="icon-button" id="redoButton">
                                    ↷
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

            </main>
        `
        
        
        return this.element
    }
    
    mount(){
        this.setupCube()
        this.setupEvent()
    }  

    activate(){
        this.cubeController.orchestrator.reset()
        this.cubeController.enableKeyboard = true
    }

    deactivate(){
        this.cubeController.orchestrator.reset()
        this.cubeController.enableKeyboard = false
    }
    
    setupEvent(){
        this.element
            .querySelector("#backButton")
            .addEventListener("click", () => {
                this.pageManager.show("menu")
            })

        this.element.querySelector("#resetButton").addEventListener("click", () => {
            this.cubeController.reset()
        })

        this.element.querySelector("#scrambleButton").addEventListener("click", () => {
            this.cubeController.orchestrator.scramble()
        })

        this.element.querySelector("#undoButton").addEventListener("click", () => {
            this.cubeController.orchestrator.undo()
        })
        
        this.element.querySelector("#stopButton").addEventListener("click", () => {
            this.cubeController.orchestrator.isProcessing = !this.cubeController.orchestrator.isProcessing
            this.cubeController.orchestrator.processQueue()
            if (!this.cubeController.orchestrator.isAnimating) this.cubeController.orchestrator.isProcessing = true
            
        })

        this.element.querySelector("#redoButton").addEventListener("click", () => {
            this.cubeController.orchestrator.redo()
        })
    }

    setupCube() {

        const sceneContainer = this.element.querySelector("#freeCube")

        this.cubeController = new CubeController(sceneContainer)

        this.cubeController.start()
        this.cubeController.orchestrator.applyMove("z")
        this.cubeController.orchestrator.applyMove("z")
    }

}