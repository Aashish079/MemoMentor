const  express = require('express')
const {StatusCodes} = require('http-status-codes')
const router = express.Router()

const {login, register}=  require('../controllers/auth')

router.route('/').get((req, res)=>{
	res.status(StatusCodes.OK).json({"msg":"Hello Welcome to authentication route"})
})
router.route('/register').post(register)
router.route('/login').post(login)

module.exports = router
