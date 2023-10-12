const apiURL = 'http:s://barbill-api.onrender.com'

export const fetchAllProducts = async (accessToken) => {
    try {
        const res = await fetch(`${apiURL}/products`, {
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

export const fetchAddProduct = async (accessToken, payload) => {
    const { name, category, quantity, price } = payload
    try {
        const res = await fetch(`${apiURL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({ name, category, quantity, price })
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchUpdateProduct = async (accessToken, payload, productId) => {
    const { name, category, quantity, price } = payload
    try {
        const res = await fetch(`${apiURL}/products/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({ name, category, quantity, price })
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchDeleteProduct = async (accessToken, productId) => {
    try {
        const res = await fetch(`${apiURL}/products/${productId}`, {
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

export const fetchSetPopular = async (accessToken, productId) => {
    try {
        const res = await fetch(`${apiURL}/products/${productId}/popular`, {
            method: 'PATCH',
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