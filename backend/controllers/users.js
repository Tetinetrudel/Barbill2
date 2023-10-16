import Users from '../models/users.js'
import bcrypt from 'bcrypt'

export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await Users.findOne({ _id: id })
        if(!user) {
            return res.status(404).json({ message: `L'usager n'a pas été trouvé`})
        }
        return res.status(200).json({ success: true, user})
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const updateUserPassword = async (req, res) => {
    try {
        const { id } = req.params
        const { company, email, password, newPassword } = req.body

        const user = await Users.findById(id)
        if(!user) {
            return res.status(404).json({ message: `${company} n'existe pas.`})
        }

        const isPwdValid = await bcrypt.compare(password, user.password)
        if(!isPwdValid) {
            return res.status(401).json(`Le mot de passe actuel n'est pas valide`)
        }
        
        if(newPassword === password) {
            return res.status(401).json({ message: `Le nouveau mot de passe ne doit pas être celui existant`})
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10)

        user.company = company
        user.email = email
        user.password = newHashedPassword

        const updatedUser = await user.save()

        return res.status(200).json({ success: true, message: `Modifications effectuées avec succès`, updatedUser })
           
    } catch (error) {
        console.error(`Erreur lors de l'enregistrement`, error)
        return res.status(500).json({ message: 'Erreur interne au serveur' })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { company, email } = req.body

        const user = await Users.findById(id)
        if(!user) {
            return res.status(404).json({ message: `${company} n'existe pas.`})
        }

        user.company = company
        user.email = email

        const updatedUser = await user.save()

        return res.status(200).json({ success: true, message: `Modifications effectuées avec succès`, updatedUser })
           
    } catch (error) {
        console.error(`Erreur lors de l'enregistrement`, error)
        return res.status(500).json({ message: 'Erreur interne au serveur' })
    }
}