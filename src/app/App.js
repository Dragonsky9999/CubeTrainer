import { PageManager } from "./ui/PageManager.js"

import { HomePage } from "./pages/HomePage.js"
import { MenuPage } from "./pages/MenuPage.js"
import { PLLTrainerPage } from "./pages/PLLTrainerPage.js"
import { FreeSimulatorPage } from "./pages/FreeSimulatorPage.js"

export class App {

    start() {

        this.root = document.getElementById("app")

        this.pageManager = new PageManager(this.root)

        this.createPages()

        this.pageManager.show("home")
    }

    createPages() {

        this.homePage = new HomePage(this.pageManager)
        this.menuPage = new MenuPage(this.pageManager)
        this.pllTrainerPage = new PLLTrainerPage(this.pageManager)
        this.freeSimulatorPage = new FreeSimulatorPage(this.pageManager)

        this.pageManager.register("home", this.homePage)
        this.pageManager.register("menu", this.menuPage)
        this.pageManager.register("pll", this.pllTrainerPage)
        this.pageManager.register("free", this.freeSimulatorPage)
    }
}