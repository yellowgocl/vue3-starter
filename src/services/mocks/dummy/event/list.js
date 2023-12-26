
import { fakerZH_CN as faker } from '@faker-js/faker';

const createEvent = (_, index) => {
    return {
        id: faker.string.uuid(),
        fee: faker.commerce.price({ min: 100, max: 200 }),
        date: faker.date.future(),
        name: `赛事-${index}`, //faker.commerce.productName(),
        image: faker.image.urlLoremFlickr({ category: 'nature' }),
        descript: faker.commerce.productDescription(),
        address: faker.location.streetAddress(true),
        location: [faker.location.latitude(), faker.location.longitude()],
    };
};
export default async (req) => {  
    // const { request } = req
    // const { name } = await request.json()
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            code: 1,
            data: faker.helpers.multiple(createEvent, { count: 5 })
        }), 2000)
    })
}