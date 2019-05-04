const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next) {
  // user has email and password auth'd
  // need to give them token
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = function(req, res, next) {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide an email and password' })
  }

  // see if user with given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err)
    }
    // if does exit, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' })
    }
    // if email is new, create and save record
    const user = new User({
      email: email,
      password: password,
    })
    user.save(function(err) {
      if (err) {
        return next(err)
      }

      //respond with request indicationg user was created
      res.json({ token: tokenForUser(user) })
    })
  })
}
