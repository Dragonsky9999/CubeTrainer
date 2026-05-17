import { PllAlgs } from '../domain/index.js'
import { convertMove } from './convertMove.js';

const keyMap = {
    u: "U", U: "U'",
    d: "D", D: "D'",
    f: "F", F: "F'",
    b: "B", B: "B'",
    r: "R", R: "R'",
    l: "L", L: "L'",
    m: "M", M: "M'",
    e: "E", E: "E'",
    s: "S", S: "S'",
    x: "x", X: "x'",
    y: "y", Y: "y'",
    z: "z", Z: "z'",
}

export class InputController {
    constructor(orchestrator){
        this.orchestrator = orchestrator

        this.isSpacePressed = false;
        this.isA = false
        this.isB = false
        this.isC = false
        this.isD = false
    }
    
    handleKeyDown(e,frontIndex){
        e.preventDefault()
        if (e.code === "Space") this.isSpacePressed = true
        if (e.key === "ArrowLeft") this.isA = true
        if (e.key === "ArrowUp") this.isB = true
        if (e.key === "ArrowRight") this.isC = true
        if (e.key === "ArrowDown") this.isD = true
        
        if (this.isSpacePressed){
            if (e.key == "h") return PllAlgs.H[0].map(m => convertMove(m,frontIndex))
            if (e.key == "z") return PllAlgs.Z[0].map(m => convertMove(m,frontIndex))
            if (e.key == "e") return PllAlgs.E[0].map(m => convertMove(m,frontIndex))
            if (e.key == "f") return PllAlgs.F[0].map(m => convertMove(m,frontIndex))
            if (e.key == "t") return PllAlgs.T[0].map(m => convertMove(m,frontIndex))
            if (e.key == "y") return PllAlgs.Y[0].map(m => convertMove(m,frontIndex))
            if (e.key == "v") return PllAlgs.V[0].map(m => convertMove(m,frontIndex))
                                    
            if (e.key == "u") return this.isB ? PllAlgs.Ub[0].map(m => convertMove(m,frontIndex)) : PllAlgs.Ua[0].map(m => convertMove(m,frontIndex))
            if (e.key == "a") return this.isB ? PllAlgs.Ab[0].map(m => convertMove(m,frontIndex)) : PllAlgs.Aa[0].map(m => convertMove(m,frontIndex))
            if (e.key == "j") return this.isB ? PllAlgs.Jb[0].map(m => convertMove(m,frontIndex)) : PllAlgs.Ja[0].map(m => convertMove(m,frontIndex))
            if (e.key == "r") return this.isB ? PllAlgs.Rb[0].map(m => convertMove(m,frontIndex)) : PllAlgs.Ra[0].map(m => convertMove(m,frontIndex))
            if (e.key == "n") return this.isB ? PllAlgs.Nb[0].map(m => convertMove(m,frontIndex)) : PllAlgs.Na[0].map(m => convertMove(m,frontIndex))
            if (e.key == "g") return this.isD ? PllAlgs.Gd[0].map(m => convertMove(m,frontIndex)) : this.isC ? PllAlgs.Gc[0].map(m => convertMove(m,frontIndex)) : this.isB ? PllAlgs.Gb[0].map(m => convertMove(m,frontIndex)) : PllAlgs.Ga[0].map(m => convertMove(m,frontIndex))
        } else {
            const key = keyMap[e.key]
            if (!key) return
            
            return [convertMove(key,frontIndex)]
        }
    }

    handleKeyUp(e){
        if (e.code === "Space") this.isSpacePressed = false
        if (e.key === "ArrowLeft") this.isA = false
        if (e.key === "ArrowUp") this.isB = false
        if (e.key === "ArrowRight") this.isC = false
        if (e.key === "ArrowDown") this.isD = false
    }
}

