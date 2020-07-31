const router = require(`express`).Router()  
const gameRoutes = require(`./gameRoutes`)
const userRoutes = require(`./userRoutes`)

router.use(userRoutes)
router.use(`/games`, gameRoutes)

module.exports = router