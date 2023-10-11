import Users from '../models/users.js'

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

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { company, email } = req.body
        const pictureFile = req.file.originalname;

        const updateUser = await Users.findByIdAndUpdate(
            {_id: id},
            {
                company,
                email,
                picture: pictureFile,
            },
            { new: true}
        )
        console.log(updateUser)
        return res.status(200).json({ success: true, updateUser})
           
    } catch (error) {
        console.error(`Erreur lors de l'enregistrement`, error)
        return res.status(500).json({ message: 'Erreur interne au serveur' })
    }
}