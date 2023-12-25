
import { fakerZH_CN as faker } from '@faker-js/faker';

const createEvent = () => {
    return {
        id: faker.string.uuid(),
        fee: faker.commerce.price({ min: 100, max: 200 }),
        date: faker.date.future(),
        name: faker.commerce.productName(),
        image: faker.image.urlLoremFlickr({ category: 'nature' }),
        descript: faker.commerce.productDescription(),
        address: faker.location.streetAddress(true),
        location: [faker.location.latitude(), faker.location.longitude()],
    };
};
export default async (req) => {  
    // const { request } = req
    // const { name } = await request.json()
    return {
        code: 1,
        data: faker.helpers.multiple(createEvent, { count: 5 })
    }
}