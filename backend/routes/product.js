var express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth_controller');
const { getUserById } = require('../controllers/user_controller');
const { getAllProducts, getProductById, createProducts, updateProduct, deleteProduct } = require('../controllers/product_controller');
var router = express.Router();

router.param('userId', getUserById);

router.param('productId', getProductById);


router.get('/', getAllProducts) // Allows fetching all products without authentication.
router.get('/:userId', isSignedIn, isAuthenticated, getAllProducts)


router.post('/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProducts)

router.put('/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, updateProduct)

router.delete('/:productId/:userId', isSignedIn, isAuthenticated, isAdmin, deleteProduct)




module.exports = router;



