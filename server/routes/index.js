const router = require(`express`).Router()  
const gameRoutes = require(`./gameRoutes`)
const userRoutes = require(`./userRoutes`)
const {authentication} = require(`../middlewares/auth`)

router.use(userRoutes)
router.use(authentication)
router.use(`/games`, gameRoutes)

module.exports = router