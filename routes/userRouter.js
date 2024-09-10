const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport=require("passport")
reqPassport=require("../config/passport");
const UserController = require('../controller/userController');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(passport.initialize());
router.use(passport.session());

// In userRouter.js
router.get('/', UserController.loadHome);
router.get('/home', UserController.loadHome);
router.get('/search', UserController.loadHome);


router.get('/login', UserController.loadLogin);
router.post('/login', UserController.authenticateUser);
router.get('/register', UserController.loadRegister);
router.post("/register", UserController.insertUser);
router.get("/verify-otp", UserController.loadVerifyOtp);
router.post("/verify-otp", UserController.verifyOTP);
router.get("/resend-otp", UserController.resentOTP);
router.get("/logout",UserController.logoutUser);
router.post("/logout",UserController.logoutUser);
router.get("/profile",UserController.loadProfile);
router.post('/profile/update', UserController.updateProfile);
// In userRouter.js


router.get('/shop',UserController.loadShopPage);

router.get('/filteredProducts', UserController.getFilteredProducts);
// In userRouter.js
router.get('/singleproduct/:id', UserController.getProductDetails);
router.get('/shop/singleproduct/:id', UserController.getProductDetails);

// address
// Render address page
router.get('/address',UserController.loadAddressPage);

// Render add address page


// Add new address
router.post('/address/add', UserController.addAddress);

router.post('/address/edit/:id', UserController.editAddress);

router.get('/address/delete/:id', UserController.deleteAddress);

// cart
router.post('/add-to-cart/:id', UserController.addToCart);
router.get('/cart', UserController.getCart);
router.post('/update-cart', UserController.updateCart);
router.post('/remove-from-cart', UserController.removeFromCart);

// forgot password
router.get('/forgot-password', UserController.loadForgotPassword);
router.post('/forgot-password', UserController.handleForgotPassword);

router.get('/reset-password/:token', UserController.loadResetPassword);
router.post('/reset-password/:token', UserController.handleResetPassword);


// checkout
router.get('/checkout',UserController.loadCheckout);
router.post('/verify-payment', UserController.verifyPayment);
router.post('/create-razorpay-order',  UserController.createRazorpayOrder);
router.post('/checkout/add-address', UserController.checkoutAddAddress);
router.post('/checkout/edit/:id', UserController.checkoutEditAddress);
router.delete('/checkout/delete/:id', UserController.checkoutDeleteAddress);

router.post('/place', UserController.placeOrder);
router.get('/orderSummary/:orderId', UserController.orderSummary);

router.get('/orders', UserController.renderOrdersPage);
router.get('/viewOrder/:orderId', UserController.renderViewOrder);
router.post('/cancelOrderItem', UserController.cancelOrderItem);
router.post('/requestReturn', UserController.requestReturn);

// router.get('/wishlist',UserController.loadWishList);
// router.get('/wishlist/add/:productId', UserController.addToWishlist);
router.get('/wishlist',  UserController.getWishlist);
router.post('/wishlist/add/:productId',UserController.addToWishlist);
router.post('/wishlist/remove/:productId',  UserController.removeFromWishlist);

// apply coupons
router.post('/apply-coupon', UserController.applyCoupon);
router.post('/remove-coupon',UserController.removeCoupon)

// wallet
router.get('/wallet', UserController.renderWalletPage);
router.get('/wallet/balance', UserController.getWalletBalance);
router.post('/wallet/add-funds', UserController.addFundsToWallet);
router.get('/wallet/transactions', UserController.getWalletTransactions);

// Update wallet balance (add or withdraw funds)










router.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google',{ failureRedirect:"/login" }),
    async (req, res) => {
        req.session.user_id = req.session.passport.user._id;
        console.log('req.session.user_id: ', req.session.user_id);
        
        res.redirect('/home');
    }

);

router.get('/auth/google', (req, res, next) => {
    console.log('Google Auth Request');
    next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));









module.exports = router;
