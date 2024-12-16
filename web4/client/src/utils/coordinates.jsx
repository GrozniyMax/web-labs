export function convert({currentValue, currentMin, currentMax, futureMin, futureMax}) {
    return (currentValue - currentMin) / (currentMax - currentMin) * (futureMax - futureMin) + futureMin;
}
