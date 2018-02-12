export default function EternityFunction(x, y, time) {
    const sectorX = x % 40;
    const sectorY = y % 40;
    const sectorTime = 5;
    if (
        Math.abs(sectorX) < Math.abs(sectorTime) &&
        Math.abs(sectorY) < Math.abs(sectorTime)
        ) {
        return 200;
    }
    return 0;
};