import countryList from 'react-select-country-list'

export const getUserCountry = (country?: string) =>
  country ? { value: country, label: countryList().getLabel(country) } : undefined
