$(document).ready(function () {
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
	let currentHour = moment().format("hA");
	$(".timeblock").each(function () {
		let hour = $(this).find("label").text();
		let hourMoment = moment(hour, "hA");
		if (hourMoment.isBefore(moment(currentHour, "hA"))) {
			$(this).addClass("past");
		} else if (hourMoment.isSame(moment(currentHour, "hA"))) {
			$(this).addClass("present");
		} else {
			$(this).addClass("future");
		}
	});

	// Save event to local storage when save button is clicked
	$(".saveBtn").on("click", function () {
		let hour = $(this).parent().find("label").text();
		let event = $(this).parent().find(".description").val();
		localStorage.setItem(hour, event);
		console.log(localStorage);
	});

	// Retrieve events from local storage
	$(".description").each(function () {
		let hour = $(this).closest(".timeblock").find("label").text();
		let event = localStorage.getItem(hour);
		$(this).val(event);
	});

	// Clear event from local storage when button is clicked
	$(".clearBtn").on("click", function () {
		let hour = $(this).parent().find("label").text();
		localStorage.removeItem(hour);
		$(this).parent().find(".description").val("");
	});
});
