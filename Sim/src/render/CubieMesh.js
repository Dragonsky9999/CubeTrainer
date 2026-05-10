import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Cubies } from '../domain/cube/Cubies.js' 
import { color } from 'three/tsl'

const cubies = new Cubies()

export class Mesh {
    constructor(){
        this.meshes = []
    }

    update(cubies){
        const CornerCubies = cubies.state.corner
        const EdgeCubies = cubies.state.edge
        const CenterCubies = cubies.state.center
        const State = [CornerCubies,EdgeCubies,CenterCubies]

        for (let n=0;n<3;n++){
            for (let i=0; i<State[n].length; i++){
                const cubie = State[n][i]
                const id = i + n * 100
                const mesh = this.meshes.filter(m => m.userData.id == id)
    
                // -- color 作成　-- //
                let colors = [black,black,black,black,black,black]
    
                cubie.faces.forEach((axis, index) => {
                    colors[AxisMap[axis]] = colorMap[cubie.colors[index]]
                });
    
                // -- color 貼り付け -- //
                mesh[0].material = [...colors]
                mesh[0].position.set(...cubie.pos)
            }
        }
    }

    init(){
        for (let n=0; n<3; n++){
        
            for (let i=0; i<Object.keys(state[n]).length; i++){
                let colors = [black,black,black,black,black,black]
    
                const cubie = state[n][i]
                const geo = new RoundedBoxGeometry(0.98,0.98,0.98,2,0.1)
    
                cubie.faces.forEach((axis, i) => {
                    colors[AxisMap[axis]] = colorMap[cubie.colors[i]]
                });
                const mat = [...colors]
                const mesh = new THREE.Mesh(geo,mat)
                mesh.userData.id = n * 100 + i
                mesh.position.set(...cubie.pos)
                this.meshes.push(mesh)
            }
        }
    }
}

const state = [cubies.state.corner,cubies.state.edge,cubies.state.center]

// const black = new THREE.MeshBasicMaterial({ color: "black" })
// const red = new THREE.MeshBasicMaterial({ color: "red" })
// const orange = new THREE.MeshBasicMaterial({ color: "orange" })
// const white = new THREE.MeshBasicMaterial({ color: "white" })
// const yellow = new THREE.MeshBasicMaterial({ color: "yellow" })
// const green = new THREE.MeshBasicMaterial({ color: "green" })
// const blue = new THREE.MeshBasicMaterial({ color: "blue" })

const black = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.6 })
const red = new THREE.MeshStandardMaterial({ color: 0xcc4444, roughness: 0.5 })
const orange = new THREE.MeshStandardMaterial({ color: 0xdd8844, roughness: 0.5 })
const white = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.4 })
const yellow = new THREE.MeshStandardMaterial({ color: 0xdddd55, roughness: 0.5 })
const green = new THREE.MeshStandardMaterial({ color: 0x44aa44, roughness: 0.5 })
const blue = new THREE.MeshStandardMaterial({ color: 0x4466cc, roughness: 0.5 })

const AxisMap = {
    "+X":0,"-X":1,
    "+Y":2,"-Y":3,
    "+Z":4,"-Z":5
}

const colorMap = {
    "red": red, "orange": orange,
    "white": white, "yellow": yellow,
    "green": green, "blue": blue,
}