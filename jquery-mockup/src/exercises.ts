import * as $ from "jquery";

export class exercise {
    text: string;
}

export class exerciseTracker {

    exerciseList: exercise[] = [];

    completedExercises: exercise[] = [];



    init() {
        return $.when(
            $.getJSON("/tracker/exercises").done(data => {
                this.exerciseList = data;
            })
        );
    }
    drawExercises() {
        $("#available-exercises").html(
            this.exerciseList.map(x => `<li class="list-group-item"><button type="button" class="btn btn-primary">Add</button><p style="display:inline-block" id="exerciseText">${x.text}</p></li>`).join("")
        );
    }

    drawCompletedExercises() {
        $("completed-exercises").html(
            this.completedExercises.map(x => `<li class="list-group-item">${x.text}</li>`).join("")
        )
    }
}

// Controller
var ExerciseTracker = new exerciseTracker();
ExerciseTracker.init().done(() => {
    ExerciseTracker.drawExercises();
    $("#available-exercises > li > button").click(function(e) {
        var exercise = $(this).next().text()
        $("#completed-exercises").append(x => `<li class="list-group-item">${exercise}</li>`);
    });

});