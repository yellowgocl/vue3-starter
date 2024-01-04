import { fakerZH_CN as faker } from '@faker-js/faker'
export default async (_) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      code: 1,
      data: { message: "报名成功" },
    }), 2000)
  })
}
