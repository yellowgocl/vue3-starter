import { fakerZH_CN as faker } from '@faker-js/faker';
// faker.setLocale('zh_CN');
export default (req) => {
    const id = req.url.searchParams.get('id')
    const name = faker.person.lastName() + faker.person.firstName()
    return {
        code: 1,
        data: {
            id,
            name,
            phone: faker.phone.phoneNumber(),
            role: ['admin']
        }
    }
}