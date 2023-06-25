import axios from 'axios'
import { CountryData } from '../types/countryData'

export function getCountry(id: string) {
  return axios
    .get<CountryData>(`https://schoolyb.github.io/v1/data/country/${id}.json`)
    .then(res => res.data)
}
// todo go back to using restcountries api
