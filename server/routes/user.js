const express = require('express');
const { builtinModules } = require('module');
const { runInContext } = require('vm');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.mainPage);
router.post('/', userController.loginUser);

router.get('/registerUser', userController.view);
router.post('/registerUser', userController.create);
router.get('/registerDriver', userController.registerDriverPage)
router.post('/registerDriver', userController.registerDriver)
router.get('/loginDriver', userController.loginDriverPage);
router.post('/loginDriver', userController.loginDriver)

router.get('/profile', userController.profile)
router.get('/editDetails', userController.viewDetail)
router.post('/editDetails', userController.update)

router.get('/address', userController.addressView)
router.post('/address', userController.createAddress)

router.get('/driverMenu', userController.driverMenu)
router.get('/driverDetail', userController.driverDetail);
router.post('/driverDetail', userController.updateDriver);
router.get('/rideDetail', userController.rideDetail);
router.post('/rideDetail', userController.findRideDetail);
router.get('/ratingDetail', userController.ratingDetail);
router.post('/ratingDetail', userController.findRatingDetail);


router.get('/bookRide', userController.rideView)
router.post('/bookRide', userController.bookRide)


router.get('/rideHistory', userController.rideHistory);
router.post('/rideHistory', userController.findRideHistory);
router.get('/paymentHistory', userController.paymentHistory);
router.post('/paymentHistory', userController.findPaymentHistory);


module.exports = router;