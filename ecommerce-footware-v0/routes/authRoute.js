import  express  from 'express';
import {
        registerController,
        loginController} 
from '../controller/authController.js'

//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST

router.post('/register', registerController)

//LOGIN
router.post('/login',loginController)

export default router   