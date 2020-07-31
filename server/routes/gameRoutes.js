const router = require(`express`).Router()  
const GameController = require(`../controllers/GameController`)

router.get(`/`, GameController.read)
router.post(`/`, GameController.add)
router.put(`/:id`, GameController.edit)
router.delete(`/:id`, GameController.delete)

module.exports = router