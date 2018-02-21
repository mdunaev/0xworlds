export default function EternityFunction(x, y, time) {
    if ((x+time/100000).toString(2).split('1').length + y.toString(2).split('1').length
    > 60) return x;
    return 0;
};

export function EternityFunction1(x, y, time) {
    const sectorX = x % 40;
    const sectorY = y % 40;
    const sectorTime = teeterTotter(30, time / 2);
    if (
        Math.abs(sectorX) < Math.abs(sectorTime) &&
        Math.abs(sectorY) < Math.abs(sectorTime)
        ) {
        return 200;
    }
    return 0;
};

const teeterTotter = (max, current) => {
    const x2 = current % (max * 2);
    const x1 = current % max;
    return (x2 > x1) ? max - x1 : x1;
}