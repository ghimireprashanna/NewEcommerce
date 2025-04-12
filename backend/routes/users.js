var express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth_controller');
const { getUser, getUserById, getAllUsers, adminUpdateuser, adminDeleteuser } = require('../controllers/user_controller');

var router = express.Router();

router.param('userId', getUserById)

router.get('/:userId', isSignedIn, getUser)

router.get('/users/:userId', isSignedIn, isAuthenticated, getAllUsers)

router.put('/users/admin/update/:userId', isSignedIn, isAuthenticated, isAdmin, adminUpdateuser)

router.delete('/users/:deleteUserId/:userId', isSignedIn, isAuthenticated, isAdmin, adminDeleteuser)




module.exports = router;