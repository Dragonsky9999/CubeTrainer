import { cubeColors } from "../data/data.js"

export function updateFrontFace(face,indicator){
    if (!indicator) console.log("indicator not found")
    indicator.style.background = "#" + cubeColors[face].toString(16).padStart(6, "0")
}

const colorMap = {
    0: cubeColors[0],
    1: cubeColors[1],
    2: cubeColors[2],
    3: cubeColors[3],
    4: cubeColors[4],
    5: cubeColors[5],
}

