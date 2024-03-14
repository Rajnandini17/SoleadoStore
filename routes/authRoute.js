const pg = require('pg');
const express= require("express");
const {
    registerController, 
    loginController, 
    testController, 
    forgotPasswordController,
    updateProfileController, 
    getOrderController
} = require('../controllers/authController.js');
const {requireSignIn, isAdmin} = require('../middlewares/authMiddleware.js')

const router = express.Router();

//register
router.post('/register', registerController);

//login
router.post('/login', loginController);

//forgot-password
router.post('/forgot-password', forgotPasswordController);

//test
router.get('/test', requireSignIn, isAdmin, testController);

//protected user route-auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok : true});
});

//protected admin-route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok : true});
});

//update profile
router.put('/profile', requireSignIn, updateProfileController);



module.exports = router;