export default (req) => {
    const current = JSON.parse(sessionStorage.getItem('staff') || {})
    throw { statusCode: 500, message: `just want to throw a error` }
    return {
        ...current
    }
}