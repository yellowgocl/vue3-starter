import { fakerZH_CN as faker } from '@faker-js/faker'

function createEvent(_, index) {
  const maximum = faker.helpers.arrayElement([16, 24, 32, 48]) // faker.number.int({ min: 16, max: 48 })
  return {
    id: `id-${index}`,
    fee: faker.commerce.price({ min: 100, max: 200 }),
    date: faker.date.future(),
    name: `赛事-${index}`, // faker.commerce.productName(),
    image: faker.image.urlLoremFlickr({ category: 'nature' }),
    address: faker.location.streetAddress(true),
    descript: faker.commerce.productDescription(),
    location: [faker.location.latitude(), faker.location.longitude()],
    maximum,
    joined: index === 2 ? maximum : faker.number.int(maximum)
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
