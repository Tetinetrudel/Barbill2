import { apiURL } from '../../utils/apiRoute'

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