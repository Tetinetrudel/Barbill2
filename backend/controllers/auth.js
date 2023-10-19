import Users from '../models/users.js'
import RefreshToken from '../models/refreshToken.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await Users.findOne({ email })
        if(!user) {
            return res.status(404).json({ message: `L'usager n'a pas été trouvé` })
        }

        const isPwdValid = await bcrypt.compare(password, user.password)
        if (!isPwdValid) {
            return res.status(401).json({ message: `Les données d'identifications sont erronées`})
        }

        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN , {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
        })
  
        const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN , {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        })
  
        const newRefreshToken = new RefreshToken({ token: refreshToken })
        await newRefreshToken.save()

        const userWithoutPassword = { ...user.toObject() }
        delete userWithoutPassword.password
  
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, 
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, 
        })
  
        return res.status(200).json({ 
            success: true, 
            message: 'Connexion réussi', 
            accessToken: `Bearer ${accessToken}`, 
            user: userWithoutPassword
        })
        
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const register = async (req, res) => {
    const { company, email, password, confirmPassword } = req.body

    try {
        const existingUser = await Users.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Cette email est déjà utilisé' })
        }

        if(password !== confirmPassword) {
            return res.status(400).json({ message: 'Les deux mot de passe doivent être identique'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new Users({
            company,
            email,
            password: hashedPassword,
        })
        
        const user = await newUser.save()

        return res.status(200).json({ success: true, message: `L'usager ${user.company} a été créé avec succès` });
  } catch (error) {
    console.error(`Erreur lors de l'enregistrement`, error)
    return res.status(500).json({ message: 'Erreur interne au serveur' })
  }
}
