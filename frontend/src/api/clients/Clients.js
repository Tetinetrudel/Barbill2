const apiURL = 'https://barbill-api.onrender.com'

export const fetchAllClients = async (accessToken) => {
    try {
        const res = await fetch(`${apiURL}/clients`, {
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

export const fetchClientDetails = async (accessToken, clientId) => {
    try {
        const res = await fetch(`${apiURL}/clients/${clientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            }
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchUpdateClient = async (accessToken, payload, clientId) => {
    try {
        const { updatedName, updatedEmail } = payload
        const res = await fetch(`${apiURL}/clients/${clientId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({ updatedName, updatedEmail})
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchAddProductToClient = async (accessToken, clientId, productId) => {
    try {
        const res = await fetch(`${apiURL}/clients/${clientId}/bill`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({ productId })
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}
export const fetchDeleteClient = async (accessToken, clientId) => {
    try {
        const res = await fetch(`${apiURL}/clients/${clientId}`, {
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
 
export const fetchAddClient = async (accessToken, payload) => {
    try {
        const { fullname, email } = payload
        const res = await fetch(`${apiURL}/clients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({ fullname, email})
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchRemoveProductFromClient = async (clientId, productId) => {
    try {
        const res = await fetch(`${apiURL}/clients/${clientId}/remove-product`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId })
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchCardCountMinus = async (clientId, cardId) => {
    try {
        const res = await fetch(`${apiURL}/clients/${clientId}/minus-cards`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cardId })
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchCardCountPlus = async (clientId, cardId) => {
    try {
        const res = await fetch(`${apiURL}/clients/${clientId}/plus-cards`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cardId })
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}