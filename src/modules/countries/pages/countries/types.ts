import { CountryModel } from "../../../../models/country";

export interface GetCountryResponse {
    countries: CountryModel[];
}