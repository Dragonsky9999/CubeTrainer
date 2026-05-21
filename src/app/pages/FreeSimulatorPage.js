import { Sim } from "../../../Sim/src/app/index.js"
import { SettingsOverlay } from "../ui/SettingsOverlay.js"
import { ConfigManager, configManager } from "../config/ConfigManager.js"

export class FreeSimulatorPage {
    constructor(pageManager) {
        this.pageManager = pageManager
        this.settingsOverlay = new SettingsOverlay(configManager)
    }

    render() {
        this.element = document.createElement("div")
        this.element.classList.add("free-page")

        this.element.innerHTML = `
            <header class="glass header">
                <button id="backButton">←</button>
                <h1>Free Simulator</h1>
                <button id="settingsButton">⚙</button>
            </header>
            <main class="free-content">
                <div class="free-layout">
                    <div class="simulator-container-wrapper">
                        <div class="glass simulator-container" id="freeCube"></div>
                        <div class="control-overlay">
                            <div class="control-group left-controls">
                                <button class="sim-button" id="resetButton">Reset</button>
                                <button class="sim-button" id="scrambleButton">Scramble</button>
                            </div>
                            <div class="control-group right-controls">
                                <button class="icon-button" id="undoButton">↶</button>
                                <button class="icon-button stop-button" id="stopButton">■</button>
                                <button class="icon-button" id="redoButton">↷</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        `
        return this.element
    }
    
    mount() {
        this.setupCube()
        this.setupEvents() // バグ修正: setupEvent -> setupEventsのコール不整合
        this.setupConfigHooks()
    }  

    setupConfigHooks() {
        // 設定システム連動: ガイド表示のリアルタイム切り替えフック
        configManager.onChange("showFrontIndicator", (value) => {
            if (this.Sim && this.Sim.renderer) {
                // シミュレータ側のIndicator表示フラグを制御
                this.Sim.renderFrontFace = value
            }
        })
    }

    activate() {
        this.Sim.reset()
        this.Sim.enableKeyboard = true
    }

    deactivate() {
        this.Sim.reset()
        this.Sim.enableKeyboard = false
    }
    
    setupEvents() {
        this.element.querySelector("#backButton").addEventListener("click", () => {
            this.pageManager.show("menu")
        })

        this.element.querySelector("#resetButton").addEventListener("click", () => this.Sim.reset())
        this.element.querySelector("#scrambleButton").addEventListener("click", () => this.Sim.scramble())
        this.element.querySelector("#undoButton").addEventListener("click", () => this.Sim.undo())
        this.element.querySelector("#stopButton").addEventListener("click", () => this.Sim.stop())
        this.element.querySelector("#redoButton").addEventListener("click", () => this.Sim.redo())

        // シミュレータ専用設定（simulatorカテゴリのみ抽出）
        this.element.querySelector("#settingsButton").addEventListener("click", () => {
            this.settingsOverlay.open(this.element, "freeSim")
        })
    }

    setupCube() {
        const sceneContainer = this.element.querySelector("#freeCube")
        this.Sim = new Sim(sceneContainer)
        this.Sim.loop.start()
        this.Sim.applyMove("z")
        this.Sim.applyMove("z")
    }
}