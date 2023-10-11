import jwt from 'jsonwebtoken'
import RefreshToken from '../models/refreshToken.js'

const SECRET_KEY = '88e3806d475bc4d55e49f9150e1ead7a50ce455270f599580c478409b97810ffccdcc2b7e283973d68b9cd5eabac0e1402a898b3de7bb63a5f66e99e67612adc'
const JWT_EXPIRATION_TIME = '1h'

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.cookies

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' })
  }

  try {
    const decoded = jwt.verify(refreshToken, SECRET_KEY)

    const existingToken = await RefreshToken.findOne({ token: refreshToken })

    if (!existingToken) {
      return res.status(401).json({ message: 'Invalid refresh token' })
    }

    const accessToken = jwt.sign({ userId: decoded.userId }, SECRET_KEY, {
      expiresIn: JWT_EXPIRATION_TIME,
    })

    return res.status(200).json({ message: 'Access token refreshed', accessToken })
  } catch (error) {
    console.error('Error refreshing access token:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
