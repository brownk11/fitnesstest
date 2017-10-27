import * as $ from 'jquery';

import { Workout } from "./workout.ts";
import { User } from "./user";

var table_row_count = 0;

export class TrackerEntry {
    user: User;
    workouts: Workout[] = [];
    myEntry: Workout[] = [];

    drawWorkouts() {
        $("#trackerWorkoutSelect").html(
            this.workouts.map(x => `<option>${x.name}</option>`).join("")
        );
    }

    init() {
        return $.when(
            $.getJSON("/trackerEntry/workouts").done( data => {
                this.workouts = data;
            }),
            $.getJSON("/trackerEntry/myEntry").done( data => {
                this.myEntry = data;
            })
        )
    }

    static fetchDetails(): Workout {
        var workout = new Workout("");
        
        workout.name = $("#trackerWorkoutSelect").val().toString();
        workout.reps = parseFloat($("#trackerRepCount").val().toString());
        workout.sets = parseFloat($("#trackerSetCount").val().toString());
        workout.weight = parseFloat($("#trackerWeight").val().toString());
        workout.weight_unit = $("#trackerWeightSelect").val().toString();
        workout.time = parseFloat($("#trackerTime").val().toString());   
        workout.time_unit = $("#trackerTimeSelect").val().toString();     
    
        if (Number.isNaN(workout.reps)) { workout.reps = 0; }
        if (Number.isNaN(workout.sets)) { workout.sets = 0; }
        if (Number.isNaN(workout.weight)) { workout.weight = 0; }
        if (Number.isNaN(workout.time)) { workout.time = 0; }
        
        return workout;
    }

    static logWorkout(workout: Workout) {
        table_row_count++;
        var markup = "<tr class='table-dark'><th scope='row' class='row-num'>" + table_row_count + "</th><td>" 
        + workout.name + "</td><td>" + workout.reps + "</td><td>" + workout.sets + "</td><td>"
        + workout.weight + " " + workout.weight_unit + "</td><td>" + workout.time + " "
        + workout.time_unit + "</td><td><input type='checkbox' name='remove'></td></tr>"
        $("#myWorkoutsTable tbody").append(markup);
    }
}

// Controller
const trackerEntry = new TrackerEntry();
var workout = new Workout("");

trackerEntry.init().done(()=>{
    trackerEntry.drawWorkouts();
});

$("#addWorkout").click(function() {
    workout = TrackerEntry.fetchDetails();
    TrackerEntry.logWorkout(workout);
})

$("#trackerSaveAdded").click(function(e) {
    e.preventDefault();
    if(confirm('Do you want to submit? Doing so will lose your added workouts.')) {
        $("#trackerAddWorkoutForm").submit();
    } else {
        return false;
    }
})

$("#removeAllCheck").click(function() {
    $("input[type='checkbox']").prop("checked", true);
});

$("#trackerDeleteChecked").click(function() {
    $("#myWorkoutsTable tbody").find("input[name='remove']").each(function() {
        if($(this).is(":checked")) {
            table_row_count--;
            $(this).parents("tr").remove();
        }
    });
    renumber();
});

function renumber() {
    table_row_count = 0;
    $("#myWorkoutsTable tbody").find(".row-num").each(function() {
        $(this).html("" + ++table_row_count);
    });
};

