/**
 * @author Jörgen Lindström
 */

const modal = document.querySelector("#modal");
const openModal = document.querySelectorAll(".open-button");
const closeModal = document.querySelector(".close-modal-button");
const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
const submitButton = multiStepForm.querySelector(".booking-card__button--submit");
const nextButton = multiStepForm.querySelector(".booking-card__button--next");
const dateInput = multiStepForm.querySelector("#simple");
const timeSelect = multiStepForm.querySelector("#time");
const participantsSelect = multiStepForm.querySelector("#participants");
const challengeInput = multiStepForm.querySelector("#challenge");
const header1 = multiStepForm.querySelector("#header1");
const header2 = multiStepForm.querySelector("#header2");

import { ApiArray as events } from "../main.js";

// global variable to get id from challenge button.
let eventId;
// goes through all classes of .open-button and gets rooms number."

// new code
const container = document.querySelector(".api-challenges");

container.addEventListener("click", (event) => {
	if (event.target && event.target.classList.contains("open-button")) {
		modal.showModal();
		eventId = parseInt(event.target.getAttribute("id"));
		const eventDetails = events.find((event) => event.id === eventId);
		header1.textContent = `Book room "${eventDetails.title}" (step 1)`;

		if (challengeInput) {
			challengeInput.value = eventId;
		} else {
			console.error("The inputfield could not be found");
		}
	}
	if (event.target && event.target.classList.contains("card__container")) {
		modal.showModal();
		eventId = parseInt(event.target.getAttribute("id"));
		const eventDetails = events.find((event) => event.id === eventId);
		header1.textContent = `Book room "${eventDetails.title}" (step 1)`;

		if (challengeInput) {
			challengeInput.value = eventId;
		} else {
			console.error("The inputfield could not be found");
		}
	}
});

closeModal.addEventListener("click", () => {
	location.reload();
	modal.close();
});

nextButton.addEventListener("click", () => {
	const eventDetails = events.find((event) => event.id === eventId);
	header2.textContent = `Book room "${eventDetails.title}" (step 2)`;
	const date = dateInput.value;

	fetchAvailableTimes(date, eventId);

	// Fill select with number of participants
	participantsSelect.innerHTML = ""; // Clear previous options
	for (let i = 1; i <= eventDetails.maxParticipants; i++) {
		const option = document.createElement("option");
		option.value = i;
		option.textContent = i + " participants";
		participantsSelect.appendChild(option);
	}
});

const simple = new Datepicker("#simple");

let currentStep = formSteps.findIndex((step) => {
	return step.classList.contains("active");
});

if (currentStep < 0) {
	currentStep = 0;
	showCurrentStep();
}

multiStepForm.addEventListener("click", (e) => {
	if (e.target.matches("[next-data]")) {
		currentStep += 1;
	} else if (e.target.matches("[data-previous]")) {
		timeSelect.innerHTML = "";
		currentStep -= 1;
	}
	showCurrentStep();
});

function showCurrentStep() {
	formSteps.forEach((step, index) => {
		step.classList.toggle("active", index === currentStep);
	});
}

////////////////////////////// FETCH AVAILABLE TIMESLOTS ///////////////////////

async function fetchAvailableTimes(date, challenge) {
	try {
		const res = await fetch(
			`https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${date}&challenge=${challenge}`
		);
		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}

		const data = await res.json();
		console.log(data.slots, "this is time slots");

		if (Array.isArray(data.slots)) {
			data.slots.forEach((slot) => {
				const option = document.createElement("option");
				option.value = slot; // Sets the value for <option>
				option.textContent = slot; // Sets the text displayed in <option>
			
				timeSelect.appendChild(option); // Adds <option> in <select>
	
			});
		} else {
			console.log("No slots are available or slots is not an array");
		}
	} catch (error) {
		console.error("Error fetching available times", error);
	}
}

/////////////////////////////////  SUBMIT FORM ////////////////////////////////

multiStepForm.addEventListener("submit", (e) => {
	e.preventDefault(); // prevent form submission

	const formData = new FormData(multiStepForm);
	const sendingData = Object.fromEntries(formData);

	let participants = parseInt(sendingData.participants);
	let challenge = parseInt(sendingData.challenge);

	//////////////////////////////// POST DATA TO API /////////////////////////

	async function sendBooking(formData) {
		const res = await fetch(
			"https://lernia-sjj-assignments.vercel.app/api/booking/reservations",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					challenge: challenge,
					name: sendingData.name.toString(),
					email: sendingData.email.toString(),
					date: sendingData.date.toString(),
					time: sendingData.time.toString(),
					participants: participants,
				}),
			}
		);
		const data = await res.json();
		console.log(data);
	}
	sendBooking(formData);

	/////////////////////////////////// SHOW COMPLETESIGN //////////////////////////////
  
	submitButton.disabled = true;
	submitButton.textContent = "Submitting...";

	// mimic a server request
	setTimeout(() => {
		multiStepForm.querySelector(".multi-step-form__completed").hidden = false;
	}, 3000);
});
