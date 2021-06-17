import { SizeUnit } from "../types";

export const toImperial = (number: number): string => {
    return `${number} cm`;
}

export const toMetric = (number: number): string => {
    const calc = number / 2.54;
    return `${Math.floor(calc / 12)}' ${Math.round((calc % 12) * 10) / 10}"`;
}

export const toImperialAndMetric = (number: number): string => {
    const calc = number / 2.54;
    return `${toImperial(number)} / ${Math.floor(calc / 12)}' ${Math.round(calc % 12)}"`;
}

export const convertToUnit = (number: number, unit:SizeUnit): string => {
    return unit === SizeUnit.Imperial ? toImperial(number) : (
        unit === SizeUnit.Metric ? toMetric(number) : toImperialAndMetric(number)
    );
}


