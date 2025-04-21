/**
 * @jest-environment node
 * @typedef {import('@jest/globals')} jest
 */

const { calculateBonusesFromNeighbours } = require("../utils/getNeighbourPositions")

describe("calculateBonusesFromNeighbours", () => {
    const baseRule = {
        bonusPerTile: 5,
        perfectPlacementCount: 3,
        perfectPlacementBonus: 10,
        minNeighborCount: 1,
    };

    const tile = (x, y, tileTypeId = "forest") => ({
        dataValues: {x, y, tileTypeId}
    });

    describe("direction: orthogonal", () => {
        const rule = { ...baseRule, neighbourDirection: "orthogonal" };

        test("correctly filters only orthogonal tiles", () => {
            const tiles = [
                tile(0, 1), // top
                tile(1, 1), // diagonal — should be ignored
                tile(1, 0), // right
            ];
            const result = calculateBonusesFromNeighbours(tiles, rule, "forest", 0, 0);
            expect(result.bonusFromTiles).toBe(2 * 5);
        });

        test("return undefined if not enough neighbour tiles", () => {

            const tiles = [
                tile(1, 0),
            ]

            const result = calculateBonusesFromNeighbours(tiles, rule, "plain", 0, 0)

            expect(result).toBeNull()
        })

        test("return 0 perfectPlacementBonus if tiles count < perfectPlacementCount", () => {

            const tiles = [
                tile(1, 0),
                tile(2, 0)
            ]

            const result = calculateBonusesFromNeighbours(tiles, rule, "forest", 0, 0)

            expect(result.bonusFromTiles).toBe(5)
            expect(result.perfectPlacementBonus).toBe(0)
        })
    });

    describe("direction: any", () => {
        const rule = { ...baseRule, neighbourDirection: "any", minNeighborCount: 2 };

        test("returns bonus and perfect bonus for matching tiles in all directions", () => {
            const tiles = [
                tile(0, 1),
                tile(1, 0),
                tile(0, -1),
                tile(-1, -1),
            ];

            const result = calculateBonusesFromNeighbours(tiles, rule, "forest", 0, 0);
            expect(result.bonusFromTiles).toBe(4 * 5);
            expect(result.perfectPlacementBonus).toBe(10);
        });

        test("returns undefined if not enough matching neighbours", () => {
            const tiles = [tile(1, 1)];
            const result = calculateBonusesFromNeighbours(tiles, rule, "forest", 0, 0);
            expect(result).toBeNull();
        });
    })

    describe("direction: diagonal", () => {
        const rule = { ...baseRule, neighbourDirection: "diagonal" };

        test("correctly filters only diagonal tiles", () => {
            const tiles = [
                tile(1, 1),
                tile(-1, -1),
                tile(0, 1), // orthogonal — should be ignored
            ];
            const result = calculateBonusesFromNeighbours(tiles, rule, "forest", 0, 0);
            expect(result.bonusFromTiles).toBe(2 * 5);
        });
    })
})