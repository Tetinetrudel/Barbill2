
import jwt from 'jsonwebtoken'

const requireLogin = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: `Vous n'êtes pas autorisé. SVP, veuillez vous cennecter` })
  }

  const accessToken = authorizationHeader.split(' ')[1]

  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: `Jeton d'accès invalide ou expiré` })
    }

    req.userId = decoded.userId
    return next()
  })
}

export default requireLogin
