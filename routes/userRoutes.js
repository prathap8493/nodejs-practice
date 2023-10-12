const express=require('express');
const {registerUser,loginUser, currentUser} = require('../controllers/userController');

const router=express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/currentuser').get(currentUser)

module.exports=router;