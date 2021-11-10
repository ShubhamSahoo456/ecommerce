const express = require('express')
const {userLogin,userProfile,userRegister,updateProfile} = require('../controllers/userController')
const {authtoken} = require('../middlewares/auth')
const router = express.Router()

router.post("/api/v1/register",userRegister)

router.post("/api/v1/user/login",userLogin)

router.get("/api/v1/userProfile",authtoken,userProfile)

router.put("/api/v1/userProfile",authtoken,updateProfile)

module.exports = router