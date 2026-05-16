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
                <div class="glass simulator-container" id="freeCube"></div>
            </main>
        `

        
        
        return this.element
    }
    
    mount(){
        this.setupCube()
        this.setupEvent()
    }  
    
    setupEvent(){
        this.element
            .querySelector("#backButton")
            .addEventListener("click", () => {
                this.pageManager.show("menu")
            })
    }

    setupCube() {

        const sceneContainer = this.element.querySelector("#freeCube")

        this.cubeController = new CubeController(sceneContainer, {
            enableKeyboard: true,
            renderFrontFace: true,
        })

        this.cubeController.start()
    }

}