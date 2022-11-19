import { faker } from '@faker-js/faker';
faker.setLocale('zh_CN');
export default (req) => {
    const { id } = req.body || {}
    if (!id) {
        throw { statusCode: 500, message: `id must could not be null. current: ${id}` }
    }
    const token = faker.datatype.uuid()
    const name = faker.name.lastName() + faker.name.firstName()
    return {
        id,
        name,
        phone: faker.phone.number(),
        token
    }
}
