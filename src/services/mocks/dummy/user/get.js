export default (req) => {
    const current = JSON.parse(sessionStorage.getItem('staff') || {})
    return {
        ...current
    }
}