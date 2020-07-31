const router = require(`express`).Router()  
const GameController = require(`../controllers/GameController`)
const {authorization} = require(`../middlewares/auth`)

router.get(`/`, GameController.read)
router.post(`/`, GameController.add)
router.put(`/:id`, authorization, GameController.edit)
router.delete(`/:id`, authorization, GameController.delete) 

module.exports = router