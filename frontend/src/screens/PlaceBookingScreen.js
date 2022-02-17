import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBooking } from '../actions/bookingActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { BOOKING_CREATE_RESET } from '../constants/bookingConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceBookingScreen(props) {
  const book = useSelector((state) => state.book);
  const { moreInformation } = book;
  if (!moreInformation.idNumber) {
    props.history.push('/moreinfo');
  }
  const bookingCreate = useSelector((state) => state.bookingCreate);
  const { loading, success, error, booking } = bookingCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  book.roomsPrice = toPrice(
    book.bookRooms.reduce((a, c) => a + c.qty * c.price, 0)
  );
  book.totalPrice = book.roomsPrice;
  const dispatch = useDispatch();
  const placeBookingHandler = () => {
    dispatch(createBooking({ ...book, bookingItems: book.bookRooms }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/booking/${booking._id}`);
      dispatch({ type: BOOKING_CREATE_RESET });
    }
  }, [dispatch, booking, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Hotel Reservation</h2>
                <p>
                  <strong>Name:</strong> {book.hotelReservation.fullName} <br /><br />
                  <strong>Phone Number: </strong> {book.hotelReservation.phone}<br /><br />
                  <strong>Email Address: </strong> {book.hotelReservation.email} <br /><br />
                  <strong>Arrival Date: </strong> {book.hotelReservation.arrivalDate} <br /><br />
                  <strong>Departure Date: </strong> {book.hotelReservation.departureDate} <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>More Information</h2>
                <p>
                  <strong>ID Type:</strong> {book.moreInformation.idType} <br /><br />
                  <strong>ID Number: </strong> {book.moreInformation.idNumber}<br /><br />
                  <strong>Nationality: </strong> {book.moreInformation.nationality} <br /><br />
                  <strong>Permanent Address: </strong> {book.moreInformation.permanentAddress} <br /><br />
                  <strong>Current Address: </strong> {book.moreInformation.currentAddress} <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>booking Info</h2>
                <ul>
                  {book.bookRooms.map((item) => (
                    <li key={item.hotel}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="medium"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/hotel/${item.hotel}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x {item.price} Fbu = {item.qty * item.price} Fbu
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
        
          <button
            type="button"
            onClick={placeBookingHandler}
            className="primary block"
            disabled={book.bookRooms.length === 0}
          >
            Place booking
          </button>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
      </div>
    </div>
  );
}