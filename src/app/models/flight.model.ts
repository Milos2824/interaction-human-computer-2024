export interface FlightModel {
    "id": number
    "type": {
        "id": number,
        "name": string
    },
    "flightKey": string,
    "flightNumber": string,
    "destination": string,
    "scheduledAt": string,
    "estimatedAt": string | null,
    "connectedType": string,
    "connectedFlight": string | null,
    "plane": string | null,
    "gate": string | null,
    "terminal": string | null
}