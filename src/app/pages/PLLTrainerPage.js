import { Sim } from "../../../Sim/src/app/index.js"
import { cubeColors, faceIndexMap } from "../../../Sim/src/data/data.js"
import { PllAlgs } from "../../../Sim/src/domain/index.js"

export class PLLTrainerPage {

    constructor(pageManager) {
        this.pageManager = pageManager

        this.loop = new Loop((time) => {

            this.timer.update()
            this.cells.update(this.Sim.frontIndex)

            this.timerEl.innerHTML = this.timer.format()
        })
    }

    render() {

        this.element = document.createElement("div")

        this.element.classList.add("pll-page")

        this.element.innerHTML = `

            <header class="glass header">

                <button id="backButton">←</button>

                <h1>PLL Trainer</h1>

                <button id="settingsButton">⚙</button>
            </header>

            <main class="content">

                <section class="glass problem-area">

                    <div class="timer">00:00.000</div>

                    <div class="cube-container" id="pllCube"></div>

                    <button class="main-button" id="nextButton">
                        NEXT
                    </button>

                </section>

                <section class="glass answer-area">

                    <div class="twoDCube">

                        <div class="cube-visual">

                            <div class="cube-rotated">

                                <div class="side-strips top-stripes">
                                    <div class="strip top-cell"></div>
                                    <div class="strip top-cell"></div>
                                    <div class="strip top-cell"></div>
                                </div>

                                <div class="side-strips left-stripes">
                                    <div class="strip left-cell"></div>
                                    <div class="strip left-cell"></div>
                                    <div class="strip left-cell"></div>
                                </div>

                                <div class="upper-face-grid center-stripes">
                                    ${Array.from({ length: 9 }, () =>
                                        `<div class="cell center-cell"></div>`
                                    ).join("")}
                                </div>

                                <div class="side-strips right-stripes">
                                    <div class="strip right-cell"></div>
                                    <div class="strip right-cell"></div>
                                    <div class="strip right-cell"></div>
                                </div>

                                <div class="side-strips bottom-stripes">
                                    <div class="strip bottom-cell"></div>
                                    <div class="strip bottom-cell"></div>
                                    <div class="strip bottom-cell"></div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <button class="submit-button">
                        SUBMIT
                    </button>

                </section>

            </main>
        `

        return this.element
    }

    mount(){
        this.timer = new Timer()
        this.timerEl = this.element.querySelector(".timer")
        
        this.cells = new Cells(this.element)
        this.cells.init(this.element)

        this.cells.cellMap = new Map()

        const dirs = ["top","left","right","bottom"]
        dirs.forEach(dir => {
            this.cells[dir].forEach(cell => {
                this.cells.cellMap.set(cell.dom, cell)
            })
        })

        this.setupCube()
        this.setupEvents()
    }
    
    activate() {
        this.nextProblem()
        this.loop.start()
    }

    deactivate(){
        this.loop.stop()
    }

    setupEvents() {

        const sceneContainer = this.element.querySelector("#pllCube")

        this.element
            .querySelector("#backButton")
            .addEventListener("click", () => {
                this.pageManager.show("menu")
            })

        this.element
            .querySelector("#nextButton")
            .addEventListener("click", () => {
                this.nextProblem()
            })

        this.element
            .querySelector(".submit-button")
            .addEventListener("click", () => {
                this.submit()
            })

        const dirs = ["top","left","right","bottom"]
            dirs.forEach(dir => {
                this.cells[dir].forEach(c => {
                    c.dom.addEventListener("click", () => {
                        this.cells.changeColor(c)
                    })
                })
            })

        this.element.addEventListener("wheel", (e) => {
            const target = this.cells.cellMap.get(e.target)
        
            if (target){
                e.preventDefault()
                this.cells.changeColor(target,{dir:Math.sign(e.deltaY)})
            }
            
        }, {passive:false})
    }

    setupCube() {

        const sceneContainer = this.element.querySelector("#pllCube")

        this.Sim = new Sim(sceneContainer, {renderFrontFace:false})

        this.Sim.enableKeyboard = false
        this.Sim.loop.start()

        const cubies = this.Sim.cube.Cubies

        const types = {"corner":8,"edge":12,"center":6}
        for (const [type, length] of Object.entries(types)){
            for (let i=0;i<length;i++){
                cubies.state[type][i].sticker = false
            }
        }
        for (let i=0;i<4;i++){
            cubies.state.corner[i].sticker = true
            cubies.state.edge[i].sticker = true
        }    
        cubies.state.center[2].sticker = true
    }
 
    nextProblem(){
        this.cells.reset()
        
        const AUF = ["U","U'","U2",""][Math.floor(Math.random() * 4)]
        if (AUF != "") this.Sim.applyMove(AUF)
            
        const tmp = PLLIndex[Math.floor(Math.random() * 21)]
        const PLL = PllAlgs[tmp][0]
        this.Sim.reset()
        this.Sim.applyMoves(PLL)
        this.Sim.renderer.camera.position.set(1.49 * 2, 1.49 * 2, 1.49 *2)
 
        this.timer.reset()
        this.timer.start()
        this.cells.setCorrectColor(this.Sim.cube)
    }

    submit(){
        const result = this.checkAnswer()
        this.showResult(result)
    }

    checkAnswer(){
        const correctCells = []
        const wrongCells = []

        const dirs = ["top","left","right","bottom"]
        dirs.forEach((tlrb,i) => {
            for (const cell of this.cells[tlrb]){
                if (cell.isCorrect()){
                    correctCells.push(cell.index+(i*10))
                }else {
                    wrongCells.push(cell.index+(i*10))
                }
            }
        })

        return {
            correct: wrongCells.length === 0,
            correctCells: correctCells,
            wrongCells: wrongCells,
        }
    }

    showResult(result){
        const [correct,correctCells,wrongCells] = Object.values(result)
        const dirs = ["top","left","right","bottom"]
        dirs.forEach(dir => {
            this.cells[dir].forEach(cell => {
                cell.highlightColor()
            })
        })

        if (correct){
            this.timer.stop()
            setTimeout(() => {
                this.nextProblem()
            }, 2000);
        }
    }
}

function toHexColor(num) {
    return "#" + num.toString(16).padStart(6, "0")
}

const faceToColors = {
    "+X":toHexColor(cubeColors[0]), "-X":toHexColor(cubeColors[1]),
    "+Y":toHexColor(cubeColors[2]), "-Y":toHexColor(cubeColors[3]),
    "+Z":toHexColor(cubeColors[4]), "-Z":toHexColor(cubeColors[5]),
}

const PLLIndex = {
    0:"Ua",
    1:"Ub",
    2:"Aa",
    3:"Ab",
    4:"H",
    5:"Z",
    6:"E",
    7:"F",
    8:"Ja",
    9:"Jb",
    10:"Ra",
    11:"Rb",
    12:"T",
    13:"Y",
    14:"V",
    15:"Na",
    16:"Nb",
    17:"Ga",
    18:"Gb",
    19:"Gc",
    20:"Gd",
}

class Cells {
    constructor(element){
        this.element = element

        this.top = []
        this.left = []
        this.right = []
        this.bottom = []
        this.center = []
    }

    init(){
        const dirs = ["top","left","right","bottom","center"]
        dirs.forEach(dir => {
            const doms = this.element.querySelectorAll(`.${dir}-cell`)
            this[dir] = Array.from(doms).map((dom,i) => new Cell(dom,i))
        })

        this.center.forEach(centerCell => {
            centerCell.setUserColor(toHexColor(cubeColors[2]))
            centerCell.setCorrectColor(toHexColor(cubeColors[2]))
        })
    }

    setCorrectColor(cube){
        const cubeState = cube.state
        const cubieState = cube.Cubies.state
        
        for (let i=0;i<3;i++) this["top"][i].setCorrectColor([faceToColors[cubieState.corner[cubeState.CP[2]].colors[2]],faceToColors[cubieState.edge[cubeState.EP[3]].colors[1]],faceToColors[cubieState.corner[cubeState.CP[3]].colors[1]]][i])
        for (let i=0;i<3;i++) this["left"][i].setCorrectColor([faceToColors[cubieState.corner[cubeState.CP[2]].colors[0]],faceToColors[cubieState.edge[cubeState.EP[2]].colors[0]],faceToColors[cubieState.corner[cubeState.CP[1]].colors[0]]][i])
        for (let i=0;i<3;i++) this["right"][i].setCorrectColor([faceToColors[cubieState.corner[cubeState.CP[3]].colors[0]],faceToColors[cubieState.edge[cubeState.EP[0]].colors[0]],faceToColors[cubieState.corner[cubeState.CP[0]].colors[0]]][i])
        for (let i=0;i<3;i++) this["bottom"][i].setCorrectColor([faceToColors[cubieState.corner[cubeState.CP[1]].colors[1]],faceToColors[cubieState.edge[cubeState.EP[1]].colors[1]],faceToColors[cubieState.corner[cubeState.CP[0]].colors[2]]][i])

        for (let i=0; i<3;i++){
            this["right"][i].isopen = true
            this["bottom"][i].isopen = true
        }
    }

    reset(){
        const dirs = ["top","left","right","bottom"]
        dirs.forEach(dir => {
            this[dir].forEach(cell => {
                cell.reset()
            })
        })
    }

    update(frontIndex){
        const dirs = ["top","left","right","bottom"]
        dirs.forEach(dir => {
            this[dir].forEach(cell => {
                if (cell.isopen) cell.setUserColor(cell.correctColor)
            })
        })

        const faceToSideCells = {4:"bottom",0:"right",5:"top",1:"left"}
        const faceIndex = frontIndex
        this[faceToSideCells[faceIndex]].forEach(cell => {
            if (cell.isopen) return
            cell.isopen = true
        })        
    }
    
    changeColor(cell, { dir = 1 } = {}) {
        if (cell.isfinished) return
        cell.dom.textContent = ""

        const sideIndex = [4, 0, 5, 1]
        const sideColors = sideIndex.map(i => toHexColor(cubeColors[i]))

        if (!cell.userColor) {
                const first = dir === 1 ? 0 : 3
                cell.setUserColor(sideColors[first])
                return
            }
            
            let i = sideColors.indexOf(cell.userColor)
            
            if (i === -1) i = 0  // 保険
            
            const next = (i + dir + 4) % 4
            
            cell.setUserColor(sideColors[next])
        }
    
}

class Cell{
    constructor(dom, index){
        this.dom = dom
        this.index = index

        this.dom.style.fontSize = "35px"
        this.dom.style.fontWeight = "bold"
        this.dom.style.display = "flex"
        this.color = "green"
        this.dom.style.fontFamily = "Arial Black"
        this.dom.style.justifyContent = "center"
        this.dom.style.alignItems = "center"

        this.userColor = null
        this.correctColor = null

        this.isopen = null
        this.isfinished = false
    }

    setUserColor(color){
        this.userColor = color
        this.dom.style.background = color
    }

    setCorrectColor(color){
        this.correctColor = color
    }

    isCorrect(){
        return this.userColor === this.correctColor
    }

    highlightColor(){
        if (this.isCorrect()){
            this.dom.textContent = "✓"
            this.dom.style.color = "green"
            this.dom.style.boxShadow = "0 0 20px #00ff00"
            this.isfinished = true
        }else {
            this.setUserColor(null)
            this.dom.textContent = "❌"
            this.dom.style.boxShadow = "0 0 20px #ff3333"
        }
    }

    reset(){
        this.dom.style.background = null
        this.correctColor = null
        this.dom.textContent = null
        this.dom.style.boxShadow = null
        this.userColor = null
        this.correctColor = null
        this.isopen = null
        this.isfinished = false
    }
}


class Loop {

    constructor(callback) {
        this.callback = callback
        this.running = false
        this.id = null
    }

    start() {
        if (this.running) return

        this.running = true

        const tick = (time) => {

            if (!this.running) return

            this.callback(time)

            this.id = requestAnimationFrame(tick)
        }

        this.id = requestAnimationFrame(tick)
    }

    stop() {
        this.running = false
        cancelAnimationFrame(this.id)
    }
}

class Timer {
    constructor() {
        this.time = null
        this.startTime = 0
        this.elapsed = 0
        this.running = false
        this.started = false
    }

    start() {
        if (this.running) return

        this.time = performance.now()
        this.startTime = this.time
        this.running = true
    }

    update() {
        if (!this.running) return

        this.elapsed = this.time - this.startTime
        this.time = performance.now()
    }

    stop() {
        if (!this.running) return

        this.elapsed = this.time - this.startTime
        this.running = false
    }

    reset() {
        this.startTime = 0
        this.elapsed = 0
        this.running = false
    }
    
    format() {
        
        const ms = Math.floor(this.elapsed % 1000)
        const sec = Math.floor(this.elapsed / 1000) % 60
        const min = Math.floor(this.elapsed / 60000)

        return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}.${String(ms).padStart(3,"0")}`
    }
}