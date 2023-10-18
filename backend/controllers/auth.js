import Users from '../models/users.js'
import RefreshToken from '../models/refreshToken.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/* ne pas oublier de mettre ces données dans le .env */
const ACCESS_TOKEN = '17f6c87decfec54cf18b23992b3824a43a6b9c8be5ddcd9483300f06cfee8447f092fd70d0b66910d0c35825a1bfed922cf3dfb49a50066a3bdbc32ca8d61cb5' 
const REFRESH_TOKEN = '88e3806d475bc4d55e49f9150e1ead7a50ce455270f599580c478409b97810ffccdcc2b7e283973d68b9cd5eabac0e1402a898b3de7bb63a5f66e99e67612adc' 
const ACCESS_TOKEN_EXPIRATION_TIME = '6h'
const REFRESH_TOKEN_EXPIRATION_TIME = '30d'

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

        const accessToken = jwt.sign({ userId: user._id }, ACCESS_TOKEN, {
            expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
        })
  
        const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN, {
            expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
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
