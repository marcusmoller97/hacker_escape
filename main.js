/* import { challengeSort } from "./challenges_rating_sort.js"; */

import { challengeSort } from "./challenges.js";

const mainNavContainer = document.querySelector(".main-nav__container");

const btnOpen = document.querySelector(".btnOpen");
const btnClose = document.querySelector(".btnClose");

btnOpen.addEventListener("click", () => {
	mainNavContainer.classList.add("main-nav__container--active");
	filterWindow.classList.remove("filterWindow--active");
	filterBtnDiv.classList.remove("filterBtn--hidden");
});

btnClose.addEventListener("click", () => {
	mainNavContainer.classList.remove("main-nav__container--active");
});

// read data from api and set it into ratingArray.

let ApiArray = challengeSort.ratingArray;
ApiArray = await challengeSort.getApiToArray();

// console.log(array);
// challengeSort.createSpanChallenge();
//

challengeSort.sortAscendingOrder();
export { ApiArray };
//

// document.addEventListener("DOMContentLoaded", createChallengeCards(array));

console.log(ApiArray);
// sort arrray in descending order.
/* console.log(challengeSort.ratingArray, "hello hello") */
// show the three highest cards.
document.addEventListener("DOMContentLoaded", challengeSort.createChallenge());

btnOpen.addEventListener("click", () => {
	mainNavContainer.classList.add("main-nav__container--active");
});

btnClose.addEventListener("click", () => {
	mainNavContainer.classList.remove("main-nav__container--active");
});

//FilterBtn open/close
// filterBtn  filterWindow
const filterBtnOpen = document.querySelector(".filterBtn");
const filterBtnClose = document.querySelector(".buttonX");
const filterWindow = document.querySelector(".filterWindow");
const filterBtnDiv = document.querySelector(".filterBtn__div");

if (challengeSort.currentPath.includes("challenges.html")) {
	filterBtnOpen.addEventListener("click", () => {
		filterWindow.classList.add("filterWindow--active");
		filterBtnDiv.classList.add("filterBtn--hidden");
	});

	// target the div to close
	filterBtnClose.addEventListener("click", () => {
		filterWindow.classList.remove("filterWindow--active");
		filterBtnDiv.classList.remove("filterBtn--hidden");
	});

	// show more tags
	document.querySelector("#show-more-tags-btn").addEventListener("click", (event) => {
		const extraTags = document.querySelector("#extra-tags");
		const button = event.target;

		if (extraTags.style.display === "none") {
			extraTags.style.display = "block";
			button.textContent = "Show Less";
		} else {
			extraTags.style.display = "none";
			button.textContent = "Show More";
		}
	});
}

/* Challenges loading from button (All online challenges & All on-site challenges) */
document.addEventListener(
	"DOMContentLoaded",
	challengeSort.createChallengeCardsToFilter(ApiArray),
	false
);
