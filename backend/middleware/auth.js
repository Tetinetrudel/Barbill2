
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN = '17f6c87decfec54cf18b23992b3824a43a6b9c8be5ddcd9483300f06cfee8447f092fd70d0b66910d0c35825a1bfed922cf3dfb49a50066a3bdbc32ca8d61cb5' 

const requireLogin = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: `Vous n'êtes pas autorisé. SVP, veuillez vous cennecter` })
  }

  const accessToken = authorizationHeader.split(' ')[1]

  jwt.verify(accessToken, ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: `Jeton d'accès invalide ou expiré` })
    }

    req.userId = decoded.userId
    return next()
  })
}

export default requireLogin
