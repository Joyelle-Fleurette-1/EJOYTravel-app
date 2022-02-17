import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        image1: { type: String, required: true },
        image2: { type: String, required: true },
        image3: { type: String, required: true },
        price: { type: Number, required: true },
        hotel: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Hotel',
          required: true,
        },
      },
    ],
    hotelReservation: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      arrivalDate: { type: Date },
      departureDate: { type: Date },
      
    },
    moreInformation: { 
      idType: { type: String, required: true },
      idNumber: { type: String, required: true },
      nationality: { type: String, required: true },
      permanentAddress: { type: String, required: true },
      currentAddress: { type: String, required: true },
    },
    roomsPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    manager: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
},
  {
    timestamps: true,
  }
);
const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;