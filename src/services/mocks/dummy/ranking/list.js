import { fakerZH_CN as faker } from '@faker-js/faker'
// import moment from 'moment'

function createPlayer(_, index) {
    // const { startDate, endDate } = params
    return {
      id: `id-${index}`,
      name: faker.person.lastName() + faker.person.firstName(),
      avatar: faker.image.avatar(),
      address: faker.location.streetAddress(true),
      // descript: `自定义赛事(${moment(startDate).format('YYYY/MM/DD')}-${moment(endDate).format('YYYY/MM/DD')})`,
      location: [faker.location.latitude(), faker.location.longitude()],
      phone: faker.phone.number(),
    }
}
export default (context) => {
  const { params } = context
  const data = faker.helpers.multiple(createPlayer, { count: 16 })
  return {
    code: 1,
    data,
  }
}
