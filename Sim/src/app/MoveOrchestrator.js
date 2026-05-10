import * as THREE from 'three';
import { Cube } from '../domain/cube/Cube.js';
import { Renderer } from '../render/Renderer.js'
import { moveDefs } from '../domain/cube/MoveDefs.js'
import { updateFrontFace } from '../render/FrontFaceIndicator.js';
import { convertMove, flipSuffix } from '../input/index.js';

export class MoveOrchestrator {
    constructor(sceneContainer){
        this.sceneContainer = sceneContainer
        this.cube = new Cube()
        this.renderer = new Renderer(sceneContainer)

        this.history = []
        this.redoStack = []
        //回転&アニメーション
        this.queue = []
        this.isAnimating = false

        this.isRunning = false

        this.isProcessing = false

        this.frontIndex = null
        this.face = null
    }
    
    enqueue(move,{recordHistory = true, clearRedo = true} = {}){
        this.queue.push({move,recordHistory,clearRedo})
        this.processQueue()
    }

    async processQueue(){
        if (this.isAnimating) return
        this.isAnimating = true
        
        while (this.queue.length > 0){
            if (!this.isProcessing) break
            const item = this.queue.shift()

            const {move, recordHistory,clearRedo} = item
            if (recordHistory){
                this.history.push(move)
                if (clearRedo) this.redoStack = []
            }

            // rendererにanimateさせる
            await this.renderer.animateMove(moveDefs[move].render)
            
            //アニメーション終わってからcube&cubiesの状態更新
            this.cube.applyMove(move)
            this.cube.Cubies.update(this.cube)

            //cubies情報からmeshes更新
            this.renderer.Mesh.update(this.cube.Cubies)
        }
        this.isAnimating = false
    }

    applyMove(move){
        this.cube.applyMove(move)
        this.cube.Cubies.update(this.cube)

        this.renderer.Mesh.update(this.cube.Cubies)
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

    loop(){
        if (!this.isRunning) return
        this.renderer.updateRenderer(this.isRunning)

        this.frontIndex = this.renderer.bestFace
        this.face = this.cube.state.CenterP[this.frontIndex]
        if (this.frontFaceIndicator) updateFrontFace(this.face,this.frontFaceIndicator)

        requestAnimationFrame(() => this.loop())
    }

    undo(){
        const move = this.history.pop()
        if (!move) return

        let suffix = move[1]
        suffix = flipSuffix(suffix)

        this.redoStack.push(move)

        const convertedMove = !suffix ? move[0] : move[0] + suffix
        this.enqueue(convertedMove, {recordHistory:false})
    }

    redo(){
        const move = this.redoStack.pop()
        if (!move) return
        this.enqueue(move, {clearRedo:false})
    }
    

    reset(){
        this.queue = []
        this.history = []
        this.cube.reset()
        this.cube.Cubies.update(this.cube)
        this.renderer.Mesh.update(this.cube.Cubies)
    }
}