import { FlightModel } from "./flight.model"

export interface RasaModel {
    recipient_id: string
    image: string | null
    attachment: FlightModel[] | null
    text: string | null
}
