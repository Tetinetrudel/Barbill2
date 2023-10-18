import { apiURL } from "../../utils/apiRoute"

export const fetchGetSettings = async (accessToken) => {
    try {
        const res = await fetch(`${apiURL}/settings`, {
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