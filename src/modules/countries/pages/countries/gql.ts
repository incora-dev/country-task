import gql from "graphql-tag"

export const GET_COUNTRIES = gql`
query GetCountries($filter: CountryFilterInput) {
  countries (filter: $filter) {
    capital,
    name,
    continent {
      name
    },
    code,
    emoji,
    currency
  }
}`