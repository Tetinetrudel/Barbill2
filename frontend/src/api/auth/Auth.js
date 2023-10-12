const apiURL = 'https://barbill-api.onrender.com'

export const fetchLogin = async (email, password) => {
    try {
        const res = await fetch(`${apiURL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchRegister = async (company, email, password, confirmPassword) => {
    try {
        const res = await fetch(`${apiURL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ company, email, password, confirmPassword })
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}