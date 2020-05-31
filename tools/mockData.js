const passengers = []

const ancillaryServices = [
    { flight: 1, service: 'Special Meal', id: 1 },
    { flight: 1, service: 'Shopping Item 1', id: 2 },
    { flight: 1, service: 'Shopping Item 2', id: 3 },
]

const checkInPassengers = [
    {
        id: 1,
        flight: 1,
        passenger: 1,
        service: 1,
        checkedIn: 1,
        seatno: 'A101',
    },
    {
        id: 2,
        flight: 1,
        passenger: 2,
        service: 1,
        checkedIn: 1,
        seatno: 'A102',
    },
]

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
    passengers,
    ancillaryServices,
    checkInPassengers,
}
