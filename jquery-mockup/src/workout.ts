import * as $ from 'jquery';

export class Workout {
    name: string;
    reps: number;
    sets: number;
    weight: number;
    weight_unit: string;
    time: number;
    time_unit: string;

    constructor(name: string) {
        this.name = name;
        this.reps = 0;
        this.reps = 0;
        this.weight = 0;
        this.weight_unit = "";
        this.time = 0;
        this.time_unit = "";
    }
}