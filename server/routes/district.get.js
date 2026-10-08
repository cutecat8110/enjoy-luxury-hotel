import zipcodes from '../../data/zipcodes.json'
export default defineEventHandler((event) => {
  const { city, zip_code: zipcode } = getQuery(event)
  return {
    data: zipcodes
      .filter(
        (item) => (!city || item.city === city) && (!zipcode || item.zipcode === Number(zipcode))
      )
      .map((item) => ({ zip_code: String(item.zipcode), city: item.city, district: item.district }))
  }
})
