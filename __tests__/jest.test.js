import fetchMock from "jest-fetch-mock";
import { getApiToArray } from "../challenges.js";

fetchMock.enableMocks();

beforeEach(() => {
	fetch.resetMocks();
});

test("getApiToArray makes API call and returns data", async () => {
	fetch.mockResponseOnce(JSON.stringify({ challenges: [] }));

	const data = await getApiToArray();

	expect(fetch).toHaveBeenCalledWith("https://lernia-sjj-assignments.vercel.app/api/challenges");

	expect(data).toEqual([]);
});

test("getApiToArray returns an empty array when API call fails", async () => {
	fetch.mockReject(() => Promise.reject("API is down"));

	const data = await getApiToArray();

	expect(fetch).toHaveBeenCalledWith("https://lernia-sjj-assignments.vercel.app/api/challenges");
	// Empty array returns when error
	expect(data).toEqual([]);
});

test("getApiToArray logs an error message when API call fails", async () => {
	const consoleSpy = jest.spyOn(console, "error");
	fetch.mockReject(() => Promise.reject(new Error("API is down"))); //Added (new Error ) because that is an object and test failed when it was a string

	await getApiToArray();

	expect(consoleSpy).toHaveBeenCalledWith("Error in getApiToArray", expect.any(Error));

	consoleSpy.mockRestore();
});
