export class HomePage {
    constructor(pageManager) {
        this.pageManager = pageManager
        this.element = null
    }

    render() {
        this.element = document.createElement("div")
        this.element.classList.add("home-page")

        this.element.innerHTML = `
            <div class="glass card hero-card">
                <h1 class="title">Cube Trainer</h1>
                <p class="subtitle">Train Smarter, Solve Faster</p>
                <button class="main-button" id="startButton">START</button>
            </div>
        `

        return this.element
    }
    
    mount(){
        this.element.querySelector("#startButton").addEventListener("click", () => {
            this.pageManager.show("menu")
        })
    }
}