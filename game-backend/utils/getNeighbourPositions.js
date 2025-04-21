const directions = [
    [-1,1], [0,1], [1,1],
    [-1,0],        [1,0],
    [-1,-1],[0,-1],[1,-1]
]

const directionRules = [
    {
        direction: "any",
        positions: [
            [-1,1], [0,1], [1,1],
            [-1,0],        [1,0],
            [-1,-1],[0,-1],[1,-1]
        ]
    },
    {
        direction: "diagonal",
        positions: [
            [-1,1],        [1,1],

            [-1,-1],       [1,-1]
        ]
    },
    {
        direction: "orthogonal",
        positions: [
                    [0,1],
            [-1,0],        [1,0],
                    [0,-1]
        ]
    }
]

const checkNeighboursDirection = (tilesArr, directionName, x, y) => {
    const directionRule = directionRules.find(r => r.direction === directionName)
    const neighboursPositions = directionRule.positions.map(([dx, dy]) => (`${x + dx},${y + dy}`))
    const tilesArrayCoords = tilesArr.map(t => (`${t.x},${t.y}`))
    return tilesArrayCoords.filter(t => neighboursPositions.includes(t))
}

exports.getNeighbourPositions = (x, y) => {
    return directions.map(([dx, dy]) => ({
        x: x + dx,
        y: y + dy
    }))
}

exports.calculateBonusesFromNeighbours = (neighbourTilesRaw, placeRules, neighbourSubtypeId, x, y) => {
    const neighbourTiles = neighbourTilesRaw.map(t => {return t.dataValues})
    const tilesArr = neighbourTiles.filter(tile => tile.tileTypeId === neighbourSubtypeId )

    if(tilesArr.length < placeRules.minNeighborCount){
        return null
    }

    const tilesFilteredArr = checkNeighboursDirection(tilesArr, placeRules.neighbourDirection, x, y)
    const bonus = tilesFilteredArr.length * placeRules.bonusPerTile

    let perfectPlacementBonus = 0
    if(tilesFilteredArr.length >= placeRules.perfectPlacementCount){
        perfectPlacementBonus = placeRules.perfectPlacementBonus
    }

    return {
        bonusTiles: tilesFilteredArr,
        bonusFromTiles: bonus,
        perfectPlacementBonus,
    }
}

