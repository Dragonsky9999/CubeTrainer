import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { moveDefs } from "../domain/cube/MoveDefs.js";
import { Cubies } from "../domain/cube/Cubies.js";
import { Mesh } from "./CubieMesh.js"

export class Renderer {
    constructor(container){
        // -- scene -- //
        this.scene = new THREE.Scene()
        this.scene.background = null

        // -- camera -- //
        this.camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        )
        this.camera.position.set(1.49 * 2, 1.49 * 2, 1.49 *2)

        // -- light -- //
        const light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(3, 3, 3);
        this.scene.add(light);
        const ambient = new THREE.AmbientLight(0xffffff, 5)
        this.scene.add(ambient)

        // -- renderer -- //
        this.renderer = new THREE.WebGLRenderer({   
            alpha: true,
            antialias: true 
        })

        this.renderer.setSize(container.clientWidth, container.clientHeight)
        this.renderer.setClearColor(0x000000, 0); // ←完全透明

        this.renderer.domElement.class = "canvas"
        container.appendChild(this.renderer.domElement)

        // -- controls -- //
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.05
        this.controls.enablePan = false;

        // -- cubie -- //
        this.Mesh = new Mesh(this.scene)
        this.bestFace = null

        // -- 初期mesh生成 -- //
        this.Mesh.init()
        this.Mesh.meshes.forEach(mesh => this.scene.add(mesh))

        //音
        this.sound = new Audio(`${import.meta.env.BASE_URL}sounds/move.m4a`)
        
        // -- resize検知 --//
        this.initResizeObserver(container)
    }

    initResizeObserver(container) {

        this.resizeObserver = new ResizeObserver(() => {
            this.setSize(container)
        })

        this.resizeObserver.observe(container)
    }

    setSize(container) {

        const width = container.clientWidth
        const height = container.clientHeight

        this.renderer.setSize(width, height)

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
    }
    
    getFrontFace(){
        const camDir = new THREE.Vector3()
        this.camera.getWorldDirection(camDir)
        camDir.normalize()
        
        let bestScore = Infinity
        
        for (const [face, normal] of Object.entries(FACE_NORMALS)){
            const score = camDir.dot(normal)
            
            if (score < bestScore) {
                bestScore = score
                this.bestFace = face
            }
        }

        return this.bestFace
    }
    
    animateMove(def){
        return new Promise((resolve) => {

            // 音
            this.sound.playbackRate = 0.95 + Math.random() * 0.1
            this.sound.currentTime = 0
            this.sound.play()
        
            const group = new THREE.Group()
            this.scene.add(group)

            const targets = this.Mesh.meshes.filter(m => def.layer(m))

            // groupに入れる
            targets.forEach(m => group.attach(m))

            const axis = new THREE.Vector3(...def.axis)

            const duration = 250
            const start = performance.now()

            let prevAngle = 0

            const animate = (time) => {

                const t = (time - start) / duration
                const progress = Math.min(t, 1)

                const base = 0.5 - 0.5 * Math.cos(Math.PI * progress)
                const eased = 1 - Math.pow(1 - base, 1.5)

                const current = eased * def.angle
                const delta = current - prevAngle

                group.rotateOnAxis(axis, delta)

                prevAngle = current

                if (progress < 1) {
                    requestAnimationFrame(animate)
                } else {

                    group.rotateOnAxis(axis, -def.angle)
                    targets.forEach(m => this.scene.attach(m))
                    this.scene.remove(group)

                    resolve()
                }
            }
            requestAnimationFrame(animate)
        })
    }

    // -- loop -- //
    updateRenderer(){
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        this.getFrontFace()
    }

    quit() {
        this.resizeObserver?.disconnect()

        this.renderer.dispose()
        this.controls.dispose()

        this.scene.clear()
        this.renderer.domElement.remove()
    }
}

const FACE_NORMALS = {
    0: new THREE.Vector3(1, 0, 0),
    1: new THREE.Vector3(-1, 0, 0),
    4: new THREE.Vector3(0, 0, 1),
    5: new THREE.Vector3(0, 0, -1)
}