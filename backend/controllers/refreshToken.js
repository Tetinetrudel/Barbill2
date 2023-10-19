import jwt from 'jsonwebtoken'
import RefreshToken from '../models/refreshToken.js'

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.cookies

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' })
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY)

    const existingToken = await RefreshToken.findOne({ token: refreshToken })

    if (!existingToken) {
      return res.status(401).json({ message: 'Invalid refresh token' })
    }

    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    })

    return res.status(200).json({ message: 'Access token refreshed', accessToken })
  } catch (error) {
    console.error('Error refreshing access token:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
