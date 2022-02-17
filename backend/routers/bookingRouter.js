import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Booking from '../models/bookingModel.js';
import { isAdmin, isAuth, isManagerOrAdmin } from '../utils.js';

const bookingRouter = express.Router();

bookingRouter.get(
  '/',
  isAuth,
  isManagerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const manager = req.query.manager || '';
    const managerFilter = manager ? { manager } : {};

    const bookings = await Booking.find({ ...managerFilter }).populate(
      'user',
      'name'
    );
    res.send(bookings);
  })
);

bookingRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id });
    res.send(bookings);
  })
);

bookingRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.bookingItems.length === 0) {
      res.status(400).send({ message: 'Book is empty' });
    } else {
      const booking = new Booking({
        manager: req.body.bookingItems[0].manager,
        bookingItems: req.body.bookingItems,
        hotelReservation: req.body.hotelReservation,
        moreInformation: req.body.moreInformation,
        roomsPrice: req.body.roomsPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdBooking = await booking.save();
      res
        .status(201)
        .send({ message: 'New Booking Created', booking: createdBooking });
    }
  })
);

bookingRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      res.send(booking);
    } else {
      res.status(404).send({ message: 'booking Not Found' });
    }
  })
);

bookingRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      const deleteBooking = await booking.remove();
      res.send({ message: 'booking Deleted', booking: deleteBooking });
    } else {
      res.status(404).send({ message: 'Booking Not Found' });
    }
  })
);
bookingRouter.put(
  '/:id/complete',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      
      const updatedBooking = await booking.save();
      res.send({ message: 'booking completed', booking: updatedBooking });
    } else {
      res.status(404).send({ message: 'Booking Not Found' });
    }
  })
);

export default bookingRouter;