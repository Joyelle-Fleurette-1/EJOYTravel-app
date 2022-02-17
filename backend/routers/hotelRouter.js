import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Hotel from '../models/hotelModel.js';
import { isAdmin, isAuth, isManagerOrAdmin } from '../utils.js';

const hotelRouter = express.Router();

hotelRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const province = req.query.province || '';
    const manager = req.query.manager || '';
    const booking = req.query.booking || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const managerFilter = manager ? { manager } : {};
    const provinceFilter = province ? { province } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortBooking =
      booking === 'lowest'
        ? { price: 1 }
        : booking === 'highest'
        ? { price: -1 }
        : booking === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
    const hotels = await Hotel.find({
      ...managerFilter,
      ...nameFilter,
      ...provinceFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate('manager', 'manager.name manager.logo')
      .sort(sortBooking);
    res.send(hotels);
  })
);
hotelRouter.get(
  '/provinces',
  expressAsyncHandler(async (req, res) => {
    const provinces = await Hotel.find().distinct('province');
    res.send(provinces);
  })
);

hotelRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await hotel.remove({});
    const createdHotels = await hotel.insertMany(data.hotels);
    res.send({ createdHotels });
  })
);

hotelRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id).populate(
      'manager',
      'manager.name manager.logo manager.rating manager.numReviews'
    );
    if (hotel) {
      res.send(hotel);
    } else {
      res.status(404).send({ message: 'Hotel Not Found' });
    }
  })
);
hotelRouter.post(
  '/',
  isAuth,
  isManagerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const hotel = new Hotel({
      name: 'sample name ' + Date.now(),
      manager: req.user._id,
      image: '/images/p1.jpg',
      image1: '/images/p1.jpg',
      image2: '/images/p1.jpg',
      image3: '/images/p1.jpg',
      price: 0,
      province: 'sample province',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const createdHotel = await hotel.save();
    res.send({ message: 'Hotel Created', hotel: createdHotel });
  })
);
hotelRouter.put(
  '/:id',
  isAuth,
  isManagerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    if (hotel) {
      hotel.name = req.body.name;
      hotel.price = req.body.price;
      hotel.image = req.body.image;
      hotel.image1 = req.body.image1;
      hotel.image2 = req.body.image2;
      hotel.image3 = req.body.image3;
      hotel.province = req.body.province;
      hotel.brand = req.body.brand;
      hotel.countInStock = req.body.countInStock;
      hotel.description = req.body.description;
      const updatedHotel = await hotel.save();
      res.send({ message: 'Hotel Updated', hotel: updatedHotel });
    } else {
      res.status(404).send({ message: 'Hotel Not Found' });
    }
  })
);
hotelRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    if (hotel) {
      const deleteHotel = await hotel.remove();
      res.send({ message: 'Hotel Deleted', hotel: deleteHotel });
    } else {
      res.status(404).send({ message: 'Hotel Not Found' });
    }
  })
);
hotelRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    if (hotel) {
      if (hotel.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      hotel.reviews.push(review);
      hotel.numReviews = hotel.reviews.length;
      hotel.rating =
        hotel.reviews.reduce((a, c) => c.rating + a, 0) /
        hotel.reviews.length;
      const updatedHotel = await hotel.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedHotel.reviews[updatedHotel.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Hotel Not Found' });
    }
  })
);

export default hotelRouter;