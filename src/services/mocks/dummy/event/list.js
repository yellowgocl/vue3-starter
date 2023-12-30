import { fakerZH_CN as faker } from '@faker-js/faker'

function createEvent(_, index) {
  return {
    id: `id-${index}`,
    fee: faker.commerce.price({ min: 100, max: 200 }),
    date: faker.date.future(),
    name: `赛事-${index}`, // faker.commerce.productName(),
    image: faker.image.urlLoremFlickr({ category: 'nature' }),
    address: faker.location.streetAddress(true),
    descript: faker.commerce.productDescription(),
    location: [faker.location.latitude(), faker.location.longitude()],
    maximum: 32,
  }
}
export const EVENT_LIST = faker.helpers.multiple(createEvent, { count: 5 })
export default async (_) => {
  // const { request } = req
  // const { name } = await request.json()
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      code: 1,
      data: EVENT_LIST,
    }), 2000)
  })
}
