const {Game} = require(`../models`)

class GameController {

    static read(req, res) {
        Game.findAll()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json({message: err})
        })
    }

    static add(req, res) {
        let id = req.user.id
        const newGame = {
            name: req.body.name,
            price: +req.body.price,
            stock: +req.body.stock,
            UserId: id
        }

        Game.create(newGame)
        .then((result) => {
            return res.status(201).json(result)
        })
        .catch((err) => {
            return res.status(500).json({message: err})
        })
    }

    static edit(req, res) {
        const id = req.params.id

        const updateGame = {
            name: req.body.name,
            price: +req.body.price,
            stock: +req.body.stock,
        }

        Game.update(updateGame, {where: {id}, returning: true})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(500).json({message: err})
        })
    }

    static delete(req, res) {
        const id = req.params.id

        Game.destroy({where: {id}})
        .then((result) => {
            if (result === 0) {
                return res.status(404).json({message: `Sorry, we can't find the data.`})
            } else {
                return res.status(200).json(result)
            }
        })
        .catch((err) => {
            return res.status(500).json({message: err})
        })
    }
}

module.exports = GameController