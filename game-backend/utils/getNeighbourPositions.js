const directions = [
    [-1,1], [0,1], [1,1],
    [-1,0],        [1,0],
    [-1,-1],[0,-1],[1,-1]
]

exports.getNeighbourPositions = (x, y) => {
    return directions.map(([dx, dy]) => ({
        x: x + dx,
        y: y + dy
    }))
}
