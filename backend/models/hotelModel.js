import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    manager: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    province: { type: String, required: true },
    image: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;