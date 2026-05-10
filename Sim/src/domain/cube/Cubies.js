export class Cubies {
    constructor(){
        this.state = {
            "corner":[
                {id:0,where:0,pos:[1,1,1],ori:0,faces:["+X","+Y","+Z"],colors:["red","white","green"]},
                {id:1,where:1,pos:[-1,1,1],ori:0,faces:["-X","+Z","+Y"],colors:["orange","green","white"]},
                {id:2,where:2,pos:[-1,1,-1],ori:0,faces:["-X","+Y","-Z"],colors:["orange","white","blue"]},
                {id:3,where:3,pos:[1,1,-1],ori:0,faces:["+X","-Z","+Y"],colors:["red","blue","white"]},
                {id:4,where:4,pos:[1,-1,1],ori:0,faces:["+X","+Z","-Y"],colors:["red","green","yellow"]},
                {id:5,where:5,pos:[-1,-1,1],ori:0,faces:["-X","-Y","+Z"],colors:["orange","yellow","green"]},
                {id:6,where:6,pos:[-1,-1,-1],ori:0,faces:["-X","-Z","-Y"],colors:["orange","blue","yellow"]},
                {id:7,where:7,pos:[1,-1,-1],ori:0,faces:["+X","-Y","-Z"],colors:["red","yellow","blue"]},
            ],
            "edge":[
                {id:0,where:0,pos:[1,1,0],ori:0,faces:["+X","+Y"],colors:["red","white"]},
                {id:1,where:1,pos:[0,1,1],ori:0,faces:["+Y","+Z"],colors:["white","green"]},
                {id:2,where:2,pos:[-1,1,0],ori:0,faces:["-X","+Y"],colors:["orange","white"]},
                {id:3,where:3,pos:[0,1,-1],ori:0,faces:["+Y","-Z"],colors:["white","blue"]},
                {id:4,where:4,pos:[1,-1,0],ori:0,faces:["+X","-Y"],colors:["red","yellow"]},
                {id:5,where:5,pos:[0,-1,1],ori:0,faces:["-Y","+Z"],colors:["yellow","green"]},
                {id:6,where:6,pos:[-1,-1,0],ori:0,faces:["-X","-Y"],colors:["orange","yellow"]},
                {id:7,where:7,pos:[0,-1,-1],ori:0,faces:["-Y","-Z"],colors:["yellow","blue"]},
                {id:8,where:4,pos:[1,0,1],ori:0,faces:["+X","+Z"],colors:["red","green"]},
                {id:9,where:5,pos:[-1,0,1],ori:0,faces:["-X","+Z"],colors:["orange","green"]},
                {id:10,where:6,pos:[-1,0,-1],ori:0,faces:["-X","-Z"],colors:["orange","blue"]},
                {id:11,where:7,pos:[1,0,-1],ori:0,faces:["+X","-Z"],colors:["red","blue"]},
                
            ],
            "center":[
                {id:0,where:0,pos:[1,0,0],ori:0,faces:["+X"],colors:["red"]},
                {id:1,where:1,pos:[-1,0,0],ori:0,faces:["-X"],colors:["orange"]},
                {id:2,where:2,pos:[0,1,0],ori:0,faces:["+Y"],colors:["white"]},
                {id:3,where:3,pos:[0,-1,0],ori:0,faces:["-Y"],colors:["yellow"]},
                {id:4,where:4,pos:[0,0,1],ori:0,faces:["+Z"],colors:["green"]},
                {id:5,where:5,pos:[0,0,-1],ori:0,faces:["-Z"],colors:["blue"]},
            ],
        }
    }

    update(cube){
        const CubieState = [this.state.corner,this.state.edge,this.state.center]
        const CubePositions = [cube.state.CP,cube.state.EP,cube.state.CenterP]
        const CubeOrientations = [cube.state.CO,cube.state.EO]
        
        for (let n=0; n<3; n++){
            for (let i=0;i<positions[n].length;i++){
                const where = CubePositions[n][i]
                CubieState[n][where].where = i
                CubieState[n][where].pos =  positions[n][i]
                CubieState[n][where].faces = Faces[n][i]
                CubieState[n][where].colors = [...Colors[n][where]]
                if ((n == 0) || (n == 1)) CubieState[n][where].ori = CubeOrientations[n][i]
                
                //ori適用
                if (CubieState[n][where].ori == 1){
                    const tmp = CubieState[n][where].colors.splice(-1)
                    CubieState[n][where].colors.unshift(...tmp)
                } else if (CubieState[n][where].ori == 2){
                    const tmp = CubieState[n][where].colors.splice(0,1)
                    CubieState[n][where].colors.push(...tmp)
                }
                
            }
        }
        
    }
    
    getState(type){
        if (type == null) console.log(this.state)
        if (type == "corner") console.log(this.state["corner"])
        if (type == "edge") console.log(this.state["edge"])
        if (type == "center") console.log(this.state["center"])
    }
}
            
const cornerPositions = [
    [1,1,1],
    [-1,1,1],
    [-1,1,-1],
    [1,1,-1],
    [1,-1,1],
    [-1,-1,1],
    [-1,-1,-1],
    [1,-1,-1],
]
const edgePositions = [
    [1,1,0],
    [0,1,1],
    [-1,1,0],
    [0,1,-1],
    [1,-1,0],
    [0,-1,1],
    [-1,-1,0],
    [0,-1,-1],
    [1,0,1], 
    [-1,0,1],
    [-1,0,-1],
    [1,0,-1],
]
const  centerPositions = [
    [1,0,0],
    [-1,0,0],
    [0,1,0],
    [0,-1,0],
    [0,0,1],
    [0,0,-1],
]
const positions = [cornerPositions,edgePositions,centerPositions]

const cornerFaces = [
    ["+X","+Y","+Z"],
    ["-X","+Z","+Y"],
    ["-X","+Y","-Z"],
    ["+X","-Z","+Y"],
    ["+X","+Z","-Y"],
    ["-X","-Y","+Z"],
    ["-X","-Z","-Y"],
    ["+X","-Y","-Z"],
]
const edgeFaces = [
    ["+X","+Y"],
    ["+Y","+Z"],
    ["-X","+Y"],
    ["+Y","-Z"],
    ["+X","-Y"],
    ["-Y","+Z"],
    ["-X","-Y"],
    ["-Y","-Z"],
    ["+X","+Z"],
    ["-X","+Z"],
    ["-X","-Z"],
    ["+X","-Z"],
]
const centerFaces = [
    ["+X"],
    ["-X"],
    ["+Y"],
    ["-Y"],
    ["+Z"],
    ["-Z"],
]
const Faces = [cornerFaces,edgeFaces,centerFaces]

const cornerColors = [
    ["red","white","green"],
    ["orange","green","white"],
    ["orange","white","blue"],
    ["red","blue","white"],
    ["red","green","yellow"],
    ["orange","yellow","green"],
    ["orange","blue","yellow"],
    ["red","yellow","blue"],
]

const edgeColors = [
    ["red","white"],
    ["white","green"],
    ["orange","white"],
    ["white","blue"],
    ["red","yellow"],
    ["yellow","green"],
    ["orange","yellow"],
    ["yellow","blue"],
    ["red","green"],
    ["orange","green"],
    ["orange","blue"],
    ["red","blue"],
]

const centerColors = [
    ["red"],
    ["orange"],
    ["white"],
    ["yellow"],
    ["green"],
    ["blue"],
]

const Colors = [cornerColors,edgeColors,centerColors]
