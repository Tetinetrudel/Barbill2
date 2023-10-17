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

export const fetchAddCategory = async (accessToken, payload) => {
    const { name } = payload
    try {
        const res = await fetch(`${apiURL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({ name })
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchDeleteCategory = async (accessToken, categoryId) => {
    try {
        const res = await fetch(`${apiURL}/categories/${categoryId}`, {
            method: 'DELETE',
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