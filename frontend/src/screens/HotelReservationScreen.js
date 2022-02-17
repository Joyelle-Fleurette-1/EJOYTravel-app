import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveHotelReservation } from '../actions/bookActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function HotelReservationScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const book = useSelector((state) => state.book);
  const { hotelReservation } = book;
  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(hotelReservation.fullName);
  const [phone, setPhone] = useState(hotelReservation.phone);
  const [email, setEmail] = useState(hotelReservation.email);
  const [arrivalDate, setArrivalDate] = useState(hotelReservation.arrivalDate);
  const [departureDate, setDepartureDate] = useState(hotelReservation.departureDate);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveHotelReservation({ fullName, phone, email, arrivalDate, departureDate })
    );
    props.history.push('/moreinfo');
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Hotel Reservation</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="arrivalDate">Arrival Date</label>
          <input
            type="text"
            id="arrivalDate"
            placeholder="Enter arrival date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="deaprtureDate">Departure Date</label>
          <input
            type="text"
            id="departureDate"
            placeholder="Enter departure date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}