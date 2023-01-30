// Display current day at the top of the calendar
let currentDay = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(currentDay);

// Create timeblocks for standard business hours
let businessHours = [
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
];

for (let i = 0; i < businessHours.length; i++) {
    let hour = businessHours[i];
    let hourDiv = $("<div>").addClass("timeblock");
    let hourLabel = $("<label>").text(hour).addClass("time-of-day");
    let input = $("<input>").addClass("description");
    let saveBtn = $("<button>")
        .addClass("saveBtn")
        .html("<i class='fas fa-save'></i>");
    let clearBtn = $("<button>")
        .addClass("clearBtn")
        .html("<i class='fas fa-trash'></i>");
    hourDiv.append(hourLabel, input, saveBtn, clearBtn);
    $(".container").append(hourDiv);
}

// Color-code each timeblock based on past, present, or future
let currentHour = moment().format("ha");
$(".timeblock").each(function () {
    let hour = $(this).find("label").text();
    let hourMoment = moment(hour, "ha");
    if (hourMoment.isBefore(moment(currentHour, "ha"))) {
        $(this).addClass("past");
    } else if (hourMoment.isSame(moment(currentHour, "ha"))) {
        $(this).addClass("present");
    } else if (hourMoment.isSame(moment(currentHour, "ha"))) {
        $(this).addClass("present");
    } else {
        $(this).addClass("future");
    }
});

// TODO Save event to local storage when save button is clicked

// TODO Retrieve events from local storage
