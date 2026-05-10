import { moveDefs } from "./MoveDefs.js"
import { Cubies } from "./Cubies.js"

export class Cube {
    constructor(){
        this.state = {
            CP: [0,1,2,3,4,5,6,7],
            CO: [0,0,0,0,0,0,0,0],
            EP: [0,1,2,3,4,5,6,7,8,9,10,11],
            EO: [0,0,0,0,0,0,0,0,0,0,0,0],
            CenterP: [0,1,2,3,4,5]
        }

        this.cornerSize = 8;
        this.edgeSize = 12;
        this.centerSize = 6;

        this.Cubies = new Cubies()
    }

    applyMove(moveName){
        const move = moveDefs[moveName]
        const corner = applyPermutationWithOrientation(this.state.CP, this.state.CO, move.CP, move.CO, 3);
        const edge = applyPermutationWithOrientation(this.state.EP, this.state.EO, move.EP, move.EO, 2);

        this.state.CP = corner[0];
        this.state.CO = corner[1];
        this.state.EP = edge[0];
        this.state.EO = edge[1];
        
        let NewCenters = [];
        for (let i=0; i<this.state.CenterP.length; i++){
            NewCenters[i] = this.state.CenterP[move.CenterP[i]]
        }
        this.state.CenterP = NewCenters;
    }

    getState(){
        return this.state;
    }

    ShowMoves(){
        return moveDefs;
    }
    
    reset(){
        this.state = {
            CP: [0,1,2,3,4,5,6,7],
            CO: [0,0,0,0,0,0,0,0],
            EP: [0,1,2,3,4,5,6,7,8,9,10,11],
            EO: [0,0,0,0,0,0,0,0,0,0,0,0],
            CenterP: [0,1,2,3,4,5]
        }
    }

}

function applyPermutationWithOrientation(OldPos,OldOri, movePos, moveOri, mod){
    const newPos = [];
    const newOri = [];

    for (let i=0; i<OldPos.length; i++){
        newPos[i] = OldPos[movePos[i]];
        newOri[i] = (OldOri[movePos[i]] + moveOri[i]) % mod;
    }
    return [newPos, newOri];
}

