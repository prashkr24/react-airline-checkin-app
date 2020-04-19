import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3001/checkInPassengers/";

export function getCheckInPassengers() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveCheckInPassenger(checkInPassengers) {
  return fetch(baseUrl + (checkInPassengers.id || ""), {
    method: checkInPassengers.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(checkInPassengers),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCheckInPassenger(checkInPassengersId) {
  return fetch(baseUrl + checkInPassengersId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
