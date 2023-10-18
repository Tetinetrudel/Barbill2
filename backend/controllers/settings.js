import Settings from '../models/settings.js'

export const getSettings = async (req, res) => {
    const userId = req.userId
    try {
        const settings = await Settings.find({ user: userId })
        if(!settings) {
            return res.status(404).json({ message: `Aucun paremêtre existant`})
        }
        res.status(200).json({ success: true, settings})
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}

export const updateSettings = async (req, res) => {
    const userId = req.userId
    try {
        const settings = await Settings.find({ user: userId })
        settings.employee = !settings.employee
        await settings.save()
        res.status(200).json({ success: true })
    } catch (error) {
        console.error('Erreur lors de la connexion', error)
        res.status(500).json({ message: 'Problème interne au server' })
    }
}