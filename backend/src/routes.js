const express = require("express");
const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const ProfileController = require("./controllers/ProfileController");
const BookingController = require("./controllers/BookingController");
const AprovalController = require("./controllers/AprovalController");
const RejectionController = require("./controllers/RejectionController");
const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);

// Profile
routes.get('/profile', ProfileController.show);

// Sessions
routes.post('/sessions', SessionController.store);

// Spots
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', AprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);
 


module.exports = routes;