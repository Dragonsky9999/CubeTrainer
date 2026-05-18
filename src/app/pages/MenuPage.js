export class MenuPage {

    constructor(pageManager) {
        this.pageManager = pageManager
    }

    render() {

        this.element = document.createElement("div")

        this.element.classList.add("menu-page")

        this.element.innerHTML = `
            <div class="glass card menu-card">

                <h1 class="title">Menu</h1>

                <button class="menu-button" id="pllButton">
                    PLL Trainer
                </button>

                <button class="menu-button" id="freeButton">
                    Free Simulator
                </button>

                <button class="menu-button back-button" id="backButton">
                    Back
                </button>
            </div>
        `

        this.element
            .querySelector("#pllButton")
            .addEventListener("click", () => {
                this.pageManager.show("pll")
            })

        this.element
            .querySelector("#freeButton")
            .addEventListener("click", () => {
                this.pageManager.show("free")
            })

        this.element
            .querySelector("#backButton")
            .addEventListener("click", () => {
                this.pageManager.show("home")
            })

        return this.element
    }

    set(){
        
    }
}