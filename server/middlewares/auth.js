const {User, Game} = require(`../models`)
const {decode} = require(`../helpers/jwt`)

const authentication = (req, res, next) => {
    const access_token = req.headers.access_token
    if (!access_token) {
        return res.status(401).json({message: `token first!`})
    }
    let userData = decode(access_token)
    req.user = userData

    User.findByPk(userData.id)
    .then((result) => {
        if (result) {
            next()
        } else {
            return res.status(401).json({message: `login first!`}) 
        }
    })
    .catch((err) => {
       return res.status(500).json({message: `internal server error`})
    })
}

const authorization = (req, res, next) => {
    const GameId = req.params.id
    const UserId = req.user.id

    Game.findOne({where: {id: GameId, UserId}})
    .then((result) => {
        if (result) {
            next()
        } else {
            return res.status(403).json({message: `You don't have access to this.`})
        }
    })
    .catch((err) => {
        return res.status(500).json({message: err})
    })
}

module.exports = {authentication, authorization}