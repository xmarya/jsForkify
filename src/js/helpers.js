import { TIMEOUT_SEC } from "./config";

// containing all functions that we reuse over and over
// in the project .

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data; // data is going to be the resolved value
    // of the promise that getJSON returns .
  } catch (error) {
    // we want to handle the err in model.js not here.
    // when we do it like this, the promise will be rejected.
    throw error;
  }
};

export const sendJSON = async function (url, newData) {
  try {
    const fetchProcess = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const response = await Promise.race([fetchProcess, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data; // data is going to be the resolved value
    // of the promise that getJSON returns .
  } catch (error) {
    // we want to handle the err in model.js not here.
    // when we do it like this, the promise will be rejected.
    throw error;
  }
};

// this function will be in race with getJSON,
// whatever occurs first will return it's promise (resolved or rejected).
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
