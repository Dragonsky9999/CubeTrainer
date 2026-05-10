export function convertMove(move, currentFrontFace){

    const prefix = move[0]
    let suffix = move.slice(1)

    if (["U","D","R","L","F","B","M","E","S","u","d","r","l","f","b","x","y","z"].includes(suffix)) suffix = null

    const convertedMove = convertTable[currentFrontFace][prefix]

    if (flipTable[currentFrontFace][prefix]) suffix = flipSuffix(suffix)

    if (!suffix) return convertedMove
    return convertedMove + suffix
}

const convertTable = {
    0:{"R":"B","L":"F","U":"U","D":"D","F":"R","B":"L","r":"b","l":"f","u":"u","d":"d","f":"r","b":"l","M":"S","E":"E","S":"M","x":"z","y":"y","z":"x"},
    1:{"R":"F","L":"B","U":"U","D":"D","F":"L","B":"R","r":"f","l":"b","u":"u","d":"d","f":"l","b":"r","M":"S","E":"E","S":"M","x":"z","y":"y","z":"x"},
    4:{"R":"R","L":"L","U":"U","D":"D","F":"F","B":"B","r":"r","l":"l","u":"u","d":"d","f":"f","b":"b","M":"M","E":"E","S":"S","x":"x","y":"y","z":"z"},
    5:{"R":"L","L":"R","U":"U","D":"D","F":"B","B":"F","r":"l","l":"r","u":"u","d":"d","f":"b","b":"f","M":"M","E":"E","S":"S","x":"x","y":"y","z":"z"}
}

const flipTable = {
    0:{"R":false,"L":false,"U":false,"D":false,"F":false,"B":false,"r":false,"l":false,"u":false,"d":false,"f":false,"b":false,"M":false,"E":false,"S":true,"x":true,"y":false,"z":false},
    1:{"R":false,"L":false,"U":false,"D":false,"F":false,"B":false,"r":false,"l":false,"u":false,"d":false,"f":false,"b":false,"M":true,"E":false,"S":false,"x":false,"y":false,"z":true},
    4:{"R":false,"L":false,"U":false,"D":false,"F":false,"B":false,"r":false,"l":false,"u":false,"d":false,"f":false,"b":false,"M":false,"E":false,"S":false,"x":false,"y":false,"z":false},
    5:{"R":false,"L":false,"U":false,"D":false,"F":false,"B":false,"r":false,"l":false,"u":false,"d":false,"f":false,"b":false,"M":true,"E":false,"S":true,"x":true,"y":false,"z":true}
}

export function flipSuffix(suffix){
    if (suffix == "2" || suffix == "3") return suffix
    if (!suffix) return "'"
    return null
}