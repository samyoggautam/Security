import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
   const token = req.cookies
   console.log(token);
   if (!token) {
      return res.status(401).json({ success: false, message: "You are not authorize!" })
   }
   // if token is exist then verify the token
   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
         return res.status(401).json({ success: false, message: "Token is invalid" })
      }

      req.user = user
      next()
   })
}


export const verifyUser = (req, res, next) => {
   verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.role === 'admin') {
         next()
      } else {
         return res.status(401).json({ success: false, message: "You are not authenticated" })
      }
   })
}


export const verifyAdmin = (req, res, next) => {
   verifyToken(req, res, next, () => {
      if (req.user.role === 'admin') {
         next()
      } else {
         return res.status(401).json({ success: false, message: "You are not authorized" })
      }
   })
} 




//  const jwt = require('jsonwebtoken')

// export const verifyUser = (req, res, next) => {
//    let token = req.headers.authorization
//    if (!token) {
//       res.status(401)
//       return next(new Error('auth token not present'))
//    }
//    token = token.split(' ')[1]

//    jwt.verify(token, process.env.SECRET, (err, payload) => {
//       if (err) return next(err)
//       req.user = payload
//    })
//    next()
// }

// export const verifyAdmin = (req, res, next) => {
//    if (req.user.role === 'admin') return next()
//    res.status(403)
//    next(new Error('you are not admin!'))
// }
// // module.exports = { verifyUser, verifyAdmin }