const apiURL = 'http://localhost:5000'

export const fetchAllCategories = async (accessToken) => {
    try {
        const res = await fetch(`${apiURL}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}