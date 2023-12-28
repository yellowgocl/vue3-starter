export default async (req) => {
  const { request } = req
  const { name } = await request.json()
  return {
    code: 1,
    data: {
      token: `dummy-token ${name}`,
    },
  }
}
