export function updateFrontFace(face,indicator){
    if (!indicator) console.log("indicator not found")
    indicator.style.backgroundColor = colorMap[face]
}

const colorMap = {
    0: "red",
    1: "orange",
    2: "white",
    3: "yellow",
    4: "green",
    5: "blue",
}