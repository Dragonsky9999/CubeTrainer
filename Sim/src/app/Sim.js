import { Cube } from "../domain/index.js"
import { Renderer } from "../render/index.js"
import { InputController } from "../input/index.js"
import { updateFrontFace } from "../render/index.js"
import { moveDefs } from "../domain/index.js"
import { flipSuffix } from "../input/index.js"

export class Sim {
    constructor(container,{ renderFrontFace = true } = {}){
        this.container = container
        this.enableKeyboard = true
        
        //cube&renderer作成
        this.cube = new Cube()
        this.renderer = new Renderer(this.container)
        
        this.isRunning = false

        //move履歴
        this.history = []
        this.redoStack = []
        
        //回転&アニメーション
        this.queue = []
        this.isAnimating = false

        this.executionId = 0
    
        this.frontIndex = null
        this.face = null

        this.loop = new Loop((time) => {
            this.update()
        })

        if (renderFrontFace) {
            const frontFaceIndicator = document.createElement("div")
            frontFaceIndicator.id = "frontFaceIndicator"
            frontFaceIndicator.className = "frontFaceIndicator"
            this.container.appendChild(frontFaceIndicator)
            this.frontFaceIndicator = frontFaceIndicator
        }
    
        this.input = new InputController()
        window.addEventListener("keydown", e => {
            if (!this.enableKeyboard) return
            const moves = this.input.handleKeyDown(e,this.frontIndex)
            if (!moves) return
            moves.forEach(move => this.enqueue(move))
        })

        window.addEventListener("keyup", e => {
            if (!this.enableKeyboard) return
            this.input.handleKeyUp(e)
        })
    }

    enqueue(move,{recordHistory = true, clearRedo = true} = {}){
        this.queue.push({move,recordHistory,clearRedo})
        this.processQueue()
    }
    
    async processQueue(){
        const executionId = this.executionId
        
        while (this.queue.length > 0){
            if (this.isAnimating) return
            this.isAnimating = true
            
            const item = this.queue.shift()
            const {move, recordHistory,clearRedo} = item
            
            // rendererにanimateさせる
            await this.renderer.animateMove(moveDefs[move].render, () => executionId === this.executionId)
            //animate後状態更新
            this.applyMove(move)
            

            //状態更新した後historyへ加える
            if (recordHistory){
                this.history.push(move)
                if (clearRedo) this.redoStack = []
            }

            if (executionId !== this.executionId){
                this.isAnimating = false
                break
            }
            
            await nextFrame()
            
            this.isAnimating = false
            
            await nextFrame()
        }
    }
    
    //cube操作applyMove,applyMoves,scramble,reset,undo,stop,redo,update
    applyMove(move){
        this.cube.applyMove(move)
        this.syncCube()
    }

    applyMoves(moves){
        moves.forEach(move => this.applyMove(move))
    }

    scramble(){
        const moves = [
            "U","U'","U2",
            "D","D'","D2",
            "F","F'","F2",
            "B","B'","B2",
            "R","R'","R2",
            "L","L'","L2",
        ]
        
        const scramble = []
        
        let prevFace = null
        
        for (let i = 0; i < 20; i++) {
            
            const candidates = moves.filter(move => {
                return move[0] !== prevFace
            })
            
            const move =
            candidates[Math.floor(Math.random() * candidates.length)]
            
            scramble.push(move)
            
            prevFace = move[0]
        }
        
        scramble.forEach(m => this.enqueue(m))
        console.log("scramble: ",scramble.join(" "))
    }    
    
    async reset(){
        while (this.isAnimating){
            await nextFrame()
        }

        this.stop()
        this.queue = []
        this.history = []
        this.cube.reset()
        this.syncCube()
    }

    undo(){
        if (this.isAnimating) return
        this.queue = []
        const move = this.history.pop()
        if (!move) return
        
        let suffix = move[1]
        suffix = flipSuffix(suffix)
        
        this.redoStack.push(move)
        
        const convertedMove = !suffix ? move[0] : move[0] + suffix
        this.enqueue(convertedMove, {recordHistory:false})
    }
        
    redo(){
        if (this.isAnimating) return
        const move = this.redoStack.pop()
        if (!move) return
        this.enqueue(move, {clearRedo:false})
    }

    stop(){
        this.executionId++
    }

    interrupt(){
        this.executionId++
        this.queue = []
        this.isAnimating = false
    }

    syncCube(){
        this.cube.Cubies.update(this.cube)
        this.renderer.Mesh.update(this.cube.Cubies)
    }
    
    update(){
        this.renderer.updateRenderer()
        
        this.frontIndex = this.renderer.bestFace
        this.face = this.cube.state.CenterP[this.frontIndex]
        if (this.frontFaceIndicator) updateFrontFace(this.face,this.frontFaceIndicator)
    }
}

async function nextFrame() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve)
    })
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