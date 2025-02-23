import { createChallengeCards } from "./challenges.js";
import { ApiArray as array } from "./main.js";

const filterWindow = document.querySelector(".filterWindow");
filterWindow.addEventListener("change", filterFunctionWindow);


// Add input event listener for the search input field
const searchInput = filterWindow.querySelector('input[type="text"]');
if (searchInput) {
    searchInput.addEventListener("input", filterFunctionWindow);  // Trigger filter on every input
}


// querystring-filter

// get query from ur
function getUrlQuery() {
	// sets the query string in variable this everythign after ? in url
	const url = new URLSearchParams(window.location.search);
	return {
		filter: url.get("filter") || "",
	};
}
// check for query on page load and apply filter
function applyQueryFilter() {
	const { filter } = getUrlQuery();
	if (filter === "online") {
		// check online checkbox
		const onlineCheckbox = filterWindow.querySelector('input[value="online"]');
		if (onlineCheckbox) {
			onlineCheckbox.checked = true;
		}
	} else if (filter === "onsite") {
		// check onsite checkbox
		const onsiteCheckbox = filterWindow.querySelector('input[value="onsite"]');
		if (onsiteCheckbox) {
			onsiteCheckbox.checked = true;
		}
	}
	filterFunctionWindow();
}

applyQueryFilter();
// querystring-filter


function filterFunctionWindow() {
    // Get the value of the search input inside filterWindow
    const searchInput = filterWindow.querySelector('input[type="text"]');
    const searchValue = searchInput ? searchInput.value.trim() : "";

    // Get the selected type (online or onsite or both)
    const selectedTypes = Array.from(
        filterWindow.querySelectorAll('input[name="activeItems"]:checked')
    ).map((checkbox) => checkbox.value);

    // Get all checked checkboxes for tags
    const checkedTagCheckboxes = Array.from(
        filterWindow.querySelectorAll('input[name="tags"]:checked')
    );
    const selectedTags = checkedTagCheckboxes.map((checkbox) => checkbox.value);

    // Get the selected min and max rating values (from radio buttons)
    const minRating = filterWindow.querySelector('input[name="minRating"]:checked')?.value;
    const maxRating = filterWindow.querySelector('input[name="maxRating"]:checked')?.value;

    // Apply filter logic
    const filterData = array.filter((card) => {
        let matches = true;

        // Only apply the search term filter if there is a valid search term (3+ characters)
        if (searchValue.length >= 3) {
            if (
                !(
                    card.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                    card.description.toLowerCase().includes(searchValue.toLowerCase())
                )
            ) {
                matches = false;
            }
        }

        // Apply filters for selected tags
        if (selectedTags.length > 0 && !selectedTags.every((tag) => card.labels.includes(tag))) {
            matches = false;
        }

        // Apply filters for rating (min and max)
        if (minRating && card.rating < parseFloat(minRating)) {
            matches = false;
        }
        if (maxRating && card.rating > parseFloat(maxRating)) {
            matches = false;
        }

        // Apply filters for selected types
        if (selectedTypes.length > 0 && !selectedTypes.includes(card.type)) {
            matches = false;
        }

        return matches;
    });

    clearCards();
    createChallengeCards(filterData);
}

function clearCards() {
    const content = document.querySelector("#content");
    if (content) {
        content.remove();
    }
}

// Reset Button
const resetBtn = document.querySelector("#resetFilters");

resetBtn.addEventListener("click", () => {
    // Reset the search input field
    const searchInput = filterWindow.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.value = "";
    }

    // Uncheck all tag checkboxes
    const tags = filterWindow.querySelectorAll('input[name="tags"]');
    tags.forEach((checkbox) => {
        checkbox.checked = false;
    });

    // Uncheck all active items checkboxes
    const activeCheckbox = filterWindow.querySelectorAll("input[name='activeItems']");
    activeCheckbox.forEach((checkbox) => {
        checkbox.checked = false;
    });

    // Uncheck all rating stars
    const maxStars = filterWindow.querySelectorAll('input[name="maxRating"]');
    maxStars.forEach((star) => {
        star.checked = false;
    });

    const minStars = filterWindow.querySelectorAll('input[name="minRating"]');
    minStars.forEach((star) => {
        star.checked = false;
    });

    // Clear the cards and display all the data
    clearCards();
    createChallengeCards(array);
});