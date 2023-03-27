const prompt = require("prompt-sync")({
    sigint: true
});

const DIRECTION = {
    ["N,L"]: "W",
    ["N,R"]: "E",
    ["E,L"]: "N",
    ["E,R"]: "S",
    ["S,L"]: "E",
    ["S,R"]: "W",
    ["W,L"]: "S",
    ["W,R"]: "N"
};
//turn rover to desired orientation
function turn(current_direction, turn_to) {
    return DIRECTION[[current_direction, turn_to]]
}
// adujust coordinates based on orientation
function move(current_direction, x, y) {
    if (current_direction === "N") y += 1
    else if (current_direction === "S") y -= 1
    else if (current_direction === "E") x += 1
    else if (current_direction === "W") x -= 1
    return [x, y]
}
// regex used to extract data
const regex = /\((\d),(\d),(\w)\)([FLR]+)/;
// used prompt to enter size, direction and commands  by user
const dim = prompt("Enter dimensions: ").split(" ");
//convert string to number to get width & height
const w = parseInt(dim[0]);
const l = parseInt(dim[1]);

while (dim.length == 2) {
    let match = prompt("Enter command: ").replace(/ /g, '').match(regex);
    if (match !== null) {
        let robot_x = parseInt(match[1]);
        let init_x = robot_x;

        let robot_y = parseInt(match[2]);
        let init_y = robot_y;

        let direction = match[3];
        let init_direction = direction;

        let instructions = match[4];

        for (let i of instructions) {
            if (i === 'F') {
                [robot_x, robot_y] = move(direction, robot_x, robot_y)
            } else {
                direction = turn(direction, i)
            }
        }
        // print results
        if (robot_x < 0 || robot_x >= w || robot_y < 0 || robot_y >= l) {
            console.log(`(${init_x},${init_y},${init_direction}) LOST`)
        } else {
            console.log(`(${robot_x},${robot_y},${direction})`)
        }
    } else {
        console.log("ERROR: missing require parameters")
    }
}
console.log("ERROR: reading dimensions")