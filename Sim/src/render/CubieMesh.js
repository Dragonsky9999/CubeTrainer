import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Cubies } from '../domain/cube/Cubies.js' 
import { cubeColors, faceIndexMap } from '../data/data.js'

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
    
                if (cubie.sticker){
                    cubie.faces.forEach((axis, index) => {
                        colors[faceIndexMap[axis]] = colorMap[cubie.colors[index]]
                    });
                }
    
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
                    colors[faceIndexMap[axis]] = colorMap[cubie.colors[i]]
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

const black = new THREE.MeshStandardMaterial({ color: "black", roughness: 0.6 })
const colorPX = new THREE.MeshStandardMaterial({ color: cubeColors[0], roughness: 0.5 })     //+X
const colorNX = new THREE.MeshStandardMaterial({ color: cubeColors[1], roughness: 0.5 })  //-X
const colorPY = new THREE.MeshStandardMaterial({ color: cubeColors[2], roughness: 0.4 })   //+Y
const colorNY = new THREE.MeshStandardMaterial({ color: cubeColors[3], roughness: 0.5 })  //-Y
const colorPZ = new THREE.MeshStandardMaterial({ color: cubeColors[4], roughness: 0.5 })   //+Z
const colorNZ = new THREE.MeshStandardMaterial({ color: cubeColors[5], roughness: 0.5 })    //-Z

const colorMap = {
    "+X": colorPX, "-X": colorNX,
    "+Y": colorPY, "-Y": colorNY,
    "+Z": colorPZ, "-Z": colorNZ,
}