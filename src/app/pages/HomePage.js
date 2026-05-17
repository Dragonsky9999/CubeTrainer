export class HomePage {

    constructor(pageManager) {
        this.pageManager = pageManager
    }

    render() {

        this.element = document.createElement("div")

        this.element.className = "home-page"

        this.element.innerHTML = `
            <div class="glass card hero-card">
                <h1 class="title">Cube Trainer</h1>
                <p class="subtitle">
                    Train Smarter, Solve Faster
                </p>

                <button class="main-button" id="startButton">
                    START
                </button>
            </div>
        `

        this.element
            .querySelector("#startButton")
            .addEventListener("click", () => {
                this.pageManager.show("menu")
            })

        return this.element
    }

    set() {
        
    }
}