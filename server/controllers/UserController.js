const {User} = require(`../models`)
const {comparePass} = require(`../helpers/bcrypt`)
const {encode} = require(`../helpers/jwt`)

class UserController {

    static register(req, res) {
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
        .then((result) => {
            return res.status(201).json(result)
        })
        .catch((err) => {
            return res.status(500).json({message: err})
        })
    }

    static login(req, res) {
        let user = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({where: {email: user.email}})
        .then((result) => {
            if (result && comparePass(user.password, result.password)) {
                const access_token = encode({
                    id: result.id,
                    name: result.name,
                    email: result.password
                })
                return res.status(200).json({access_token})
            } else {
                return res.status(400).json({message: `Invalid Email or Password!`})
            }
        })
        .catch((err) => {
            return res.status(500).json({message: err})
        })
    }

}

module.exports = UserController