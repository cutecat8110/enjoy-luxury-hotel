import zipcodes from '../data/zipcodes.json'
export const cities = [...new Set(zipcodes.map((item) => item.city))]
export const findDistrict = (zipcode: number | string) =>
  zipcodes.find((item) => item.zipcode === Number(zipcode))
export const districtsForCity = (city: string) => zipcodes.filter((item) => item.city === city)
export const formatAddress = (address: { zipcode: number | string; detail: string }) => {
  const district = findDistrict(address.zipcode)
  return `${district?.city ?? ''}${district?.district ?? ''}${address.detail ?? ''}`
}
