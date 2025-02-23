/**
 *
 * @author Marcus och Tobias
 */

const challengeSort = {
	ratingArray: [],
	currentPath: window.location.pathname,
/**
	 * Display error message if challenges dont load 
	 */
	displayErrorMessage(message) {
		function addErrorToContainer(container, message) {
			if (container) {
				cardContainer.innerHTML = '';
				const errorMessage = document.createElement('p');
				errorMessage.classList.add('error-message');
				errorMessage.textContent = message;
				container.appendChild(errorMessage);
			}
		}
		const cardContainer = document.querySelector('.card__container');
		addErrorToContainer(cardContainer, message);

	},
	/**
	 * Function to read from api. 
	 */
	async getApiToArray() {
		let successful = false;
		try {
			const res = await fetch ('https://lernia-sjj-assignments.vercel.app/api/challenges'); 
			const data = await res.json();
			this.ratingArray = data.challenges;
			successful = true;
		} catch (error) {
			console.error('Error in getApiToArray', error);
			this.displayErrorMessage('Failed to load challenges')
		} finally {
			if (!successful) {
				this.ratingArray = [];
			}
		}

		return this.ratingArray;
	},

	

	/**
	 * Function to sort rating in descending order.
	 */
	sortAscendingOrder() {
		this.ratingArray.sort((a, b) => b.rating - a.rating);
	},
	/**
	 * Function to create img for div.
	 * */
	appendImg(imageUrl) {
		const img = document.createElement("img");
		img.classList.add("card__image");
		img.src = `${imageUrl}`;
		img.alt = "";
	},
	/**
	 * Function to convert numbers into stars.
	 */
	getStars(counter, fullStars, hasHalfStar) {
		const starImg = document.createElement("img");
		starImg.classList.add("starholder__item");
		if (counter <= fullStars) {
			starImg.src = "./images/star.png";
		} else if (hasHalfStar === true && counter === fullStars + 1) {
			starImg.src = "./images/half-star.png";
		} else {
			starImg.src = "./images/star-empty.png";
		}

		return starImg;
	},
	/**
	 * Function to create image for card.
	 */
	createImg(imgSrc) {
		const img = document.createElement("img");
		img.classList.add("card__image");
		img.src = `${imgSrc}`;
		img.alt = "A hacker sits turned away at a computer";
		return img;
	},
	/**
	 * Function to create title for the cards.
	 */
	createTitle(title) {
		const h3 = document.createElement("h3");
		h3.innerHTML = title;
		h3.classList.add("card__title");
		return h3;
	},
	/**
	 * Function to create a button.
	 */
	createBtn(btnParam, btnId) {
		const btn = document.createElement("a");
		btn.classList.add("button");
		btn.classList.add("red-button-small");
		btn.classList.add("open-button");
		btn.role = "link";
		btn.href = "#";
		const online = "Take challenge online";
		const onsite = "Book this room";
		btn.id = btnId;
		if (btnParam === "online") {
			btn.innerHTML = online;
		} else {
			btn.innerHTML = onsite;
		}

		return btn;
	},
	/**
	 * Function to create a challenge card.
	 */
	// this current path = /HACKER-ESCAPEROOM/
	createChallenge() {
		// #TODO
		console.log(this.currentPath)
		// 
		if (this.currentPath == "/" || this.currentPath === "/index.html" || this.currentPath == "/HACKER-ESCAPEROOM/" || this.currentPath == "/HACKER-ESCAPEROOM/index.html") {
			const cardContainer = document.querySelector(".card__container");

			/* loop through the three highest rated */
			for (let i = 0; i < 3; i++) {
				/* create div for card */
				const cardDiv = document.createElement("div");
				cardDiv.classList.add("card"); //add class for card

				/* create  div card__body */
				const divCardBody = document.createElement("div");
				divCardBody.classList.add("card__body");

				//create div for h3 and i with fontawesome inside
				const fontHeaderDiv = document.createElement('div');
				fontHeaderDiv.classList.add('card__layout')


				/* h3 title */
				const h3String = `${this.ratingArray[i].title} (${this.ratingArray[i].type})`;
				console.log(this.ratingArray[i].type)
				fontHeaderDiv.append(this.createTitle(h3String))
				//divCardBody.append(fontHeaderDiv)
				/* divCardBody.append(this.createTitle(h3String)); */ //append to div where text is placed inside card

				//Add font for online or onsite icon.
				const fontAwesome = document.createElement('i');
				fontAwesome.classList.add('font-icon')

				if (this.ratingArray[i].type === 'online') {
					fontAwesome.classList.add('fa-solid', 'fa-earth-europe');
				} else {
					fontAwesome.classList.add('fa-solid', 'fa-house');
				}
				fontHeaderDiv.append(fontAwesome)
				divCardBody.append(fontHeaderDiv)

				/* Create div for rating and participants */
				const cardReview = document.createElement("div");
				cardReview.classList.add("card__review");
				divCardBody.append(cardReview);

				/* create rating stars div */
				const starHolder = document.createElement("div");
				starHolder.classList.add("card__starholder");

				//create span
				const holder = document.createElement("div");
				holder.classList.add("card__starholder");
				cardReview.append(holder);

				/* values to check for full stars */
				let counter = 1;
				const fullStars = Math.floor(this.ratingArray[i].rating);
				const hasHalfStar = this.ratingArray[i].rating - fullStars === 0.5;

				/* create spans and img for stars */
				for (let i = 0; i < 5; ++i) {
					//create span
					const span = document.createElement("span");
					holder.append(span);

					//create the stars
					const stars = this.getStars(counter, fullStars, hasHalfStar);
					counter++;
					span.append(stars);
				}

				/* Create participants div */
				const participantDiv = document.createElement("div");
				participantDiv.classList.add("card__participants");
				participantDiv.innerHTML = `${this.ratingArray[i].minParticipants}-${this.ratingArray[i].maxParticipants} participants`;
				cardReview.append(participantDiv);

				/* Create text and div to contain text */
				const divTxt = document.createElement("div");
				divTxt.classList.add("card__description");
				const txt = document.createElement("p");
				const paraString = this.ratingArray[i].description;
				txt.innerHTML = paraString;

				divTxt.append(txt);
				divCardBody.append(divTxt);

				/* Create div for button */
				const btnDiv = document.createElement("div");
				btnDiv.classList.add("card__link");

				/* Create button and append it to a div*/
				console.log(this.ratingArray[i].id);
				btnDiv.append(this.createBtn(this.ratingArray[i].type, this.ratingArray[i].id));

				/* append divs for cards */
				cardContainer.append(cardDiv);
				cardDiv.append(this.createImg(this.ratingArray[i].image));
				cardDiv.append(divCardBody);
				divCardBody.append(btnDiv);
			}
		}
	},
	/**
	 * Function to read from array and dynamically make challenge cards.
	 */
	createChallengeCardsToFilter(challengeArray) {
		const currentPath = window.location.pathname; // fetch challenges.html
		const contentContainer = document.querySelector(".api-challenges"); // Show challenges

		// Dynamic loading of challenges.js only if location is challenge.html

		if (this.currentPath.includes("challenges.html")) {
			try {
				// Create new container for API
				const newContent = document.createElement("div");
				newContent.id = "content";

				if (challengeArray.length === 0) {
					const backToTopButton = document.querySelector('#backToTopButton');
					const noMatchingChallenges = document.createElement("h2");

					noMatchingChallenges.id = "noChallengeh2";
					noMatchingChallenges.textContent = "No matching challenges";
					newContent.appendChild(noMatchingChallenges);

					//insert h2 no matching before button
					contentContainer.insertBefore(newContent, backToTopButton);
					return;
				}

				challengeArray.forEach((challenge) => {
					// Write out the order of challenge
					const challengeItem = document.createElement("div");
					challengeItem.classList.add("card"); // classes for challenges

					// Create card structure manually instead of innerHTML
					const img = document.createElement("img");
					img.classList.add("card__image");
					img.src = challenge.image;
					img.alt = challenge.title;

					const cardBody = document.createElement("div");
					cardBody.classList.add("card__body");

					// create div card__layout
					const fontHeaderDiv = document.createElement('div');
					fontHeaderDiv.classList.add('card__layout')

					//creates h3
					const title = document.createElement("h3");
					title.classList.add("card__title");
					title.textContent = `${challenge.title} (${challenge.type === "onsite" ? "on-site" : "online"
						})`;

					//append h3 to .card__layout
					fontHeaderDiv.append(title)

					//create fontawsome icon and append to card__layout
					const fontAwesome = document.createElement('i');
					fontAwesome.classList.add('font-icon');

					if (challenge.type === 'online') {
						fontAwesome.classList.add('fa-solid', 'fa-earth-europe');
					} else {
						fontAwesome.classList.add('fa-solid', 'fa-house');
					}

					//append to .card__layout
					fontHeaderDiv.append(fontAwesome)


					const review = document.createElement("div");
					review.classList.add("card__review"); //Adding cardparticipants in review

					//creates div to hold the stars for card__review
					const starHolder = document.createElement("div");
					starHolder.classList.add("card__starholder");

					// create span and append stars
					for (let i = 1; i <= 5; ++i) {
						// create span
						const span = document.createElement("span");

						// check full star or half star or empty star.
						const fullStars = Math.floor(challenge.rating); // gives the value of fullStars
						const hasHalfStar = challenge.rating - fullStars === 0.5; // true if halfStar

						// create image
						const starImg = document.createElement("img");
						/* starImg.classList.add('card__image'); */
						starImg.classList.add("starholder__item");
						starImg.alt = "";

						//compare half or hole star and decides which star.
						if (i <= fullStars) {
							starImg.src = "./images/star.png";
						} else if (hasHalfStar === true && i === fullStars + 1) {
							starImg.src = "./images/half-star.png";
						} else {
							starImg.src = "./images/star-empty.png";
						}

						// append star to span
						span.append(starImg);

						// append span to starHolder
						starHolder.appendChild(span);
					}

					// creates text for participants.
					const participants = document.createElement("div");
					participants.classList.add("card__participants");
					participants.textContent = `${challenge.minParticipants} - ${challenge.maxParticipants} participants`;

					//append starHolder to review before participants
					review.append(starHolder);
					review.appendChild(participants);

					const description = document.createElement("div");
					description.classList.add("card__description");
					const p = document.createElement("p");
					p.textContent = challenge.description; // Challenge description
					description.appendChild(p);

					const link = document.createElement("div");
					link.classList.add("card__link");
					const button = document.createElement("a");

					button.classList.add("button", "red-button-small", "open-button");
					button.textContent = `${challenge.type === "onsite" ? "Book this room" : "Take challenges online"
						}`;
					button.id = `${challenge.id}`;
					link.appendChild(button);

					// To show in order
					cardBody.appendChild(fontHeaderDiv);
					cardBody.appendChild(review);
					cardBody.appendChild(description);
					cardBody.appendChild(link);
					challengeItem.appendChild(img);
					challengeItem.appendChild(cardBody);
					newContent.appendChild(challengeItem);
				});

				// The new content is between header & footer
				contentContainer.appendChild(newContent);

				// Temporary back to top button
				const backButtonDiv = document.createElement("div");
				const backButton = document.createElement("button");
				backButton.id = "backToTopButton";
				backButton.addEventListener("click", () => {
					window.scrollTo({ top: 0, behavior: "smooth" });
				});
				const divChallenges = document.querySelector("#content")
				console.log(divChallenges)
				backButtonDiv.appendChild(backButton);

				divChallenges.append(backButton);

				//Error message in console if error occurs
			} catch (error) {
				console.error("Error fetching challenges:", error);
			}
		}
	},
};

export { challengeSort };

//Export for testing 
export const getApiToArray = challengeSort.getApiToArray.bind(challengeSort);

//export individuall function
const createChallengeCards = challengeSort.createChallengeCardsToFilter.bind(challengeSort);
export { createChallengeCards };
