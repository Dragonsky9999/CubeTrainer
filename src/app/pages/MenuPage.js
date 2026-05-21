import { configManager } from "../config/ConfigManager.js"
import { SettingsOverlay } from "../ui/SettingsOverlay.js"

export class MenuPage {
    constructor(pageManager) {
        this.pageManager = pageManager
        this.element = null
        this.settingsOverlay = new SettingsOverlay(configManager)
    }

    render() {
        this.element = document.createElement("div")
        this.element.classList.add("menu-page")

        this.element.innerHTML = `
            <div class="header">
                <button id="settingsButton" class="icon-button">⚙</button>
            </div>
            <div class="glass card menu-card">
                <h1 class="title">Menu</h1>
                <button class="menu-button" id="pllButton">PLL Trainer</button>
                <button class="menu-button" id="freeButton">Free Simulator</button>
                <button class="menu-button back-button" id="backButton">Back</button>
            </div>
        `
        return this.element
    }

    mount(){
        this.setupEvents()
    }

    setupEvents() {
        this.element.querySelector("#pllButton").addEventListener("click", () => this.pageManager.show("pll"))
        this.element.querySelector("#freeButton").addEventListener("click", () => this.pageManager.show("free"))
        this.element.querySelector("#backButton").addEventListener("click", () => this.pageManager.show("home"))
        
        this.element.querySelector("#settingsButton").addEventListener("click", () => {
            this.settingsOverlay.open(this.element, "all")
        })
    }
}